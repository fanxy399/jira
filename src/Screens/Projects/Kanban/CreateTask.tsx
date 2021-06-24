import { Button, Card, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export default function CreateTask({ kanbanId }: { kanbanId: number }) {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) setName("");
  }, [inputMode]);

  if (!inputMode)
    return (
      <Button type="primary" onClick={toggle} icon={<PlusOutlined />}>
        创建事务
      </Button>
    );

  return (
    <Card>
      <Input
        autoFocus={true}
        onBlur={toggle}
        placeholder={"需要做些什么"}
        onPressEnter={submit}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </Card>
  );
}
