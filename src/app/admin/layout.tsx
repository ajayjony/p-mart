"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin") {
      router.replace("/admin");
    }
  }, [user, loading, pathname, router]);

  if (pathname === "/admin") return <>{children}</>;

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-light-border dark:border-dark-border">
        <div className="flex gap-4">
          <Link href="/admin/dashboard"
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              pathname === "/admin/dashboard" ? "bg-gold-muted/10 dark:bg-gold/10 text-gold-muted dark:text-gold" : "text-[#888] dark:text-[#777] hover:text-gold-muted dark:hover:text-gold"
            }`}>
            Dashboard
          </Link>
          <Link href="/admin/orders"
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              pathname === "/admin/orders" ? "bg-gold-muted/10 dark:bg-gold/10 text-gold-muted dark:text-gold" : "text-[#888] dark:text-[#777] hover:text-gold-muted dark:hover:text-gold"
            }`}>
            Orders
          </Link>
        </div>
        <button onClick={signOut} className="text-sm text-[#888] dark:text-[#777] hover:text-status-cancelled transition-colors">
          Sign Out
        </button>
      </div>
      {children}
    </div>
  );
}
