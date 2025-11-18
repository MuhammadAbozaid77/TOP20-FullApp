import { useMutation } from "@tanstack/react-query";
import { addNewCategory } from "./categoriesServices";

export default function useAddNewCategory() {
  const { mutate: mutateAddCategory, isPending: isLoading } = useMutation({
    mutationFn: addNewCategory,
    mutationKey: "addNewCategory",
  });

  return { isLoading, mutateAddCategory };
}
