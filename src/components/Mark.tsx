import React from "react";

export default function Mark({
  name,
  keyword,
}: {
  name: string;
  keyword: string;
}) {
  if (!keyword) return <>{name}</>;
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((item, index) => (
        <span>
          {item}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
}
