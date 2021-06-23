import { Input } from "antd";
import React, { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { KanbanContainer } from "./KanbanColumn";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";

export default function CreateKanban() {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <KanbanContainer>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        value={name}
        onChange={(event) => setName(event.target.value)}
        onPressEnter={submit}
      />
    </KanbanContainer>
  );
}
