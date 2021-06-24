import { Popover, Typography, List, Divider } from "antd";
import { ButtonNoPadding } from "components/lib";
import React from "react";
import styled from "styled-components";
import { useProjects } from "utils/project";
import { useProjectModal } from "./util";

export default function ProjectPopover() {
  const { data: projectList } = useProjects();
  const { open } = useProjectModal();
  const pinedPorjectList = projectList?.filter((el) => el.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinedPorjectList?.map((project, index) => (
          <List.Item key={index}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type={"link"} onClick={() => open()}>
        添加项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover content={content} placement={"bottom"}>
      <span>项目</span>
    </Popover>
  );
}

const ContentContainer = styled.div`
  width: 30rem;
`;
