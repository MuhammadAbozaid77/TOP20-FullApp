import { getDB } from "@/lib/mongo";

export async function GET() {
  const db = await getDB();
  const collections = await db.listCollections().toArray();
  return Response.json({ message: "Connected to MongoDB", collections });
}
