import { forwardRef } from "react";

const FileInput = forwardRef(function FileInput(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <div className="mb-2">
      {label && (
        <label className="text-[12px] text-gray-500 font-semibold mb-1 block">
          {label}
        </label>
      )}

      <input
        ref={ref}
        type="file"
        className={`w-full p-2 rounded-md border bg-white cursor-pointer 
        focus:outline-[1px] focus:outline-teal-300 
        ${className} ${error ? "outline-red-500" : ""}`}
        {...props} // accept - onChange - etc
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default FileInput;
