import { Popover, Typography, List, Divider } from "antd";
import React from "react";
import styled from "styled-components";
import { useUser } from "utils/user";

export default function UserPopover() {
  const { data: userList, refetch } = useUser();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {userList?.map((user, index) => (
          <List.Item key={index}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      content={content}
      placement={"bottom"}
    >
      <span>组员</span>
    </Popover>
  );
}

const ContentContainer = styled.div`
  width: 30rem;
`;
