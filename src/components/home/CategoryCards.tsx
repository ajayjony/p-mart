import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryCards() {
  return (
    <section className="py-16 px-4 bg-light-card dark:bg-dark-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">Our Stamps</h2>
        <p className="text-center text-[#888] dark:text-[#777] mb-12">Choose from three premium manufacturing methods</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-gold-muted dark:text-gold text-xs tracking-[2px] uppercase mb-3">{cat.name}</div>
              <p className="text-sm text-[#888] dark:text-[#777] mb-4">{cat.description}</p>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-heading font-bold">
                    {cat.price}<span className="text-sm font-body font-normal text-[#888] dark:text-[#777]">+</span>
                  </div>
                  <div className="text-xs text-[#888] dark:text-[#777]">Ready in {cat.readyTime}</div>
                </div>
                <Link href="/order" className="text-sm px-4 py-2 border border-gold-muted/30 dark:border-gold/30 rounded-lg text-gold-muted dark:text-gold hover:bg-gold-muted/10 dark:hover:bg-gold/10 transition-colors">
                  Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
