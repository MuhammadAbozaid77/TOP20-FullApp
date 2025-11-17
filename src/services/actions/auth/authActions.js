"use server";
import { getDB } from "@/lib/mongo";
import { hashPassword } from "@/lib/hashedPassword";

//========================================================================
export async function registerUser(formData) {
  //===========================
  // const body_Req = Object.fromEntries(formData);
  const { name, email, password, role } = formData;
  //===========================
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }
  //===========================
  const db = await getDB();
  const users = db.collection("users");
  const exist = await users.findOne({ email });
  if (exist) {
    throw new Error("User already exists");
  }
  //===========================
  const hashedPassword = await hashPassword(password);
  //===========================
  const newUser = {
    name,
    email,
    password: hashedPassword,
    role, // Store | User
    approved: role === "StoreAdmin" ? false : true,
    image: "",
    createdAt: new Date(),
  };

  await users.insertOne(newUser);
  //===========================
  return { message: "User registered successfully" };
}
