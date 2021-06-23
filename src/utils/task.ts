import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { Task } from "types/task";
import { useAddConfig } from "./useOptimisticOptions";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: cleanObject(params || {}) })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client("tasks", {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};
