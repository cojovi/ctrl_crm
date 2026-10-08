import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const DEMO_LOGIN = 'admin';
const DEMO_PASSWORD = 'bluemoon25';
const SESSION_KEY = 'ctrl-crm-demo-session';

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const demoUser: User = {
  id: 'admin',
  username: 'admin',
  email: 'admin@ctrlaltgarage.com',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved) as User);
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    const matches =
      username.trim().toLowerCase() === DEMO_LOGIN && password === DEMO_PASSWORD;

    if (!matches) {
      throw new Error('Invalid login');
    }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const signOut = async () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
