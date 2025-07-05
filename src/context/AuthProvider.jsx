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
        console.error(error);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (formData) => {
    try {
      await api.post("/api/auth/login", formData, { withCredentials: true });
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw new Error("Invalid email or password.");
    }
  };

  const register = async (formData) => {
    try {
      await api.post("/api/auth/register", formData, { withCredentials: true });
    } catch (error) {
      console.error(error);
      throw new Error("Registration failed.");
    }
  };

  const logout = async () => {
    await api.post("/api/auth/logout", {}, { withCredentials: true });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {!isCheckingAuth && children}
    </AuthContext.Provider>
  );
};
