import { useState } from "react";
import { useDebounce } from "utils";
import List from "Screens/Projects/List";
import Search from "Screens/Projects/Search";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/user";

export default function Screens() {
  const [search, setSearch] = useState({
    name: "",
    personId: "",
  });
  const debounceSearch = useDebounce(search, 500);
  const { isLoading, data: list, error } = useProject(debounceSearch);
  const { data: users } = useUser();

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
