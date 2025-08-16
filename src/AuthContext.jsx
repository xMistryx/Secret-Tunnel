import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async (username) => {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username}),
      });
      const data = await response.json();
      console.log(data);
      if (data.token) {
        setToken(data.token);
        setLocation("TABLET");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // TODO: authenticate
  const authenticate = async () => {
    if (!token) {
    throw new Error(error);
    }
    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      const data = await response.json();
      console.log(data);
      if (data) {
        setLocation("TUNNEL");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const value = { authenticate, location, signup, setLocation };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
