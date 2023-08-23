import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const loggedIn = localStorage.getItem("user");

  useEffect(() => {
    console.log(user);
    if (loggedIn) {
      setUser(loggedIn);
    }
  }, [user]);

  const login = (user: any) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
