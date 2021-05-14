import { useDebounce, useDoucmentTitle } from "utils";
import List from "Screens/Projects/List";
import Search from "Screens/Projects/Search";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParams } from "utils/url";

export default function Screens() {
  const [search, setSearch] = useUrlQueryParams(["name", "personId"]);
  const debounceSearch = useDebounce(search, 500);
  const { isLoading, data: list, error } = useProject(debounceSearch);
  const { data: users } = useUser();
  useDoucmentTitle("项目列表", false);

  return (
    <div>
      <Search search={search} setSearch={setSearch} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </div>
  );
}

Screens.whyDidYouRender = true;
