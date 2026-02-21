import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./categoriesServices";

export default function useGetCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["useGetCategories"],
    queryFn: getCategories,
  });
  return { data, isLoading, error };
}
