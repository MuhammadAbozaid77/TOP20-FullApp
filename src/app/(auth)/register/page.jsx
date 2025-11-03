"use client";

import { useRegister } from "@/hooks/auth/useRegister";
import CustomSelect from "@/ui/CustomSelect";
import Input from "@/ui/Input";
import { options } from "@/utils/constantData";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [preview, setPreview] = useState(null);

  // 🧠 من hook useRegister
  const { mutateRegister, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role?.value || data.role);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    mutateRegister(formData, {
      onSuccess: () => {
        reset();
        setPreview(null);
        redirect("/login");
      },
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>

        {/* 🧍‍♂️ Name */}
        <Input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "At least 3 characters" },
          })}
          type="text"
          placeholder="Enter your name"
          error={errors.name?.message}
        />

        {/* 📧 Email */}
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          type="email"
          placeholder="Enter email"
          error={errors.email?.message}
        />

        {/* 🔑 Password */}
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
          })}
          type="password"
          placeholder="Enter password"
          error={errors.password?.message}
        />

        {/* 🧩 Role */}
        <Controller
          name="role"
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <CustomSelect
              {...field}
              options={options}
              placeholder="Select Role"
              error={errors.role?.message}
            />
          )}
        />

        {/* 🖼️ Image */}
        <div>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="preview"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </div>
          )}
        </div>

        {/* 🔘 Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-lg py-2 text-white ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
