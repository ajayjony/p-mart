"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/admin/LoginForm";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/admin/dashboard");
  }, [user, router]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  if (user) return null;

  return <LoginForm onSignIn={signIn} />;
}
