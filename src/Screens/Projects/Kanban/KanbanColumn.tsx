import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTasksModal, useTasksSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { useTaskType } from "utils/taskType";
import { Card } from "antd";
import styled from "styled-components";
import CreateTask from "./CreateTask";

const TaskTypeIcon = ({ typeId }: { typeId: number }) => {
  const { data: taskTypes } = useTaskType();
  const name = taskTypes?.find((taskType) => taskType.id === typeId)?.name;
  return <img src={name === "task" ? taskIcon : bugIcon} alt={"task-icon"} />;
};

export default function KanbanColumn({ kanban }: { kanban: Kanban }) {
  const { startEdit } = useTasksModal();
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <KanbanContainer>
      <h2>{kanban.name}</h2>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card
            onClick={() => {
              startEdit(task.id);
            }}
            key={task.id}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
          >
            <div>{task.name}</div>
            <TaskTypeIcon typeId={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </KanbanContainer>
  );
}

export const KanbanContainer = styled.div`
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
