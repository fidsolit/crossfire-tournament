import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAdmin: boolean;
  isLoading: boolean;
  setAuth: (user: any) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: true, // Start as true
  setLoading: (loading) => set({ isLoading: loading }),
  setAuth: (user) => {
    // Check for your specific admin email
    const isUserAdmin =
      user?.email === "admin@yourgame.com" ||
      user?.user_metadata?.isadmin === true;
    set({ user, isAdmin: isUserAdmin, isLoading: false });
  },
  logout: () => set({ user: null, isAdmin: false, isLoading: false }),
}));
