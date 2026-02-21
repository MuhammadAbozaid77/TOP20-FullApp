export default function WrapperCenter({ children }) {
  return (
    <div className="flex justify-center items-center min-h-[700px]">
      {children}
    </div>
  );
}
