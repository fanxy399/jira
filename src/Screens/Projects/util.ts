import { useMemo } from "react";

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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: null });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
