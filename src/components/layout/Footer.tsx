import Link from "next/link";
import { SHOP_NAME, SHOP_FULL_NAME, SHOP_ADDRESS, SHOP_EMAIL, WHATSAPP_NUMBER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold tracking-wider mb-2">{SHOP_NAME}</h3>
          <p className="text-sm text-[#888] dark:text-[#777]">{SHOP_FULL_NAME}</p>
          <p className="text-sm text-[#888] dark:text-[#777] mt-1">Since 2015 &bull; Chennai</p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gold-muted dark:text-gold mb-3">Quick Links</h4>
          <div className="space-y-2">
            {[
              { href: "/products", label: "Products" },
              { href: "/order", label: "Place Order" },
              { href: "/about", label: "About Us" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm text-[#666] dark:text-[#999] hover:text-gold-muted dark:hover:text-gold transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gold-muted dark:text-gold mb-3">Contact</h4>
          <p className="text-sm text-[#666] dark:text-[#999]">{SHOP_ADDRESS}</p>
          <p className="text-sm text-[#666] dark:text-[#999] mt-1">
            WhatsApp: <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-gold-muted dark:hover:text-gold">{WHATSAPP_NUMBER.replace("91", "+91 ")}</a>
          </p>
          <p className="text-sm text-[#666] dark:text-[#999] mt-1">
            Email: <a href={`mailto:${SHOP_EMAIL}`} className="hover:text-gold-muted dark:hover:text-gold">{SHOP_EMAIL}</a>
          </p>
        </div>
      </div>
      <div className="border-t border-light-border dark:border-dark-border py-4 text-center text-xs text-[#888] dark:text-[#666]">
        &copy; {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
