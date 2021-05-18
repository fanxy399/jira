import { Rate } from "antd";
import { ComponentProps } from "react";

interface CustomRateProps extends ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function CustomRate({
  checked,
  onCheckedChange,
  ...restProps
}: CustomRateProps) {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(number) => onCheckedChange?.(!!number)}
    />
  );
}
