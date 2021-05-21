import React from "react";
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import CustomRate from "components/CustomRate";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "store/slice/porjectList";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: boolean;
  created: number;
}

export interface User {
  id: number;
  name: string;
  token: string;
}

export default function List({ users, refresh, ...props }: ListProps) {
  const { mutate } = useEditProject();
  const dispatch = useDispatch();
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <CustomRate checked={true} disabled={true} />,
          render: (value, project) => {
            return (
              <CustomRate
                checked={project.pin}
                onCheckedChange={(pin) => {
                  mutate({ id: project.id, pin }).then(() => refresh?.());
                }}
              />
            );
          },
        },
        {
          title: "项目名",
          sorter: (a, b) => a.name.localeCompare(a.name),
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        { title: "部门", dataIndex: "organization" },
        {
          title: "项目负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        type={"link"}
                        onClick={() =>
                          dispatch(projectListActions.openProjectModal())
                        }
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>···</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
}
