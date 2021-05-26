import { User } from "types/user";
import { Project } from "types/project";
import { Input, Form } from "antd";
import UserSelect from "components/UserSelect";

interface SearchProps {
  search: Partial<Pick<Project, "name" | "personId">>;
  setSearch: (params: SearchProps["search"]) => void;
  users: User[];
}

export default function Search(props: SearchProps) {
  const { search, setSearch } = props;
  return (
    <Form style={{ marginBottom: "1rem" }} layout="inline">
      <Form.Item>
        <Input
          allowClear
          placeholder="项目名"
          style={{ marginRight: "50px" }}
          type="text"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={search.personId}
          onChange={(value) => setSearch({ ...search, personId: value })}
        />
      </Form.Item>
    </Form>
  );
}
