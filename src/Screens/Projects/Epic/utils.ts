import { useProjectIdInUrl } from "../Kanban/util";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];