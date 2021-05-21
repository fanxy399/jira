import { useEffect, useCallback } from "react";
import { Project } from "Screens/Projects/List";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [client, params]
  );
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [fetchProjects, params, run]);
  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...result,
  };
};

export const useAddProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "POST",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...result,
  };
};
