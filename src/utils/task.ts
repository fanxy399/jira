import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "utils";
import { Task } from "types/task";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: cleanObject(params || {}) })
  );
};