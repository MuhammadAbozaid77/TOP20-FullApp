"use client";
import { registerUser } from "@/services/actions/auth/authActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAdminRegister() {
  const router = useRouter();
  const { mutate: mutateRegister, isPending: isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("✅ Register Successful!");
      router.push("/admin-login");
    },
    onError: (error) => {
      toast.error(error?.error || error?.message || "Registration failed!");
      console.error("Registration error:", error);
    },
  });

  return { mutateRegister, isLoading };
}
