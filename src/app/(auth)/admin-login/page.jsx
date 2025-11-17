"use client";
import LoginImage from "/public/login.gif";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch("/api/auth/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        // Redirect حسب role
        if (data.role === "GeneralAdmin") router.push("/admin/dashboard");
        else if (data.role === "StoreAdmin") router.push("/store/dashboard");
        else router.push("/user/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-mainBackground flex justify-center items-center">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
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
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          required
          className="w-full border rounded-lg p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          required
          className="w-full border rounded-lg p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white w-full rounded-lg py-2"
          // disabled={disabled}
        >
          {/* {isLoading ? "Signing in..." : "Login"} */}
          Login
        </button>
      </form>
    </div>
  );
}
