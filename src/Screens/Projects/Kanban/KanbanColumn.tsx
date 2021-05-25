import React from "react";
import { Kanan } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { useTaskType } from "utils/taskType";
import { Card } from "antd";
import styled from "styled-components";

const TaskTypeIcon = ({ typeId }: { typeId: number }) => {
  const { data: taskTypes } = useTaskType();
  const name = taskTypes?.find((taskType) => taskType.id === typeId)?.name;
  return <img src={name === "task" ? taskIcon : bugIcon} alt={"task-icon"} />;
};

export default function KanbanColumn({ kanban }: { kanban: Kanan }) {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.id === kanban.id);
  return (
    <KanbanContainer>
      <h2>{kanban.name}</h2>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon typeId={task.typeId} />
          </Card>
        ))}
      </TaskContainer>
    </KanbanContainer>
  );
}

const KanbanContainer = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
