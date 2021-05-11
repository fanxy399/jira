import { User } from "Screens/Projects/List";
import { Input, Select } from "antd";

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
    <div style={{ margin: "10px 0px", display: "flex" }}>
      <Input
        style={{ marginRight: "50px" }}
        type="text"
        value={search.name}
        onChange={(e) => setSearch({ ...search, name: e.target.value })}
      />
      <Select
        value={search.personId}
        onChange={(value) => setSearch({ ...search, personId: value })}
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((el) => (
          <Select.Option value={el.id} key={el.id}>
            {el.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
