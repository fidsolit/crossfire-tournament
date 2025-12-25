// components/Navbar.tsx
"use client";
import { useAuthStore } from "../store/useAuthStore";
import Link from "next/link";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuthStore();

  return (
    <nav className="bg-[#111] border-b border-white/5 p-4 flex justify-between items-center">
      <Link href="/" className="font-black italic text-orange-600 text-xl">
        CROSSFIRE
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          href="/brackets"
          className="text-xs font-bold uppercase tracking-widest"
        >
          Brackets
        </Link>

        {/* Only show Admin link if isAdmin is true */}
        {isAdmin && (
          <Link
            href="/admin"
            className="text-xs font-bold uppercase tracking-widest text-orange-500"
          >
            Control Center
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="text-[10px] font-black uppercase bg-white/5 px-4 py-2 border border-white/10"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="text-[10px] font-black uppercase bg-orange-600 px-4 py-2"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
