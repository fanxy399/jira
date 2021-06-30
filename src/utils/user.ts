import { useHttp } from "utils/http";
import { User } from "types/user";
import { useQuery } from "react-query";

export const useUser = (params?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", params], () =>
    client("users", { data: params })
  );
};
