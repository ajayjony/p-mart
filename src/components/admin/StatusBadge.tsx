import { OrderStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${config.color}`}>
      {config.label}
    </span>
  );
}
