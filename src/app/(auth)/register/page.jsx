"use client";
import { useRegister } from "@/hooks/auth/useRegister";
import CustomSelect from "@/ui/CustomSelect";
import Input from "@/ui/Input";
import { options } from "@/utils/constantData";
import Image from "next/image";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AddImage from "/public/add.gif";

export default function RegisterPage() {
  //=====================================================================================
  const [preview, setPreview] = useState(null);
  //=====================================================================================
  const { mutateRegister, isLoading } = useRegister();
  //=====================================================================================
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    data.role = data.role.value;
    mutateRegister(data, {
      onSuccess: () => {
        reset();
        setPreview(null);
      },
    });
  };
  //=====================================================================================
  const disabled = isLoading || !isValid;
  //=====================================================================================
  return (
    <div className="flex justify-center items-center min-h-screen bg-mainBackground ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <div></div>

        <div className="flex justify-center items-center flex-col">
          <h1 className="text-[30px] font-bold text-center mb-4 text-teal-600">
            Register
          </h1>
          <Image alt="" src={AddImage} height={200} />
        </div>

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
          disabled={disabled}
          className={`w-full rounded-lg py-2 text-white transition-all ${
            disabled
              ? "bg-teal-500 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
