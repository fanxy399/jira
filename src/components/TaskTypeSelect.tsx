import React from "react";
import { useTaskType } from "utils/taskType";
import IdSelect from "./IdSelect";

export default function TaskTypeSelect(
  props: React.ComponentProps<typeof IdSelect>
) {
  const { data: taskType } = useTaskType();
  return <IdSelect options={taskType || []} {...props} />;
}
