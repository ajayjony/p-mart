import type { Metadata } from "next";
import { SHOP_NAME, SHOP_FULL_NAME, SHOP_ADDRESS, SHOP_EMAIL, WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "Visit P MART Prakash Printers in Mogappair West, Chennai. Custom rubber stamps since 2015. Contact us on WhatsApp.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <p className="text-gold-muted dark:text-gold text-xs tracking-[4px] uppercase mb-2">About Us</p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">{SHOP_NAME}</h1>
        <p className="text-[#888] dark:text-[#777] mt-2">{SHOP_FULL_NAME}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6">
          <h2 className="font-heading text-xl font-bold mb-4 text-gold-muted dark:text-gold">Our Story</h2>
          <p className="text-sm leading-relaxed mb-4">
            Since 2015, {SHOP_NAME} has been crafting premium custom rubber stamps for businesses,
            professionals, and institutions across Chennai. From company seals to doctor stamps,
            we deliver precision-crafted stamps that make an impression.
          </p>
          <p className="text-sm leading-relaxed">
            Every stamp is designed in-house and manufactured with care. We offer Polymer, Pre-Ink,
            and Self-Ink options to suit every need and budget, with turnaround times as fast as 10 minutes.
          </p>
        </div>

        <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6">
          <h2 className="font-heading text-xl font-bold mb-4 text-gold-muted dark:text-gold">Contact Us</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-semibold mb-1">Address</div>
              <p className="text-[#888] dark:text-[#777]">{SHOP_ADDRESS}</p>
            </div>
            <div>
              <div className="font-semibold mb-1">WhatsApp</div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-gold-muted dark:text-gold hover:underline">+91 74019 99111</a>
            </div>
            <div>
              <div className="font-semibold mb-1">Email</div>
              <a href={`mailto:${SHOP_EMAIL}`} className="text-gold-muted dark:text-gold hover:underline">{SHOP_EMAIL}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps placeholder - replace with actual embed URL for the shop */}
      <div className="mt-8 rounded-xl overflow-hidden border border-light-border dark:border-dark-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0!2d80.17!3d13.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMogappair+West%2C+Chennai!5e0!3m2!1sen!2sin!4v1"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="P MART Location - Mogappair West, Chennai"
        />
      </div>
    </div>
  );
}
