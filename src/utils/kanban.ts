import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Kanan } from "types/kanban";
import { cleanObject } from "utils";

export const useKanbans = (params?: Partial<Kanan>) => {
  const client = useHttp();
  return useQuery<Kanan[]>(["kanbans", params], () =>
    client("kanbans", { data: cleanObject(params || {}) })
  );
};
