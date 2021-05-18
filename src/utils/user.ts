import { useHttp } from "utils/http";
import { cleanObject } from "utils";
import { useAsync } from "./useAsync";
import { User } from "Screens/Projects/List";
import { useEffect } from "react";

export const useUser = (params?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("users", { data: cleanObject(params || {}) }));
  }, [client, params, run]);
  return result;
};
