import React, { createContext, useState, useEffect } from "react";
import { AuthContextType, User } from "@/types/auth";
import { authApi } from "@/api/authApi";
import { storage } from "@/utils/storage";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = storage.get<string>("authToken");
      const storedUserRaw = storage.get<string>("authUser");

      if (storedToken && storedUserRaw) {
        let parsedUser: User;

        if (typeof storedUserRaw === "object") {
          parsedUser = storedUserRaw as User;
        } else {
          parsedUser = JSON.parse(storedUserRaw);
        }

        setToken(storedToken);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error reading user data from storage:", error);
      storage.clearAuth();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await authApi.signup(name, email, password);
      storage.set("authToken", data.token);
      storage.set("authUser", JSON.stringify({ name: data.name, email: data.email }));
      setToken(data.token);
      setUser({ name: data.name, email: data.email, token: data.token });
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err.message);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const data = await authApi.signin(email, password);
      storage.set("authToken", data.token);
      storage.set("authUser", JSON.stringify({ name: data.name, email: data.email }));
      setToken(data.token);
      setUser({ name: data.name, email: data.email, token: data.token });
    } catch (err: any) {
      console.error("Signin error:", err);
      alert(err.message);
    }
  };

  const logout = () => {
    storage.clearAuth();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
