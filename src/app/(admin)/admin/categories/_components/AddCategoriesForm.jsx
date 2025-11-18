import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Input from "@/ui/Input";
import { useForm } from "react-hook-form";
import useAddNewCategory from "../_hooks/useAddNewCategory";

export default function AddCategoriesForm({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  //===============================================================================
  const { isLoading, mutateAddCategory } = useAddNewCategory();
  const onSubmit = (data) => {
    console.log(data);
    mutateAddCategory(data);
    // closeModal(); // لو عايز تقفل بعد الإضافة
  };
  //===============================================================================

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 ">
        <Input
          {...register("categoryName", {
            required: "Category Name is required",
            minLength: {
              value: 3,
              message: "Category Name must be at least 3 characters",
            },
          })}
          label={"Category Name"}
          type="text"
          placeholder="Enter Category Name"
          error={errors?.categoryName?.message}
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
