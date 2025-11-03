import { register } from "@/services/api-services/authAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRegister() {
  const { mutate: mutateRegister, isPending: isLoading } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success("✅ Register Successful!");
      console.log("Registered user:", data);
    },
    onError: (error) => {
      toast.error(error?.error || error?.message || "Registration failed!");
      console.error("Registration error:", error);
    },
  });

  return { mutateRegister, isLoading };
}
