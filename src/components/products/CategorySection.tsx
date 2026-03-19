import { CategoryInfo, StampTypeInfo } from "@/types";
import StampCard from "./StampCard";

interface Props {
  category: CategoryInfo;
  stamps: StampTypeInfo[];
}

export default function CategorySection({ category, stamps }: Props) {
  return (
    <section className="py-12">
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
        <div>
          <h2 className="font-heading text-2xl font-bold">{category.name}</h2>
          <p className="text-sm text-[#888] dark:text-[#777] mt-1">{category.description}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-heading font-bold text-gold-muted dark:text-gold">From {category.price}</div>
          <div className="text-xs text-[#888] dark:text-[#777]">Ready in {category.readyTime}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stamps.map((stamp) => (
          <StampCard key={stamp.id} stamp={stamp} />
        ))}
      </div>
    </section>
  );
}
