"use client";
import { createContext, useState, ReactNode } from "react";

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  isAuth: boolean;
  login: () => void;
  logout: () => void;
  identity: { name: string; username: string };
  setIdentity?: React.Dispatch<
    React.SetStateAction<{ name: string; username: string }>
  >;
}

// create context
export const AppContext = createContext<AppContextType>({
  theme: "light",
  toggleTheme: () => {},
  isAuth: false,
  login: () => {},
  logout: () => {},
  identity: { name: "", username: "" },
  setIdentity: () => {},
});

//buat komponen nya

export default function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>("light");
  const [identity, setIdentity] = useState<{ name: string; username: string }>({
    name: "Luvie",
    username: "20",
  });
  const [isAuth, setIsAuth] = useState(false);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const login = () => {
    setIsAuth(true);
  };
  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAuth,
        login,
        logout,
        identity,
        setIdentity
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
