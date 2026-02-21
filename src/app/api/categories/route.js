import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";

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
    const { categoryEnglishName, categoryArabicName, categoryImage } = body;

    const db = await getDB();
    const result = await db.collection("categories").insertOne({
      categoryEnglishName: categoryEnglishName.trim(),
      categoryArabicName: categoryArabicName.trim(),
      image: categoryImage,
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
