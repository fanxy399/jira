import { useArray, useMount } from "utils";

export default function TsUseArray() {
  const persons: { name: string; age: number }[] = [
    { name: "tony", age: 22 },
    { name: "jay", age: 36 },
  ];
  const { value, clean, removeIndex, add } = useArray(persons);
  useMount(() => {
    console.log(value);
    // add({name: 'david'})
    // removeIndex('25')
  });
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 15 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={clean}>clear</button>
      {value.map((person, index) => {
        return (
          <div key={index}>
            <span>{index}</span>
            <span style={{ padding: "0 30px" }}>{person.name}</span>
            <span>{person.age}</span>
          </div>
        );
      })}
    </div>
  );
}
