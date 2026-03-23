import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our custom rubber stamps — Polymer, Pre-Ink & Self-Ink. Starting from ₹150. Ready in as fast as 10 minutes.",
};

const PRODUCT_DETAILS = [
  {
    id: "polymer",
    name: "Polymer Stamps",
    tagline: "The Classic Choice",
    price: "₹150",
    readyTime: "1 Day",
    image: "/images/stamps/page-1-full.png",
    description:
      "Traditional rubber stamps that work with a separate ink pad. Polymer stamps are the most affordable option and are widely used across businesses, schools, and offices. The durable polymer material ensures clean, consistent impressions for years.",
    features: [
      "Works with any standard stamp pad",
      "Most affordable option",
      "Durable polymer construction",
      "Available in all sizes and shapes",
      "Ideal for high-volume daily use",
    ],
    bestFor: "Offices, schools, shops, and anyone looking for a reliable, budget-friendly stamp.",
  },
  {
    id: "pre_ink",
    name: "Pre-Ink Stamps",
    tagline: "Ink Built Right In",
    price: "₹300",
    readyTime: "10 Minutes",
    image: "/images/stamps/page-2-full.png",
    description:
      "Pre-ink stamps come with ink already built into the stamp pad — no separate ink pad needed. They produce sharp, detailed impressions and are the fastest to manufacture. Perfect when you need a stamp ready in minutes, not days.",
    features: [
      "No separate stamp pad required",
      "Ultra-fast turnaround — ready in 10 minutes",
      "Sharp, high-detail impressions",
      "Compact and portable",
      "Thousands of impressions per refill",
    ],
    bestFor: "Doctors, professionals, and anyone who needs a stamp immediately with minimal hassle.",
  },
  {
    id: "self_ink",
    name: "Self-Ink Stamps",
    tagline: "Premium & Professional",
    price: "₹400",
    readyTime: "1 Day",
    image: "/images/stamps/page-3-full.png",
    description:
      "Self-inking stamps feature a built-in mechanism that automatically re-inks after every press. Simply press down, and the stamp flips to create a clean impression — then flips back to re-ink itself. The most professional and convenient option available.",
    features: [
      "One-hand operation — press and stamp",
      "Automatic re-inking mechanism",
      "Clean impressions every time",
      "Premium branded housings (COLOP, etc.)",
      "Refillable ink pads for long life",
    ],
    bestFor: "Banks, corporates, government offices, and anyone who values speed and a premium feel.",
  },
];

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-gold-muted dark:text-gold text-xs tracking-[4px] uppercase mb-2">
          Our Products
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">
          Three Ways to Stamp
        </h1>
        <p className="text-[#888] dark:text-[#777] mt-3 max-w-xl mx-auto">
          Every stamp we make is custom-designed to your exact text and layout.
          Choose the format that suits your needs.
        </p>
      </div>

      {/* Quick comparison */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {PRODUCT_DETAILS.map((product) => (
          <a
            key={product.id}
            href={`#${product.id}`}
            className="text-center p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="text-gold-muted dark:text-gold text-[10px] tracking-[2px] uppercase mb-1">
              {product.tagline}
            </div>
            <div className="font-heading text-lg font-bold mb-1">{product.name}</div>
            <div className="text-2xl font-heading font-bold text-gold-muted dark:text-gold">
              {product.price}<span className="text-sm font-normal text-[#888] dark:text-[#777]">+</span>
            </div>
            <div className="text-xs text-[#888] dark:text-[#777] mt-1">
              Ready in {product.readyTime}
            </div>
          </a>
        ))}
      </div>

      {/* Product sections */}
      <div className="space-y-20">
        {PRODUCT_DETAILS.map((product, index) => (
          <section
            key={product.id}
            id={product.id}
            className="scroll-mt-20"
          >
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Image */}
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="rounded-xl overflow-hidden border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                  <img
                    src={product.image}
                    alt={`${product.name} samples`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="text-gold-muted dark:text-gold text-xs tracking-[3px] uppercase mb-2">
                  {product.tagline}
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                  {product.name}
                </h2>
                <div className="flex gap-4 mb-4">
                  <span className="text-xl font-heading font-bold text-gold-muted dark:text-gold">
                    From {product.price}
                  </span>
                  <span className="text-sm text-[#888] dark:text-[#777] self-end">
                    Ready in {product.readyTime}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-5">
                  {product.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="text-gold-muted dark:text-gold mt-0.5">&#10003;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-[#888] dark:text-[#777] mb-5">
                  <span className="font-semibold">Best for:</span> {product.bestFor}
                </p>

                <Link
                  href={`/order?category=${product.id}`}
                  className="inline-block px-6 py-3 bg-gold-muted dark:bg-gold text-white dark:text-dark-bg font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Order {product.name.replace(" Stamps", "")} Stamp
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* JSON-LD Product Schema */}
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
                offers: {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: cat.price.replace("₹", ""),
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
