import { Drawer } from "antd";
import React from "react";

export default function ProjectModal({
  projectModalOpen,
  onClose,
}: {
  projectModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      placement="right"
      onClose={onClose}
      visible={projectModalOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
