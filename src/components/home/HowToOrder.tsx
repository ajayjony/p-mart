const STEPS = [
  { number: "01", title: "Choose Your Stamp", description: "Browse our collection of polymer, pre-ink, and self-ink stamps" },
  { number: "02", title: "Enter Details", description: "Fill in your stamp text and contact information on our order form" },
  { number: "03", title: "Approve Proof", description: "We design your stamp and send a proof via WhatsApp for your review" },
  { number: "04", title: "Receive Stamp", description: "Pay via GPay and collect from shop or get it delivered to your door" },
];

export default function HowToOrder() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">
          How to Order
        </h2>
        <p className="text-center text-[#888] dark:text-[#777] mb-12">
          Four simple steps to your custom stamp
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center p-6 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
              <div className="text-3xl font-heading font-bold text-gold-muted dark:text-gold mb-3">{step.number}</div>
              <h3 className="font-heading text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-[#888] dark:text-[#777]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
