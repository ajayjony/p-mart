"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Order } from "@/types";
import StatsCards from "@/components/admin/StatsCards";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";

export default function AdminDashboard() {
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

  if (loading) return <div className="py-8 text-center">Loading dashboard...</div>;

  const recentOrders = orders.slice(0, 10);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Dashboard</h1>
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-status-cancelled/10 border border-status-cancelled/30 text-status-cancelled text-sm">{error}</div>
      )}
      <StatsCards orders={orders} />
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-bold">Recent Orders</h2>
        <Link href="/admin/orders" className="text-sm text-gold-muted dark:text-gold hover:underline">View All</Link>
      </div>
      <div className="rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 border-light-border dark:border-dark-border text-sm">
            <div>
              <span className="text-gold-muted dark:text-gold font-semibold">{order.order_number}</span>
              <span className="mx-2 text-[#ccc] dark:text-[#444]">&bull;</span>
              <span>{order.customer_name}</span>
            </div>
            <StatusBadge status={order.status} />
          </div>
        ))}
        {recentOrders.length === 0 && (
          <div className="px-4 py-8 text-center text-[#888] dark:text-[#777]">No orders yet</div>
        )}
      </div>
    </div>
  );
}
