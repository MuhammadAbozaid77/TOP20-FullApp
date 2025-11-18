import { NextResponse } from "next/server";

export async function POST(req) {
  const res = NextResponse.json({ message: "Logged out" });

  // حذف الكوكي
  res.cookies.set({
    name: "session",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return res;
}
