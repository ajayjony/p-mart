"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/order", label: "Order" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-light-border dark:border-dark-border bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold tracking-wider text-brown-deep dark:text-cream">
            P MART
          </span>
          <span className="text-[10px] tracking-[3px] text-gold-muted dark:text-gold uppercase hidden sm:inline">
            STAMPS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#666] dark:text-[#999] hover:text-gold-muted dark:hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-brown-deep dark:text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-light-border dark:border-dark-border px-4 py-3 space-y-3 bg-light-bg dark:bg-dark-bg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-[#666] dark:text-[#999] hover:text-gold-muted dark:hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
