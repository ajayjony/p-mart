import { Order } from "@/types";

export default function StatsCards({ orders }: { orders: Order[] }) {
  const today = new Date().toISOString().split("T")[0];
  const todayOrders = orders.filter((o) => o.created_at.startsWith(today));
  const activeOrders = orders.filter((o) => !["delivered", "cancelled"].includes(o.status));
  const totalRevenue = orders
    .filter((o) => o.status === "delivered" && o.amount)
    .reduce((sum, o) => sum + (o.amount || 0), 0);

  const stats = [
    { label: "Total Orders", value: orders.length },
    { label: "Today", value: todayOrders.length },
    { label: "Active", value: activeOrders.length },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-4 text-center">
          <div className="text-2xl font-heading font-bold">{stat.value}</div>
          <div className="text-xs text-[#888] dark:text-[#777] mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
