import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import React from "react";
import styled from "styled-components";
import { useDoucmentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import CreateKanban from "./CreateKanban";
import KanbanColumn from "./KanbanColumn";
import SearchPanel from "./SearchPanel";
import TaskModal from "./TaskModal";
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
        <CreateKanban />
        <TaskModal />
      </ColumnsContainer>
    </ScreenContainer>
  );
}

export const ColumnsContainer = styled("div")`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 3px #9b9ba3;
    background: rgba(152, 155, 163, 0.5);
  }
  .ant-spin {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
