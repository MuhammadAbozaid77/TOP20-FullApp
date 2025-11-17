import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";
import { verifiyPassword } from "@/lib/hashedPassword";
import { createJWT } from "@/lib/jwt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const db = await getDB();
    const user = await db.collection("users").findOne({ email });

    if (!user)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const valid = await verifiyPassword(password, user.password);
    if (!valid)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const token = await createJWT(
      { userId: user._id.toString(), role: user.role },
      "1h"
    );

    const res = NextResponse.json(
      { message: "Logged in", role: user.role },
      { status: 200 }
    );

    res.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: false, // خليه true في الإنتاج
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
