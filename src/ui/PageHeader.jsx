export default function PageHeader({ title, children }) {
  return (
    <div className="text-[25px] text-teal-800 font-semibold py-2  rounded-md">
      {title}
    </div>
  );
}
