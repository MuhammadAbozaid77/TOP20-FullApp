import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";
import { getHashedPassword } from "@/lib/hashedPassword";

export async function POST(req) {
  try {
    const body = await req.formData();
    const name = body.get("name");
    const email = body.get("email");
    const password = body.get("password");
    const role = body.get("role");

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await getDB();
    const users = db.collection("users");

    const exist = await users.findOne({ email });
    if (exist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await getHashedPassword(password);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role, // Store | User
      approved: role === "StoreAdmin" ? false : true,
      createdAt: new Date(),
    };

    await users.insertOne(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
