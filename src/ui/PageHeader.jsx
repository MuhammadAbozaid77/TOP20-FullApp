export default function PageHeader({ title, children }) {
  return (
    <div className="py-2 flex justify-between items-center">
      <h1 className="text-[25px] text-teal-800 font-semibold ">{title}</h1>
      {children}
    </div>
  );
}
