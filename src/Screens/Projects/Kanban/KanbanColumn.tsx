import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useKanbanQueryKey, useTasksModal, useTasksSearchParams } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { useTaskType } from "utils/taskType";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import styled from "styled-components";
import CreateTask from "./CreateTask";
import { Row } from "components/lib";
import Mark from "components/Mark";
import { useDeleteKanban } from "utils/kanban";
import { Drag, Drop, DropChild } from "components/DrapAndDrop";

const TaskTypeIcon = ({ typeId }: { typeId: number }) => {
  const { data: taskTypes } = useTaskType();
  const name = taskTypes?.find((taskType) => taskType.id === typeId)?.name;
  return <img src={name === "task" ? taskIcon : bugIcon} alt={"task-icon"} />;
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutate: deleteKanban } = useDeleteKanban(useKanbanQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定要删除看板吗？",
      onOk() {
        deleteKanban({ id: +kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { startEdit } = useTasksModal();
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  const { name: keyword } = useTasksSearchParams();
  return (
    <KanbanContainer ref={ref} {...props}>
      <Row between={true}>
        <h2>{kanban.name}</h2>
        <More kanban={kanban} />
      </Row>
      <TaskContainer>
        <Drop
          type={"ROW"}
          direction={"vertical"}
          droppableId={String(kanban.id)}
        >
          <DropChild style={{ minHeight: "1rem" }}>
            {tasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                index={taskIndex}
                draggableId={"task" + task.id}
              >
                <div>
                  <Card
                    onClick={() => {
                      startEdit(task.id);
                    }}
                    key={task.id}
                    style={{ marginBottom: "0.5rem", cursor: "pointer" }}
                  >
                    <p>
                      <Mark name={task.name} keyword={keyword} />
                    </p>
                    <TaskTypeIcon typeId={task.typeId} />
                  </Card>
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </KanbanContainer>
  );
});

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
