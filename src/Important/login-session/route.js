import { NextResponse } from "next/server";
import { getDB } from "../../../lib/mongodb"; // حسب مكان ملفك
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import cookie from "cookie";

// بيانات مستخدم وهمية في MongoDB ممكن تكون موجودة مسبقًا
// collection: users
// fields: { _id, email, password }

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await getDB();
  const usersCollection = db.collection("users");
  const sessionsCollection = db.collection("sessions");

  const user = await usersCollection.findOne({ email });
  if (!user)
    return NextResponse.json({ message: "Invalid email" }, { status: 401 });

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect)
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });

  // إنشاء sessionId عشوائي
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // ساعة

  // حفظ الجلسة في MongoDB
  await sessionsCollection.insertOne({
    sessionId,
    userId: user._id,
    createdAt: new Date(),
    expiresAt,
  });

  const res = NextResponse.json({ message: "Logged in with session!" });
  res.headers.set(
    "Set-Cookie",
    cookie.serialize("sessionId", sessionId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    })
  );

  return res;
}
