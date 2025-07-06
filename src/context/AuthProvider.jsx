import { useState, useEffect } from "react";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await api.get("/api/auth/check", { withCredentials: true });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login 
  const login = async (formData) => {
    try {
      await api.post("/api/auth/login", formData, { withCredentials: true });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password.");
    }
  };

  // Register 
  const register = async (formData) => {
    try {
      await api.post("/api/auth/register", formData, { withCredentials: true });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed.");
    }
  };

  // Logout 
  const logout = async () => {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isCheckingAuth, login, register, logout }}
    >
      {!isCheckingAuth && children}
    </AuthContext.Provider>
  );
};
