import Select from "react-select";

export default function CustomSelect({ error, ...props }) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "0.375rem",
      borderColor: error ? "red" : state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px #93c5fd" : "none",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#e0f2fe"
        : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  return (
    <div>
      <Select styles={customStyles} {...props} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
