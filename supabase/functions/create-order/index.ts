import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Rate limiting: max 5 orders per IP per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("order_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ip)
      .gte("created_at", oneHourAgo);

    if ((count ?? 0) >= 5) {
      return new Response(
        JSON.stringify({ error: "Too many orders. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    const required = ["customer_name", "customer_phone", "stamp_category", "stamp_type", "stamp_text", "delivery_type"];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim().length === 0) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (body.delivery_type === "delivery" && (!body.delivery_address || body.delivery_address.trim().length === 0)) {
      return new Response(
        JSON.stringify({ error: "Delivery address is required for courier delivery" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    function sanitize(val: string): string {
      return val.replace(/<[^>]*>/g, "").trim();
    }

    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: sanitize(body.customer_name),
        customer_phone: sanitize(body.customer_phone),
        customer_email: body.customer_email ? sanitize(body.customer_email) : null,
        stamp_category: body.stamp_category,
        stamp_type: sanitize(body.stamp_type),
        stamp_text: sanitize(body.stamp_text),
        quantity: Math.max(1, parseInt(body.quantity) || 1),
        delivery_type: body.delivery_type,
        delivery_address: body.delivery_address ? sanitize(body.delivery_address) : null,
        status: "new",
      })
      .select("order_number")
      .single();

    if (error) throw error;

    await supabase.from("order_rate_limits").insert({ ip_address: ip });

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    await supabase.from("order_rate_limits").delete().lt("created_at", twoHoursAgo);

    return new Response(
      JSON.stringify({ order_number: data.order_number }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to create order" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
