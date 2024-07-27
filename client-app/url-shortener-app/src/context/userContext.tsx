import axios from "axios";
import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  FC,
  useContext,
} from "react";
import { ServerUrl } from "../helper/Constants";

interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(`${ServerUrl}/auth/profile`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
