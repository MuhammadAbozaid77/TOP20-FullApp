"use client";
import { useLogin } from "@/hooks/auth/useLogin";
import LoginImage from "/public/login.gif";
import Image from "next/image";

export default function AdminLogin() {
  const { mutateLogin, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    mutateLogin(formData);
  };

  //==================================================================================
  const disabled = isLoading;
  //==================================================================================
  return (
    <div className="min-h-screen bg-mainBackground flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white border p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-[30px] font-bold text-center mb-4 text-teal-600">
            Admin Login
          </h1>
          <Image alt="" src={LoginImage} height={200} />
        </div>

        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          className="w-full border rounded-lg p-2"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          className="w-full border rounded-lg p-2"
        />

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white w-full rounded-lg py-2"
          disabled={disabled}
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
