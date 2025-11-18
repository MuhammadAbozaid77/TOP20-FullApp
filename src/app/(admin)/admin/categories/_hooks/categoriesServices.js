import axios from "axios";

export async function addNewCategory(data) {
  try {
    const response = await axios.post(
      "http://localhost:3000/categories",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
}
