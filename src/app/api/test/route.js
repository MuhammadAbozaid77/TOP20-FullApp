// app/api/test/route.js
import { getDB } from "@/lib/mongo";

export async function GET() {
  const db = await getDB();
  const users = await db.collection("users").find().toArray();

  return Response.json({ success: true, count: users.length });
}
