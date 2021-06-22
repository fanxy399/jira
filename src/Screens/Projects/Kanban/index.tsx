import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import React from "react";
import styled from "styled-components";
import { useDoucmentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import KanbanColumn from "./KanbanColumn";
import SearchPanel from "./SearchPanel";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";

export default function Kanban() {
  useDoucmentTitle("看板列表");
  const { data: project } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanLoading || taskLoading;
  return (
    <ScreenContainer>
      <h1>{project?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {isLoading ? (
          <Spin tip="Loading..." />
        ) : (
          kanbans?.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban} />
          ))
        )}
      </ColumnsContainer>
    </ScreenContainer>
  );
}

export const ColumnsContainer = styled("div")`
  display: flex;
  flex: 1;
  .ant-spin {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
