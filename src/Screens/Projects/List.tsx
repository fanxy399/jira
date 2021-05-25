import React from "react";
import { Dropdown, Menu, Table, TableProps, Modal } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import CustomRate from "components/CustomRate";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";

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
  const { mutate } = useEditProject(useProjectsQueryKey());
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
                  mutate({ id: project.id, pin });
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
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const { mutate } = useDeleteProject(useProjectsQueryKey());
  const deletePoject = (project: Project) => {
    Modal.confirm({
      title: "确定要删除这个项目吗？",
      content: "点击确定删除",
      okText: "确认",
      onOk() {
        mutate(project);
      },
      cancelText: "取消",
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={() => startEdit(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item key={"delete"} onClick={() => deletePoject(project)}>
            {" "}
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>···</ButtonNoPadding>
    </Dropdown>
  );
};
