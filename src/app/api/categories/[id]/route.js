import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongo";

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  if (!body.name || body.name.trim() === "") {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const db = await getDB();
  await db
    .collection("categories")
    .updateOne({ _id: new ObjectId(id) }, { $set: { name: body.name.trim() } });

  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  const db = await getDB();
  await db.collection("categories").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}
