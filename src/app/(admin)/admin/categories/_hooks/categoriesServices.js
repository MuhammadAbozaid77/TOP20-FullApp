import axios from "axios";

//================================================================================
export async function addNewCategory(data) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/categories",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
}
//================================================================================
export async function getCategories() {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");

    return response.data;
  } catch (error) {
    console.error("Get Error:", error);
    throw error;
  }
}
