import { useMemo } from "react";
import { useProject } from "utils/project";

import { useUrlQueryParams } from "utils/url";

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
  const { data: editingProject, isLoading } = useProject(+editingProjectId);
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  const close = () => {
    setProjectCreate({ projectCreate: undefined });
    setEditingProjectId({ editingProjectId: undefined });
  };

  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    editingProject,
    isLoading,
    startEdit,
  };
};
