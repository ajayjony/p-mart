import Link from "next/link";
import { StampTypeInfo } from "@/types";

export default function StampCard({ stamp }: { stamp: StampTypeInfo }) {
  return (
    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="aspect-square bg-light-bg dark:bg-dark-bg rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        <img src={stamp.image} alt={stamp.name} className="object-contain w-3/4 h-3/4" loading="lazy" />
      </div>
      <h3 className="font-heading text-base font-bold mb-1">{stamp.name}</h3>
      <p className="text-xs text-[#888] dark:text-[#777] mb-3">{stamp.description}</p>
      <Link
        href={`/order?type=${encodeURIComponent(stamp.id)}`}
        className="block text-center text-sm py-2 border border-gold-muted/30 dark:border-gold/30 rounded-lg text-gold-muted dark:text-gold hover:bg-gold-muted/10 dark:hover:bg-gold/10 transition-colors"
      >
        Order This Stamp
      </Link>
    </div>
  );
}
