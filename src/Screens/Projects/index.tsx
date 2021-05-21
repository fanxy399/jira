import { useDebounce, useDoucmentTitle } from "utils";
import List from "Screens/Projects/List";
import Search from "Screens/Projects/Search";
import { Button, Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import { Row } from "components/lib";

export default function Screens() {
  const [search, setSearch] = useProjectSearchParams();
  const debounceSearch = useDebounce(search, 500);
  const { isLoading, data: list, error, reTry } = useProject(debounceSearch);
  const { data: users } = useUser();
  const { open } = useProjectModal();
  useDoucmentTitle("项目列表", false);

  return (
    <div>
      <Row between={true} style={{ marginBottom: "2rem" }}>
        <h2>项目列表</h2>
        <Button onClick={() => open()}>创建项目</Button>
      </Row>
      <Search search={search} setSearch={setSearch} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={reTry}
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      />
    </div>
  );
}

Screens.whyDidYouRender = true;
