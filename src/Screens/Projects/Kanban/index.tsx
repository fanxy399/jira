import React from "react";
import styled from "styled-components";
import { useDoucmentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import KanbanColumn from "./KanbanColumn";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export default function Kanban() {
  useDoucmentTitle("看板列表");
  const { data: project } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{project?.name}看板</h1>
      <KanbanColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </KanbanColumnContainer>
    </div>
  );
}

const KanbanColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
