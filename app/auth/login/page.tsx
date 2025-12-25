"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      // SIGN UP LOGIC
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This matches the profiles table trigger we set up earlier
          data: { isadmin: false },
        },
      });

      if (error) {
        alert(error.message);
      } else {
        alert(
          "Registration Successful! Please check your email for verification."
        );
        setIsSignUp(false); // Switch back to login
      }
    } else {
      // SIGN IN LOGIC
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else if (data.user) {
        // 1. Update your Zustand store
        await setAuth(data.user);

        // 2. Check Admin Status
        // We check both the metadata flag and a hardcoded master email for safety
        const isAdminUser =
          data.user.user_metadata?.isadmin === true ||
          data.user.email === "admin@battlefield.com";

        // 3. Conditional Redirect
        if (isAdminUser) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleAuth}
          className="bg-[#111] border border-white/5 p-8 rounded-xl shadow-2xl transition-all"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-black italic uppercase text-orange-600">
              {isSignUp ? "Register" : "Authenticate"}{" "}
              <span className="text-white">Account</span>
            </h2>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              {isSignUp
                ? "Create new operative credentials"
                : "Enter secure zone access"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="group">
              <label className="text-[9px] font-black uppercase text-gray-600 ml-1 mb-1 block">
                Username/Email
              </label>
              <input
                type="email"
                required
                placeholder="EMAIL@DATABASE.COM"
                className="w-full bg-black border border-white/10 p-3 text-xs font-bold uppercase outline-none focus:border-orange-600 transition-all text-white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group">
              <label className="text-[9px] font-black uppercase text-gray-600 ml-1 mb-1 block">
                Security Key
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 p-3 text-xs font-bold uppercase outline-none focus:border-orange-600 transition-all text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-[10px] font-black uppercase transition-all shadow-lg mt-4 ${
                loading
                  ? "bg-gray-800 text-gray-500"
                  : "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20"
              }`}
            >
              {loading
                ? "Processing..."
                : isSignUp
                ? "Deploy Account"
                : "Secure Sign In"}
            </button>
          </div>
        </form>

        {/* TOGGLE BUTTON */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[10px] font-black uppercase text-gray-500 hover:text-orange-600 transition-colors tracking-widest"
          >
            {isSignUp
              ? "Already have access? — Login"
              : "New Operative? — Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
