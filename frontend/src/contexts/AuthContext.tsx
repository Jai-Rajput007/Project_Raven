"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// User Type
interface User {
  email: string;
  user_type: string;
}

// AuthContext Type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: string) => Promise<void>;
  logout: () => void;
}

// Creating Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check user state on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Login Function
  const login = async (email: string, password: string, userType: string) => {
    const router = useRouter(); // Moved here to avoid hydration errors
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, user_type: userType }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push(" /home"); // Adjust the redirect as needed
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Server error. Please try again.");
    }
  };

  // Logout Function
  const logout = () => {
    const router = useRouter(); // Moved here to avoid hydration errors
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Named export to maintain consistency
export { AuthContext };
