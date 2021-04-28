import { User } from "Screens/Projects/List";

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
    <div>
      <input
        type="text"
        value={search.name}
        onChange={(e) => setSearch({ ...search, name: e.target.value })}
      />
      <select
        value={search.personId}
        onChange={(e) => setSearch({ ...search, personId: e.target.value })}
      >
        <option value="">负责人</option>
        {users.map((el) => (
          <option value={el.id} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
}
