"use client";

import { MultiSelect } from "react-multi-select-component";
import type { SelectOption } from "@/types";

type CustomMultiSelectProps = {
  disabled?: boolean;
  labelledBy: string;
  onChange: (selected: SelectOption[]) => void;
  options: SelectOption[];
  value: SelectOption[];
};

export default function CustomMultiSelect({
  options,
  value,
  onChange,
  labelledBy,
  disabled = false,
}: CustomMultiSelectProps) {
  return (
    <MultiSelect
      className="w-full rounded-md border border-input text-sm"
      disabled={disabled}
      labelledBy={labelledBy}
      onChange={onChange}
      options={options}
      overrideStrings={{
        allItemsAreSelected: "Đã chọn tất cả",
        clearSearch: "Xóa tìm kiếm",
        noOptions: "Không có tùy chọn",
        search: "Tìm kiếm...",
        selectAll: "Chọn tất cả",
        selectAllFiltered: "Chọn tất cả (đã lọc)",
        selectedItems: "mục đã chọn",
        selectItems: "Chọn mục",
      }}
      value={value}
    />
  );
}
