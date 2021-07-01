import { useDebounce, useDoucmentTitle } from "utils";
import List from "Screens/Projects/List";
import Search from "Screens/Projects/Search";
import { Button } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import { Row, ErrorBox } from "components/lib";
import { Profiler } from "components/Profiler";

export default function Screens() {
  const [search, setSearch] = useProjectSearchParams();
  const debounceSearch = useDebounce(search, 500);
  const { isLoading, data: list, error } = useProjects(debounceSearch);
  const { data: users } = useUser();
  const { open } = useProjectModal();
  useDoucmentTitle("项目列表", false);

  return (
    <Profiler id={"项目列表"}>
      <div style={{ width: "100%" }}>
        <Row between={true} style={{ marginBottom: "2rem" }}>
          <h2>项目列表</h2>
          <Button onClick={() => open()}>创建项目</Button>
        </Row>
        <Search search={search} setSearch={setSearch} users={users || []} />
        <ErrorBox error={error} />
        <List dataSource={list || []} users={users || []} loading={isLoading} />
      </div>
    </Profiler>
  );
}

Screens.whyDidYouRender = true;
