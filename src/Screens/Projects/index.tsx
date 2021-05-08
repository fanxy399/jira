import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import List from "Screens/Projects/List";
import Search from "Screens/Projects/Search";
import { useHttp } from "utils/http";

export default function Screens() {
  const [search, setSearch] = useState({
    name: "",
    personId: "",
  });
  const debounceSearch = useDebounce(search, 500);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceSearch) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <Search search={search} setSearch={setSearch} users={users} />
      <List list={list} users={users} />
    </div>
  );
}
