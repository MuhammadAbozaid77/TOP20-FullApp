import React from "react";

// ================For================
//  add
//  edit
//  delete
//  submit
//  normal
export default function Button({
  type = "normal",
  onClick,
  For = "normal",
  classes,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` p-[8px] rounded-md min-w-[100px]  text-white  ${
        For === "normal"
          ? "bg-teal-700"
          : For === "submit"
          ? "bg-[#FF6C2F]"
          : For === "edit"
          ? "bg-blue-700"
          : For === "delete"
          ? "bg-red-700"
          : For === "add"
          ? "bg-teal-700"
          : For === "close"
          ? "bg-red-700"
          : "bg-teal-700"
      }  ${classes} `}
    >
      {children}
    </button>
  );
}
