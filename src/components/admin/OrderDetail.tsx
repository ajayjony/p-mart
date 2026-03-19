"use client";

import { useState } from "react";
import { Order, OrderStatus } from "@/types";
import { VALID_TRANSITIONS, STATUS_CONFIG } from "@/lib/constants";
import { supabase } from "@/lib/supabase-client";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
  onUpdate: () => void;
}

export default function OrderDetail({ order, onUpdate }: Props) {
  const [status, setStatus] = useState(order.status);
  const [amount, setAmount] = useState(order.amount?.toString() || "");
  const [notes, setNotes] = useState(order.notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const allowedNext = VALID_TRANSITIONS[order.status];

  async function save() {
    setSaving(true);
    setError("");
    try {
      const updates: Record<string, unknown> = {};
      if (status !== order.status) updates.status = status;
      if (amount !== (order.amount?.toString() || "")) updates.amount = amount ? parseFloat(amount) : null;
      if (notes !== (order.notes || "")) updates.notes = notes || null;

      if (Object.keys(updates).length === 0) { setSaving(false); return; }

      const { error: err } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", order.id);

      if (err) throw err;
      onUpdate();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 space-y-4 bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">Order:</span> {order.order_number}</div>
        <div><span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleString("en-IN")}</div>
        <div><span className="font-semibold">Customer:</span> {order.customer_name} ({order.customer_phone})</div>
        <div><span className="font-semibold">Stamp:</span> {order.stamp_category.replace("_", "-")} — {order.stamp_type}</div>
        <div className="md:col-span-2"><span className="font-semibold">Text:</span> {order.stamp_text}</div>
        <div><span className="font-semibold">Qty:</span> {order.quantity}</div>
        <div><span className="font-semibold">Delivery:</span> {order.delivery_type === "delivery" ? order.delivery_address : "Pickup"}</div>
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-sm">
            <option value={order.status}>{STATUS_CONFIG[order.status].label} (current)</option>
            {allowedNext.map((s) => (<option key={s} value={s}>{STATUS_CONFIG[s].label}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Amount (₹)</label>
          <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-sm w-28" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold mb-1">Notes</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-sm" placeholder="Internal notes..." />
        </div>
      </div>

      {error && <p className="text-sm text-status-cancelled">{error}</p>}

      <div className="flex gap-3">
        <button onClick={save} disabled={saving}
          className="px-4 py-2 bg-gold-muted dark:bg-gold text-white dark:text-dark-bg text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <a href={`https://wa.me/91${order.customer_phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:opacity-90">
          WhatsApp Customer
        </a>
      </div>
    </div>
  );
}
