import React from "react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

export interface User {
  id: number;
  name: string;
  token: string;
}

export default function List({ users, ...props }: ListProps) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "项目名",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(a.name),
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        { title: "部门", dataIndex: "organization" },
        {
          key: "id",
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
      ]}
      {...props}
    />
  );
}
