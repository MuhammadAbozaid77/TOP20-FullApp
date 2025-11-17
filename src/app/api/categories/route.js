import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";

export async function GET() {
  const db = await getDB();
  const categories = await db.collection("categories").find().toArray();
  return NextResponse.json(categories);
}

export async function POST(req) {
  const body = await req.json();

  if (!body.name || body.name.trim() === "") {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const db = await getDB();
  const result = await db.collection("categories").insertOne({
    name: body.name.trim(),
    createdAt: new Date(),
  });

  return NextResponse.json({ insertedId: result.insertedId });
}
