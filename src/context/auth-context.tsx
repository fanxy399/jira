import React, { useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "Screens/Projects/List";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageLoading, FullPageErrorFallback } from "components/lib";
import * as authStore from "store/slice/auth";
import { useDispatch, useSelector } from "react-redux";

export interface Authform {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.token();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const { run, isLoading, isError, isIdle, error } = useAsync<User | null>();
  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });
  if (isLoading || isIdle) return <FullPageLoading />;
  if (isError) return <FullPageErrorFallback error={error} />;
  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: Authform) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: Authform) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
