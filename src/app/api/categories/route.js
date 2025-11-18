import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const db = await getDB();
    const categories = await db.collection("categories").find().toArray();
    return NextResponse.json(categories);
  } catch (err) {
    console.error("GET categories error:", err);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, imageBase64 } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    // Upload image to Cloudinary إذا فيه imageBase64
    if (imageBase64) {
      const uploaded = await cloudinary.uploader.upload(imageBase64, {
        folder: "categories",
      });
      imageUrl = uploaded.secure_url;
    }

    const db = await getDB();
    const result = await db.collection("categories").insertOne({
      name: name.trim(),
      image: imageUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ insertedId: result.insertedId });
  } catch (err) {
    console.error("POST category error:", err);
    return NextResponse.json(
      { error: "Failed to add category" },
      { status: 500 }
    );
  }
}
