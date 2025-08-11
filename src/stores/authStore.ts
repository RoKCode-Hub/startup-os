import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

let authListenerInitialized = false;

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      // Initialize auth listener once
      const init = () => {
        // Listener: keep user/session in sync
        supabase.auth.onAuthStateChange((_event, session) => {
          const supaUser = session?.user ?? null;
          set({
            user: supaUser
              ? { id: supaUser.id, username: supaUser.email ?? 'user', role: 'admin' }
              : null,
            isAuthenticated: !!supaUser,
          });
        });

        // Initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
          const supaUser = session?.user ?? null;
          set({
            user: supaUser
              ? { id: supaUser.id, username: supaUser.email ?? 'user', role: 'admin' }
              : null,
            isAuthenticated: !!supaUser,
          });
        });
      };

      // Run init once (module-scoped flag avoids reading state before it's set)
      if (!authListenerInitialized) {
        authListenerInitialized = true;
        init();
      }

      return {
        user: null,
        isAuthenticated: false,
        login: async (email: string, password: string) => {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) return false;
          const session = data.session;
          const supaUser = session?.user ?? null;
          set({
            user: supaUser
              ? { id: supaUser.id, username: supaUser.email ?? 'user', role: 'admin' }
              : null,
            isAuthenticated: !!supaUser,
          });
          return true;
        },
        register: async (email: string, password: string) => {
          const redirectUrl = `${window.location.origin}/`;
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: redirectUrl },
          });
          return { error: error?.message };
        },
        logout: async () => {
          await supabase.auth.signOut();
          set({ user: null, isAuthenticated: false });
        },
      };
    },
    {
      name: 'auth-storage',
    }
  )
);
