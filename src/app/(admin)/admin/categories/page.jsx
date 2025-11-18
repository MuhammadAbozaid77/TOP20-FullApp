"use client";

import PageHeader from "@/ui/PageHeader";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddCategoriesModal from "./_components/AddCategoriesModal";
import { useForm } from "react-hook-form";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // file object
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // const fetchCategories = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch("/api/categories");
  //     const data = await res.json();
  //     setCategories(data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // تحويل صورة إلى Base64
  // const getBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  // const handleSubmit = async (e) => {

  //   let imageBase64 = null;
  //   if (imageFile) imageBase64 = await getBase64(imageFile);

  //   const url = editMode ? `/api/categories/${editId}` : "/api/categories";
  //   const method = editMode ? "PUT" : "POST";

  //   try {
  //     const res = await fetch(url, {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, imageBase64 }),
  //     });

  //     if (res.ok) {
  //       setName("");
  //       setImageFile(null);
  //       setEditMode(false);
  //       setEditId(null);
  //       await fetchCategories();
  //     } else {
  //       const data = await res.json();
  //       alert(data.error || "Failed");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title={"Categories"} />
      <AddCategoriesModal />
      {/* <div className="flex items-center justify-between"> */}
      {/* </div> */}

      {/* {loading ? (
        <p>Loading categories...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">Image</th>
              <th className="border p-3">Name</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="border p-3">
                  {cat?.image && (
                    <Image
                      src={cat.image}
                      alt={cat.image}
                      width={64} // أو أي قيمة تناسبك
                      height={64} // نفس الشيء
                      className="object-cover rounded"
                    />
                  )}
                </td>
                <td className="border p-3">{cat.name}</td>
                <td className="border p-3 text-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => {
                      setEditMode(true);
                      setEditId(cat._id);
                      setName(cat.name);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(cat._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
}
