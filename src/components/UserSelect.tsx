import React from "react";
import { useUser } from "utils/user";
import IdSelect from "./IdSelect";

export default function UserSelect(
  props: React.ComponentProps<typeof IdSelect>
) {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props} />;
}
