import axiosWithConfig from "@/lib/axios";

// ✅ خلي register تستقبل formData من الـ mutation
export async function register(formData) {
  const { data } = await axiosWithConfig.post("/api/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
