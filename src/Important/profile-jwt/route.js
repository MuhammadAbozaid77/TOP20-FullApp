import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export async function GET(req) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  if (!token)
    return NextResponse.json({ message: "No token found" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, "supersecretkey");
    return NextResponse.json({ message: "User is logged in", user: decoded });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
