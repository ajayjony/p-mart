"use client";

import { useState } from "react";

interface Props {
  onSignIn: (email: string, password: string) => Promise<void>;
}

export default function LoginForm({ onSignIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSignIn(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-gold-muted dark:focus:ring-gold";

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-[#888] dark:text-[#777] mt-1">P MART Order Management</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
            <input id="email" type="email" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
            <input id="password" type="password" required className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-status-cancelled">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gold-muted dark:bg-gold text-white dark:text-dark-bg font-semibold rounded-lg hover:opacity-90 disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
