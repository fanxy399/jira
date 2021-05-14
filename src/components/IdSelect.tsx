import { Select } from "antd";
import React from "react";
import { Row } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | "defaultOptionName" | "options"
  > {
  value?: Row | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export default function IdSelect(props: IdSelectProps) {
  const { value, onChange, defaultOptionName, options } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName && (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      )}
      {options?.map((option) => (
        <Select.Option value={option.id}>{option.name}</Select.Option>
      ))}
    </Select>
  );
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
