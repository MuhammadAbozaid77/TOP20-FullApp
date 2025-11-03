// import { NextResponse } from "next/server";
// import { getDB } from "@/lib/mongodb";
// import { getHashedPassword } from "@/lib/auth";

// export async function POST(req) {
//   try {
//     const { name, email, password, role } = await req.json();

//     if (!email || !password || !name)
//       return NextResponse.json({ message: "Missing fields" }, { status: 400 });

//     const db = await getDB();
//     const existingUser = await db.collection("users").findOne({ email });

//     if (existingUser)
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 400 }
//       );

//     const hashedPassword = await getHashedPassword(password);

//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "user",
//       approved: role === "store-admin" ? false : true,
//       createdAt: new Date(),
//     };

//     await db.collection("users").insertOne(newUser);

//     return NextResponse.json(
//       { message: "User registered successfully" },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("Register Error:", err);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { getDB } from "@/lib/mongo";
import cloudinary from "@/lib/cloudinary";
import { getHashedPassword } from "@/lib/hashedPassword";

export async function POST(req) {
  try {
    // 🧾 استلام البيانات من الـ form
    const body = await req.formData();
    const name = body.get("name");
    const email = body.get("email");
    const password = body.get("password");
    const role = body.get("role");
    const image = body.get("image"); // File object

    // ✅ التحقق من المدخلات
    if (!name || !email || !password || !role) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 🧠 الاتصال بقاعدة البيانات
    const db = await getDB();
    const users = db.collection("users");

    // 🔍 التحقق إذا كان المستخدم موجود بالفعل
    const exist = await users.findOne({ email });
    if (exist) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // 🔐 تشفير كلمة المرور
    const hashedPassword = await getHashedPassword(password);

    // ☁️ رفع الصورة على Cloudinary إن وُجدت
    let imageUrl = "";
    if (image && image.name) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64 = `data:${image.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: "users_profile",
      });
      imageUrl = uploadRes.secure_url;
    }

    // 🧾 إنشاء مستخدم جديد
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role, // "GeneralAdmin" | "StoreAdmin" | "User"
      image: imageUrl,
      approved: role === "StoreAdmin" ? false : true, // ✅ يحتاج موافقة إذا كان Store Admin
      createdAt: new Date(),
    };

    // 💾 حفظ المستخدم
    await users.insertOne(newUser);

    return Response.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
