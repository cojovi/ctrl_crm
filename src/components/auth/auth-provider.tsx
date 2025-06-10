import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  phone?: string;
  joinDate?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // In a real app, we would fetch user profile from a database
          // For demo purposes, extracting name from email or using defaults
          const email = session.user.email!;
          const nameParts = email.split('@')[0].split('.');
          const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'John';
          const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'Doe';
          
          setUser({
            id: session.user.id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: 'admin',
            joinDate: session.user.created_at,
            phone: session.user.phone || '(555) 123-4567'
          });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session) {
          const email = session.user.email!;
          const nameParts = email.split('@')[0].split('.');
          const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'John';
          const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'Doe';
          
          setUser({
            id: session.user.id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: 'admin',
            joinDate: session.user.created_at,
            phone: session.user.phone || '(555) 123-4567'
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        // In a real app, this would update the database
        console.log('User updated:', updatedUser);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}