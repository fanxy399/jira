import { useDebounce, useDoucmentTitle } from "utils";
import List from "Screens/Projects/List";
import Search from "Screens/Projects/Search";
import { Button, Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "store/slice/porjectList";

export default function Screens() {
  const [search, setSearch] = useProjectSearchParams();
  const debounceSearch = useDebounce(search, 500);
  const { isLoading, data: list, error, reTry } = useProject(debounceSearch);
  const { data: users } = useUser();
  useDoucmentTitle("项目列表", false);
  const dispatch = useDispatch();
  return (
    <div>
      <Row between={true} style={{ marginBottom: "2rem" }}>
        <h2>项目列表</h2>
        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>
          创建项目
        </Button>
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
