import React, { useState, useContext } from "react";
import * as auth from "auth-provider";
import { User } from "Screens/Projects/List";
import { http } from "utils/http";
import { useMount } from "utils";

interface Authform {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.token();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: Authform) => Promise<void>;
      register: (form: Authform) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: Authform) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: Authform) => auth.register(form).then(setUser); // setUser === (user => setUser(user)) 消除参数
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    bootstrapUser().then(setUser);
  });
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth必须在AuthProvider中使用");
  return context;
};
