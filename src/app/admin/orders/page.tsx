"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Order } from "@/types";
import OrdersTable from "@/components/admin/OrdersTable";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    setError("");
    const { data, error: err } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      setError("Unable to connect. Check your internet and refresh.");
    } else {
      setOrders((data as Order[]) || []);
    }
    setLoading(false);
  }

  useEffect(() => { fetchOrders(); }, []);

  if (loading) return <div className="py-8 text-center">Loading orders...</div>;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Orders</h1>
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-status-cancelled/10 border border-status-cancelled/30 text-status-cancelled text-sm">{error}</div>
      )}
      <OrdersTable orders={orders} onUpdate={fetchOrders} />
    </div>
  );
}
