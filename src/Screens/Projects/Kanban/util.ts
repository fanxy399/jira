import { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useDebounce } from "utils";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
import { useUrlQueryParams } from "utils/url";

export const useProjectIdInUrl = () => {
  const { projectId } = useParams();
  return +projectId;
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksSearchParams = () => {
  const [searchParams] = useUrlQueryParams([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(searchParams.name, 200);
  return useMemo(
    () => ({
      projectId,
      name: debouncedName,
      typeId: +searchParams.typeId || undefined,
      tagId: +searchParams.tagId || undefined,
      processorId: +searchParams.processorId || undefined,
    }),
    [projectId, searchParams, debouncedName]
  );
};

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParams([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(+editingTaskId);
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
