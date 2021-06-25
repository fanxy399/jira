import { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useDebounce } from "utils";
import { useProject } from "utils/project";
import { useReorderTask, useTask, useTasks } from "utils/task";
import { useUrlQueryParams } from "utils/url";
import { DropResult } from "react-beautiful-dnd";
import { useKanbans, useReorderKanban } from "utils/kanban";

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

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: tasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reOrderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutate: reOrderTask } = useReorderTask(useTasksQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === "CLOUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) return;
        reOrderKanban({
          fromId,
          referenceId: toId,
          type: source.index < destination.index ? "after" : "before",
        });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTaskId = tasks?.filter(
          (item) => item.kanbanId === fromKanbanId
        )[source.index]?.id;
        const toTaskId = tasks?.filter((item) => item.kanbanId === toKanbanId)[
          destination.index
        ]?.id;
        if (fromTaskId === toTaskId) return;
        reOrderTask({
          fromKanbanId,
          toKanbanId,
          fromId: fromTaskId,
          referenceId: toTaskId,
          type:
            fromKanbanId === toKanbanId && source.index < destination.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reOrderKanban, reOrderTask, tasks]
  );
};
