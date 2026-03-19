"use client";

import { useState } from "react";
import { Order, OrderStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";
import StatusBadge from "./StatusBadge";
import OrderDetail from "./OrderDetail";

interface Props {
  orders: Order[];
  onUpdate: () => void;
}

const PAGE_SIZE = 25;

function csvSafe(val: string | number | null | undefined): string {
  if (val == null) return "";
  const str = String(val);
  const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

export default function OrdersTable({ orders, onUpdate }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const filtered = orders
    .filter((o) => statusFilter === "all" || o.status === statusFilter)
    .filter((o) =>
      search === "" ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search) ||
      o.order_number.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function exportCSV() {
    const headers = ["Order #", "Date", "Customer", "Phone", "Category", "Type", "Text", "Qty", "Delivery", "Status", "Amount"];
    const rows = filtered.map((o) => [
      csvSafe(o.order_number),
      csvSafe(new Date(o.created_at).toLocaleDateString("en-IN")),
      csvSafe(o.customer_name),
      csvSafe(o.customer_phone),
      csvSafe(o.stamp_category),
      csvSafe(o.stamp_type),
      csvSafe(o.stamp_text),
      o.quantity,
      csvSafe(o.delivery_type === "delivery" ? o.delivery_address : "Pickup"),
      csvSafe(o.status),
      o.amount || "",
    ]);
    const csv = [headers.map(csvSafe), ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pmart-orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const inputClass = "px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-sm";

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input type="text" placeholder="Search name, phone, order #..." value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className={`${inputClass} flex-1 min-w-[200px]`} />
        <select value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as OrderStatus | "all"); setPage(0); }}
          className={inputClass}>
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <button onClick={exportCSV} className={`${inputClass} text-gold-muted dark:text-gold hover:bg-gold-muted/10 dark:hover:bg-gold/10`}>
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-light-border dark:border-dark-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
              <th className="text-left px-4 py-3 font-semibold">Date</th>
              <th className="text-left px-4 py-3 font-semibold">Order #</th>
              <th className="text-left px-4 py-3 font-semibold">Customer</th>
              <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Stamp</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-right px-4 py-3 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) => (
              <tr key={order.id} className="border-b border-light-border dark:border-dark-border">
                <td colSpan={6} className="p-0">
                  <button onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    className="w-full text-left hover:bg-light-card/50 dark:hover:bg-dark-card/50 transition-colors">
                    <div className="grid grid-cols-6 items-center px-4 py-3">
                      <div>{new Date(order.created_at).toLocaleDateString("en-IN")}</div>
                      <div className="text-gold-muted dark:text-gold">{order.order_number}</div>
                      <div>{order.customer_name}</div>
                      <div className="hidden md:block text-[#888] dark:text-[#777]">{order.stamp_type}</div>
                      <div><StatusBadge status={order.status} /></div>
                      <div className="text-right">{order.amount ? `₹${order.amount}` : "—"}</div>
                    </div>
                  </button>
                  {expandedId === order.id && (
                    <div className="px-4 pb-4">
                      <OrderDetail order={order} onUpdate={onUpdate} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#888] dark:text-[#777]">No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-[#888] dark:text-[#777]">{filtered.length} orders &bull; Page {page + 1} of {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
              className="px-3 py-1 rounded border border-light-border dark:border-dark-border disabled:opacity-30">Prev</button>
            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
              className="px-3 py-1 rounded border border-light-border dark:border-dark-border disabled:opacity-30">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
