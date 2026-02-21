"use client";
import PageHeader from "@/ui/PageHeader";
import AddCategoriesModal from "./_components/AddCategoriesModal";
import useGetCategories from "./_hooks/useGetCategories";
import WrapperCenter from "@/ui/WrapperCenter";
import SpinnerLoading from "@/ui/SpinnerLoading";
import CategoriesTable from "./_components/CategoriesTable";
import PageWrapper from "@/ui/PageWrapper";

export default function CategoriesPage() {
  // const handleDelete = async (id) => {
  //   if (!confirm("Are you sure?")) return;

  //   try {
  //     const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
  //     if (res.ok) await fetchCategories();
  //     else {
  //       const data = await res.json();
  //       alert(data.error || "Failed to delete");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  //=============================================================================
  const { data, isLoading, error } = useGetCategories();
  console.log("data", data);

  //=============================================================================
  if (isLoading)
    return (
      <WrapperCenter>
        <SpinnerLoading />
      </WrapperCenter>
    );
  //=============================================================================
  return (
    <PageWrapper>
      <PageHeader title={"Categories"}>
        <AddCategoriesModal />
      </PageHeader>
      <CategoriesTable categories={data} />
    </PageWrapper>
  );
}
