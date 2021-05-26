import { Button, Input } from "antd";
import { Row } from "components/lib";
import React from "react";
import { useTasksSearchParams } from "./util";
import { useSetUrlSearchParams } from "utils/url";
import UserSelect from "components/UserSelect";
import TaskTypeSelect from "components/TaskTypeSelect";

export default function SearchPanel() {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const rest = () =>
    setSearchParams({
      name: undefined,
      typeId: undefined,
      tagId: undefined,
      processorId: undefined,
    });
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        allowClear
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(event) => setSearchParams({ name: event.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={rest}>重置筛选器</Button>
    </Row>
  );
}
