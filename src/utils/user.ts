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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return result;
};
