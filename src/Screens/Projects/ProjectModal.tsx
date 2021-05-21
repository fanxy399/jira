import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "store/slice/porjectList";

export default function ProjectModal() {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      placement="right"
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      visible={projectModalOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
