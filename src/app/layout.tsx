import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppCTA from "@/components/layout/WhatsAppCTA";

export const metadata: Metadata = {
  title: {
    default: "P MART — Custom Rubber Stamps Chennai",
    template: "%s | P MART Stamps",
  },
  description:
    "Premium custom rubber stamps in Chennai. Polymer, Pre-Ink & Self-Ink stamps for businesses, doctors, schools. Order online, delivered to your door.",
  keywords: [
    "rubber stamps Chennai",
    "custom stamps Mogappair",
    "self-ink stamps Chennai",
    "pre-ink stamps near me",
    "company seal stamp Chennai",
    "doctor stamp maker Chennai",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "P MART Stamps",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-light-bg dark:bg-dark-bg text-[#555555] dark:text-[#b0b0b0] antialiased transition-colors">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppCTA />
      </body>
    </html>
  );
}
