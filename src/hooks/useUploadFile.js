import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useUploadFile() {
  const { mutate: mutateUploadFile, isPending: isFileUploading } = useMutation({
    mutationFn: uploadFile,
    mutationKey: ["useUploadFile"],
  });

  return { isFileUploading, mutateUploadFile };
}

//=============================================================================

export async function uploadFile(FileData) {
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const base64Image = await toBase64(FileData);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/test-upload",
      { image: base64Image }
      // {
      //   headers: { "Content-Type": "application/json" },
      // }
    );

    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
}
