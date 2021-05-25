import { useMemo } from "react";
import { useProject } from "utils/project";

import { useUrlQueryParams, useUrlSearchParams } from "utils/url";

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
  const [search, setSearch] = useUrlQueryParams(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...search, personId: Number(search.personId) || undefined }),
      [search]
    ),
    setSearch,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [projectsSearchParmas] = useProjectSearchParams();
  return ["projects", projectsSearchParmas];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams([
    "editingProjectId",
  ]);
  const setUrlParams = useUrlSearchParams();
  const { data: editingProject, isLoading } = useProject(+editingProjectId);
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });

  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    editingProject,
    isLoading,
    startEdit,
  };
};
