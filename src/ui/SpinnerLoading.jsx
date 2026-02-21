export default function SpinnerLoading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span class="loader"></span>
      <span className="text-gray-500 text-[20px]">Loading</span>
    </div>
  );
}
