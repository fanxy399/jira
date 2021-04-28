import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((el) => {
    // @ts-ignore
    if (isVoid(result[el])) delete result[el];
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <v>(initArray: v[]) => {
  const [value, setValue] = useState(initArray);
  return {
    value,
    clean: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    add: (item: v) => setValue([...value, item]),
  };
};
