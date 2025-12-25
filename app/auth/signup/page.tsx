"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Create the Auth User
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // Sets the default metadata for our admin check
        data: { isadmin: false },
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({
        type: "success",
        text: "Account created! Check your email for a confirmation link.",
      });
      // Optional: redirect after a delay
      // setTimeout(() => router.push("/auth/login"), 3000);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#111] border border-white/10 p-8 rounded-lg shadow-2xl">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              Create <span className="text-orange-600">Account</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
              Join the Crossfire Community
            </p>
          </header>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-orange-600 outline-none transition-colors"
                placeholder="operative@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-orange-600 outline-none transition-colors"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message.text && (
              <div
                className={`text-[10px] font-bold uppercase p-3 rounded border ${
                  message.type === "error"
                    ? "bg-red-500/10 border-red-500/50 text-red-500"
                    : "bg-green-500/10 border-green-500/50 text-green-500"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white hover:bg-orange-700 font-black uppercase py-4 rounded-sm transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-orange-600/20"
            >
              {loading ? "Initializing..." : "Deploy Account"}
            </button>
          </form>

          <footer className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              Already have credentials?{" "}
              <Link
                href="/auth/login"
                className="text-orange-500 hover:text-orange-400"
              >
                Sign In
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
