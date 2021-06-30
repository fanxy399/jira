import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Epic } from "types/epic";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { useProjectInUrl } from "../Kanban/util";
import CreateEpic from "./CreateEpic";
import { useEpicQueryKey, useEpicSearchParams } from "./utils";

export default function EpicScreen() {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <ListContainer>
        <List
          dataSource={epics}
          itemLayout={"vertical"}
          renderItem={(epic) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span>{epic.name}</span>
                    <Button
                      onClick={() => confirmDeleteEpic(epic)}
                      type={"link"}
                    >
                      删除
                    </Button>
                  </Row>
                }
                description={
                  <div>
                    <div>
                      开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}
                    </div>
                    <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              />
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <Link
                      key={task.id}
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                      style={{ marginRight: "9px" }}
                    >
                      {task.name}
                    </Link>
                  ))}
              </div>
            </List.Item>
          )}
        ></List>
      </ListContainer>
      <CreateEpic
        visible={epicCreateOpen}
        onClose={() => setEpicCreateOpen(false)}
      />
    </ScreenContainer>
  );
}

const ListContainer = styled.div`
  text-align: start;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 3px #9b9ba3;
    background: rgba(152, 155, 163, 0.5);
  }
`;
