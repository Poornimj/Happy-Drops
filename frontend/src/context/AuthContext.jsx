import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  apiRequest,
  clearAuthSession,
  getAuthToken,
  getStoredUser,
  saveAuthSession,
} from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(getAuthToken()));

  useEffect(() => {
    if (!getAuthToken()) return;

    apiRequest("/api/auth/me", { auth: true })
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => {
        clearAuthSession();
        setUser(null);
      })
      .finally(() => setIsCheckingSession(false));
  }, []);

  const value = useMemo(() => ({
    user,
    isCheckingSession,
    login(session, remember = true) {
      saveAuthSession(session, remember);
      setUser(session.user);
    },
    async logout() {
      try {
        if (getAuthToken()) await apiRequest("/api/auth/logout", { method: "POST", auth: true });
      } finally {
        clearAuthSession();
        setUser(null);
      }
    },
  }), [user, isCheckingSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
