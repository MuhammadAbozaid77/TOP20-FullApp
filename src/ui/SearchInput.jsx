export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by product name..."
      className="w-1/3 p-2 border rounded-md border-zinc-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
    />
  );
}
