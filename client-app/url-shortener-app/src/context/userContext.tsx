import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

import { ReactNode } from "react";

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("http://localhost:5001/api/auth/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
