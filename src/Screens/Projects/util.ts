import { useMemo } from "react";

import { useUrlQueryParams } from "utils/url";

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
  const [search, setSearch] = useUrlQueryParams(["name", "personId"]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [
    useMemo(
      () => ({ ...search, personId: Number(search.personId) || undefined }),
      [search]
    ),
    setSearch,
  ] as const;
};
