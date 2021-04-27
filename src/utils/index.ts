import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const isVoid = (value: any) =>
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

export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
