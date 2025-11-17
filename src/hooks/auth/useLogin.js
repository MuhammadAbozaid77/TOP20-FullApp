"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export function useLogin() {
  const { mutate: mutateLogin, isPending: isLoading } = useMutation({
    // ✳️ دالة تسجيل الدخول الأساسية
    mutationFn: async (formData) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });

      if (!res || res.error) {
        throw new Error(res?.error || "Invalid credentials");
      }

      return res;
    },

    // ✅ عند النجاح
    onSuccess: () => {
      toast.success("✅ Login Successful!");
      // ممكن بعد كده تعمل redirect حسب الدور أو الصفحة
      window.location.href = "/";
    },

    // ❌ عند الخطأ
    onError: (error) => {
      toast.error(error?.message || "❌ Login failed!");
    },
  });

  return { mutateLogin, isLoading };
}
