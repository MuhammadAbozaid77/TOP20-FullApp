"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/users/logout", {
        method: "POST",
      });
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div onClick={() => handleLogout()}>
      <LogOut
        size={28}
        strokeWidth={1}
        className="text-teal600 cursor-pointer hover:bg-red-600 hover:text-white rounded-md p-1 transition-all duration-200"
      />
    </div>
  );
}
