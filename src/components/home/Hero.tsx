import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-20 md:py-32 text-center px-4">
      <p className="text-gold-muted dark:text-gold text-xs tracking-[4px] uppercase mb-4">
        Since 2015 &bull; Chennai
      </p>
      <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
        Crafted with Precision
      </h1>
      <p className="text-lg md:text-xl max-w-xl mx-auto mb-8 text-[#777] dark:text-[#999]">
        Premium custom rubber stamps for businesses, doctors, schools &amp; more.
        Delivered to your doorstep.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/order"
          className="px-8 py-3 bg-gold-muted dark:bg-gold text-white dark:text-dark-bg font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Order Now
        </Link>
        <Link
          href="/products"
          className="px-8 py-3 border border-light-border dark:border-gold/30 rounded-lg hover:border-gold-muted dark:hover:border-gold transition-colors"
        >
          View Products
        </Link>
      </div>
    </section>
  );
}
