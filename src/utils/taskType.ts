import { useQuery } from "react-query";
import { TaskType } from "types/taskType";
import { useHttp } from "./http";

export const useTaskType = () => {
  const client = useHttp();
  return useQuery<TaskType[]>("taskType", () => client("taskType"));
};
