import type { Metadata } from "next";
import { CATEGORIES, STAMP_TYPES } from "@/lib/constants";
import CategorySection from "@/components/products/CategorySection";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our collection of custom rubber stamps — Polymer, Pre-Ink & Self-Ink. Company seals, doctor stamps, address stamps, and more.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-gold-muted dark:text-gold text-xs tracking-[4px] uppercase mb-2">Our Collection</p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Custom Rubber Stamps</h1>
        <p className="text-[#888] dark:text-[#777] mt-2 max-w-lg mx-auto">All stamp designs are available in Polymer, Pre-Ink, and Self-Ink formats</p>
      </div>
      {CATEGORIES.map((category) => (
        <CategorySection key={category.id} category={category} stamps={STAMP_TYPES} />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: CATEGORIES.map((cat, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: cat.name,
                description: cat.description,
                offers: { "@type": "Offer", priceCurrency: "INR", price: cat.price.replace("₹", ""), availability: "https://schema.org/InStock" },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
