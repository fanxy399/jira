import { User } from "Screens/Projects/List";
import { Input, Select, Form } from "antd";

interface SearchProps {
  search: {
    name: string;
    personId: string;
  };
  setSearch: (params: SearchProps["search"]) => void;
  users: User[];
}

export default function Search(props: SearchProps) {
  const { search, setSearch, users } = props;
  return (
    <Form style={{ marginBottom: "1rem" }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          style={{ marginRight: "50px" }}
          type="text"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={search.personId}
          onChange={(value) => setSearch({ ...search, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((el) => (
            <Select.Option value={String(el.id)} key={el.id}>
              {el.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
