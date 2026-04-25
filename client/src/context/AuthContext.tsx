import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import api from "../lib/api";
import type { AuthResponse, User } from "../types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  bootstrapping: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);

  const persistAuth = ({ user: nextUser }: AuthResponse) => {
    setUser(nextUser);
  };

  useEffect(() => {
    const bootstrapSession = async () => {
      try {
        const { data } = await api.get<AuthResponse>("/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setBootstrapping(false);
      }
    };

    void bootstrapSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
      persistAuth(data);
      toast.success("Welcome back. Your care dashboard is ready.");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Unable to login right now.";
      toast.error(message ?? "Unable to login right now.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const { data } = await api.post<AuthResponse>("/auth/signup", { name, email, password });
      persistAuth(data);
      toast.success("Account created successfully.");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Unable to create your account.";
      toast.error(message ?? "Unable to create your account.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    void api.post("/auth/logout");
    setUser(null);
    toast.success("You have been logged out.");
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      bootstrapping,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, loading, bootstrapping],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
