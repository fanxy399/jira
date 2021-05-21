import { Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";

export default function ProjectModal() {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      placement="right"
      onClose={close}
      visible={projectModalOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
