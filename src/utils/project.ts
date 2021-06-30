import { Project } from "types/project";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useEditConfig,
  useDeleteConfig,
  useAddConfig,
} from "utils/useOptimisticOptions";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", cleanObject(params)], () =>
    client("projects", { data: cleanObject(params || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery(["project", { id }], () => client(`projects/${id}`), {
    enabled: !!id,
  });
};
