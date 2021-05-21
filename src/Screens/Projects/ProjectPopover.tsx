import { Popover, Typography, List, Divider } from "antd";
import { ButtonNoPadding } from "components/lib";
import React from "react";
import { projectListActions } from "store/slice/porjectList";
import styled from "styled-components";
import { useProject } from "utils/project";
import { useDispatch } from "react-redux";

export default function ProjectPopover() {
  const { data: projectList } = useProject();
  const pinedPorjectList = projectList?.filter((el) => el.pin);
  const dispatch = useDispatch();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinedPorjectList?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type={"link"}
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
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
