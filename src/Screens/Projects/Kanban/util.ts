import { useParams } from "react-router";
import { useProject } from "utils/project";

export const useProjectIdInUrl = () => {
  const { projectId } = useParams();
  return +projectId;
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useTaskQueryKey = () => ["Tasks", useTaskSearchParams()];
