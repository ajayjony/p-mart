"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { orderFormSchema } from "@/lib/validators";
import { formatWhatsAppMessage, buildWhatsAppURL } from "@/lib/whatsapp";
import { CATEGORIES, STAMP_TYPES } from "@/lib/constants";
import { supabase } from "@/lib/supabase-client";
import OrderSuccess from "./OrderSuccess";

type FormData = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  stamp_category: "polymer" | "pre_ink" | "self_ink";
  stamp_type: string;
  stamp_text: string;
  quantity: number;
  delivery_type: "pickup" | "delivery";
  delivery_address: string;
  honeypot: string;
};

export default function OrderForm() {
  const searchParams = useSearchParams();
  const preselectedType = searchParams.get("type") || "";

  const [formData, setFormData] = useState<FormData>({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    stamp_category: "polymer",
    stamp_type: STAMP_TYPES.find((s) => s.id === preselectedType)?.name || "",
    stamp_text: "",
    quantity: 1,
    delivery_type: "pickup",
    delivery_address: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ orderNumber: string; message: string } | null>(null);
  const [submitError, setSubmitError] = useState("");

  function updateField(field: string, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitError("");

    const result = orderFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    try {
      const { honeypot, ...orderData } = result.data;

      const response = await supabase.functions.invoke("create-order", {
        body: orderData,
      });

      if (response.error) throw new Error(response.error.message);

      const { order_number } = response.data;
      const categoryLabel = CATEGORIES.find((c) => c.id === orderData.stamp_category)?.name || orderData.stamp_category;
      const message = formatWhatsAppMessage({
        orderNumber: order_number,
        stampCategory: categoryLabel,
        stampType: orderData.stamp_type,
        stampText: orderData.stamp_text,
        quantity: orderData.quantity,
        deliveryType: orderData.delivery_type,
        deliveryAddress: orderData.delivery_address,
        customerName: orderData.customer_name,
        customerPhone: orderData.customer_phone,
      });

      setSuccess({ orderNumber: order_number, message });
      window.open(buildWhatsAppURL(message), "_blank");
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <OrderSuccess
        orderNumber={success.orderNumber}
        whatsappMessage={success.message}
        onReset={() => {
          setSuccess(null);
          setFormData({
            customer_name: "",
            customer_phone: "",
            customer_email: "",
            stamp_category: "polymer",
            stamp_type: "",
            stamp_text: "",
            quantity: 1,
            delivery_type: "pickup",
            delivery_address: "",
            honeypot: "",
          });
        }}
      />
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-gold-muted dark:focus:ring-gold transition-colors";
  const labelClass = "block text-sm font-semibold mb-1";
  const errorClass = "text-sm text-status-cancelled mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={(e) => updateField("honeypot", e.target.value)} />
      </div>

      <fieldset className="space-y-4">
        <legend className="font-heading text-lg font-bold mb-2 text-gold-muted dark:text-gold">Your Details</legend>
        <div>
          <label htmlFor="customer_name" className={labelClass}>Name *</label>
          <input id="customer_name" type="text" className={inputClass} value={formData.customer_name} onChange={(e) => updateField("customer_name", e.target.value)} />
          {errors.customer_name && <p className={errorClass}>{errors.customer_name}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customer_phone" className={labelClass}>Phone *</label>
            <input id="customer_phone" type="tel" className={inputClass} value={formData.customer_phone} onChange={(e) => updateField("customer_phone", e.target.value)} />
            {errors.customer_phone && <p className={errorClass}>{errors.customer_phone}</p>}
          </div>
          <div>
            <label htmlFor="customer_email" className={labelClass}>Email (optional)</label>
            <input id="customer_email" type="email" className={inputClass} value={formData.customer_email} onChange={(e) => updateField("customer_email", e.target.value)} />
            {errors.customer_email && <p className={errorClass}>{errors.customer_email}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-heading text-lg font-bold mb-2 text-gold-muted dark:text-gold">Stamp Details</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="stamp_category" className={labelClass}>Category *</label>
            <select id="stamp_category" className={inputClass} value={formData.stamp_category} onChange={(e) => updateField("stamp_category", e.target.value)}>
              {CATEGORIES.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name} (from {cat.price})</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="stamp_type" className={labelClass}>Stamp Type *</label>
            <select id="stamp_type" className={inputClass} value={formData.stamp_type} onChange={(e) => updateField("stamp_type", e.target.value)}>
              <option value="">Select stamp type</option>
              {STAMP_TYPES.map((st) => (<option key={st.id} value={st.name}>{st.name}</option>))}
            </select>
            {errors.stamp_type && <p className={errorClass}>{errors.stamp_type}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="stamp_text" className={labelClass}>Stamp Text Content *</label>
          <textarea id="stamp_text" rows={4} className={inputClass} placeholder="Enter the exact text you want on your stamp..." value={formData.stamp_text} onChange={(e) => updateField("stamp_text", e.target.value)} />
          {errors.stamp_text && <p className={errorClass}>{errors.stamp_text}</p>}
        </div>
        <div className="w-32">
          <label htmlFor="quantity" className={labelClass}>Quantity</label>
          <input id="quantity" type="number" min={1} className={inputClass} value={formData.quantity} onChange={(e) => updateField("quantity", parseInt(e.target.value) || 1)} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-heading text-lg font-bold mb-2 text-gold-muted dark:text-gold">Delivery</legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="delivery_type" value="pickup" checked={formData.delivery_type === "pickup"} onChange={(e) => updateField("delivery_type", e.target.value)} className="accent-gold-muted dark:accent-gold" />
            <span>Pickup from shop</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="delivery_type" value="delivery" checked={(formData.delivery_type as string) === "delivery"} onChange={(e) => updateField("delivery_type", e.target.value)} className="accent-gold-muted dark:accent-gold" />
            <span>Courier delivery</span>
          </label>
        </div>
        {formData.delivery_type === "delivery" && (
          <div>
            <label htmlFor="delivery_address" className={labelClass}>Delivery Address *</label>
            <textarea id="delivery_address" rows={2} className={inputClass} placeholder="Full delivery address with pincode" value={formData.delivery_address} onChange={(e) => updateField("delivery_address", e.target.value)} />
            {errors.delivery_address && <p className={errorClass}>{errors.delivery_address}</p>}
          </div>
        )}
      </fieldset>

      {submitError && (
        <div className="p-4 rounded-lg bg-status-cancelled/10 border border-status-cancelled/30 text-status-cancelled text-sm">{submitError}</div>
      )}

      <button type="submit" disabled={submitting}
        className="w-full py-4 bg-gold-muted dark:bg-gold text-white dark:text-dark-bg font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
        {submitting ? "Placing Order..." : "Place Order & Send on WhatsApp"}
      </button>
    </form>
  );
}
