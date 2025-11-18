import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { type = "text", defaultValue = "", label, error, className = "", ...props },
  ref
) {
  return (
    <div className="">
      <label className="text-[12px] text-gray-500 font-semibold">{label}</label>
      <input
        ref={ref}
        type={type}
        defaultValue={defaultValue}
        className={`w-full p-2 rounded-md border   focus:outline-[1px] focus:outline-teal-300 ${className} ${
          error ? "outline-red-500" : ""
        }   `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;

{
  /* <Input
  {...register("email", {
    required: "Email is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters",
    },
    pattern: {
      value: /^[\w.+-]+@gmail\.com$/,
      message: "Only Gmail accounts allowed",
    },
    validate: {
      isGmail: (value) =>
        value.endsWith("@gmail.com") || "Only Gmail accounts allowed",
      noSpaces: (value) => !/\s/.test(value) || "Email must not contain spaces",
    },
  })}
  type="email"
  placeholder="Enter email"
/>;

{
  errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
  );
} */
}
