export const isFalsy = (value) => (value === 0 ? false : !value);

export const isVoid = (value) =>
  value === undefined || value === null || value === "";

export function cleanObject(object) {
  const result = { ...object };
  Object.keys(result).forEach((el) => {
    if (isVoid(result[el])) delete result[el];
  });
  return result;
}
