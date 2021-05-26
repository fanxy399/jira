import { ScreenContainer } from "components/lib";
import React from "react";
import styled from "styled-components";
import { useDoucmentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import KanbanColumn from "./KanbanColumn";
import SearchPanel from "./SearchPanel";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export default function Kanban() {
  useDoucmentTitle("看板列表");
  const { data: project } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1>{project?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
}

export const ColumnsContainer = styled("div")`
  display: flex;
  /* justify-content: space-between; */
  flex: 1;
`;
