import { getDB } from "@/lib/mongo";
import { getHashedPassword } from "@/lib/hashedPassword";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const body = await req.formData();
    const name = body.get("name");
    const email = body.get("email");
    const password = body.get("password");
    const role = body.get("role");
    const image = body.get("image");

    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
      });
    }

    const db = await getDB();
    const users = db.collection("users");

    const exist = await users.findOne({ email });
    if (exist) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await getHashedPassword(password);

    let imageUrl = "";
    if (image && image.name) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64 = `data:${image.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: "users_profile",
      });
      imageUrl = uploadRes.secure_url;
    }

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
      image: imageUrl,
      approved: role === "StoreAdmin" ? false : true,
      createdAt: new Date(),
    };

    await users.insertOne(newUser);

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
