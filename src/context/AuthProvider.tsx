"use client";

import React, { useState, createContext, ReactNode, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { usePathname } from "next/navigation";

export const AuthContext = createContext<any | undefined>(undefined);

type AuthUser = {
  email: string;
  image: string;
};
export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [user, setUser] = useState<AuthUser>({
    email: "",
    image: "",
  });

  const { getItem } = useLocalStorage();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStore = getItem("user");

    if (userStore) {
      setUser(JSON.parse(userStore));
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
