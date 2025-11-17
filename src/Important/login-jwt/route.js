import { NextResponse } from "next/server";
import { getDB } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await getDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });
  if (!user)
    return NextResponse.json({ message: "Invalid email" }, { status: 401 });

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect)
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });

  // إنشاء JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    "supersecretkey",
    { expiresIn: "1h" }
  );

  const res = NextResponse.json({ message: "Logged in with JWT!" });
  res.headers.set(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    })
  );

  return res;
}
