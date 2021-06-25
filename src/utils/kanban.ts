import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { cleanObject } from "utils";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./useOptimisticOptions";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: cleanObject(params || {}) })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      method: "POST",
      data: params,
    });
  }, useReorderKanbanConfig(queryKey));
};
