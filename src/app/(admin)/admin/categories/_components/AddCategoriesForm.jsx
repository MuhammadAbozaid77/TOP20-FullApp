"use client";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Input from "@/ui/Input";
import { useForm } from "react-hook-form";
import useAddNewCategory from "../_hooks/useAddNewCategory";
import useUploadFile from "@/hooks/useUploadFile";

export default function AddCategoriesForm({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  //===============================================================================
  const { isLoading, mutateAddCategory } = useAddNewCategory();
  const { isFileUploading, mutateUploadFile } = useUploadFile();
  //===============================================================================
  const onSubmit = (data) => {
    mutateUploadFile(data?.categoryImage?.[0], {
      onSuccess: (res) => {
        data.categoryImage = res;
        mutateAddCategory(data, {
          onSuccess: () => {
            closeModal();
          },
        });
      },
    });
  };
  //===============================================================================
  const isWorking = isLoading || isFileUploading;
  //===============================================================================

  return (
    <form
      className="flex flex-col gap-3 relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isWorking && (
        <div className="absolute inset-0 w-full bg-gray-500/50 flex justify-center items-center p-5 rounded-md">
          <span className="loader"></span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <Input
          {...register("categoryEnglishName", {
            required: "Category Name is required",
            minLength: {
              value: 3,
              message: "Category Name must be at least 3 characters",
            },
          })}
          label={"Category Name"}
          type="text"
          placeholder="Enter Category Name"
          error={errors?.categoryEnglishName?.message}
        />
        <Input
          {...register("categoryArabicName", {
            required: "Category Name is required",
            minLength: {
              value: 3,
              message: "Category Name must be at least 3 characters",
            },
          })}
          label={"Category Name"}
          type="text"
          placeholder="Enter Category Name"
          error={errors?.categoryArabicName?.message}
        />
      </div>

      <FileInput
        label="Upload Image"
        accept="image/*"
        {...register("categoryImage")}
        error={errors?.categoryImage?.message}
      />

      <div className="flex justify-between items-center gap-2">
        <Button For="normal" classes={"w-full"}>
          Add Category
        </Button>
        <Button For="close" classes={"w-full"} onClick={closeModal}>
          Close
        </Button>
      </div>
    </form>
  );
}
