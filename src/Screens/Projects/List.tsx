import React from "react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

export interface User {
  id: string;
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
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(a.name),
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
