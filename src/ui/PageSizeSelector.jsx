import React from "react";
import Select from "react-select";

export default function PageSizeSelector({
  pageSize,
  onChange,
  options = [5, 10, 15, 20],
  label = "",
  className = "",
}) {
  // تحويل الخيارات لشكل react-select
  const selectOptions = options.map((size) => ({ value: size, label: size }));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-700">{label}</span>
      <div className="w-[80px]">
        <Select
          options={selectOptions}
          value={{ value: pageSize, label: pageSize }}
          onChange={(option) => onChange(option.value)}
          isSearchable={false} // ممكن تحط true لو تحب البحث
          className="basic-single"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}
