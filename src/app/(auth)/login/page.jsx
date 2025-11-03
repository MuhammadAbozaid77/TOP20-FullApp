"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    setLoading(false);
    if (res.error) alert(res.error);
    else window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

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
          className="bg-green-500 hover:bg-green-600 text-white w-full rounded-lg py-2"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
