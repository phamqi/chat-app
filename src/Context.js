import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./FireBase/config";
import { getAuth, signOut } from "firebase/auth";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/auth");
      })
      .catch((error) => {});
  };
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
  const value = {
    user: user,
    logout: handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
