import Hero from "@/components/home/Hero";
import HowToOrder from "@/components/home/HowToOrder";
import CategoryCards from "@/components/home/CategoryCards";
import { SHOP_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <HowToOrder />

      {/* Testimonials placeholder */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-[#888] dark:text-[#777] mb-8">Trusted by businesses across Chennai</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Priya M.", text: "Quick turnaround and excellent quality. My clinic stamps were ready in 10 minutes!" },
              { name: "Rajesh K.", text: "Best stamp maker in Mogappair. Very professional service and fast delivery." },
              { name: "Sathya Trust", text: "We've been ordering all our trust seals from P MART for 3 years. Highly reliable." },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 text-left">
                <p className="text-sm italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold text-gold-muted dark:text-gold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: SHOP_NAME,
            description: "Premium custom rubber stamps in Chennai",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2/PC-5, Mogappair West",
              addressLocality: "Chennai",
              postalCode: "600037",
              addressCountry: "IN",
            },
            telephone: "+917401999111",
            email: "prakashstores2015@gmail.com",
            priceRange: "₹150 - ₹500",
          }),
        }}
      />
    </>
  );
}
