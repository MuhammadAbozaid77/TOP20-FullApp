import { NextResponse } from "next/server";
import { getDB } from "../../../lib/mongodb";
import cookie from "cookie";

export async function GET(req) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const sessionId = cookies.sessionId;
  if (!sessionId)
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });

  const db = await getDB();
  const sessionsCollection = db.collection("sessions");
  const usersCollection = db.collection("users");

  const session = await sessionsCollection.findOne({ sessionId });
  if (!session || session.expiresAt < new Date())
    return NextResponse.json({ message: "Session expired" }, { status: 401 });

  const user = await usersCollection.findOne(
    { _id: session.userId },
    { projection: { password: 0 } }
  );
  return NextResponse.json({ message: "User is logged in", user });
}
