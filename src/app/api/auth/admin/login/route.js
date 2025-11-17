import { getDB } from "@/lib/mongo";
import jwt from "jsonwebtoken";
import { verifiyPassword } from "@/lib/hashedPassword";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await getDB();
    const admin = await db
      .collection("users")
      .findOne({ email, role: "GeneralAdmin" });

    if (!admin) {
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    const isValid = await verifiyPassword(password, admin.password);
    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ إنشاء Token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // ✅ إرسال Token للمتصفح (اختياري: Cookie)
    return Response.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (err) {
    console.error("Admin login error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
