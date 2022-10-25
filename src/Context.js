import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./FireBase/config";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const clean = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        if (displayName) {
          setUser({ displayName, email, photoURL, uid });
          navigate("/");
        }
      }
    });
    return () => {
      clean();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
