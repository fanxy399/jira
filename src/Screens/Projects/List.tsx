import React from "react";
import { Table } from "antd";

interface ListProps {
  list: Project[];
  users: User[];
}

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
}

export interface User {
  id: string;
  name: string;
  token: string;
}

export default function List(props: ListProps) {
  const { list, users } = props;
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "项目名",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(a.name),
        },
        { title: "项目名", dataIndex: "organization" },
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
      ]}
      dataSource={list}
    />
  );
}
