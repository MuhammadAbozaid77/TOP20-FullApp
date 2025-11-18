import { FoldHorizontal } from "lucide-react";

export default function CollapsedButton({ setcollapseState }) {
  const handelCollapase = () => {
    setcollapseState((prev) => !prev);
  };

  return (
    <div onClick={() => handelCollapase()}>
      <FoldHorizontal size={28} className="text-gray-500" />
    </div>
  );
}
