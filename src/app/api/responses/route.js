import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not authenticated" });

    const donorId = session.user?.id;
    const { requestId, status } = await request.json(); // accepted or rejected
    const db = await getDB();

    // 1. Check if donor already responded
    const [existing] = await db.query(
      "SELECT * FROM donor_responses WHERE request_id = ? AND donor_id = ?",
      [requestId, donorId]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: "Already responded" }, { status: 400 });
    }

    // 2. Insert donor response
    await db.query(
      "INSERT INTO donor_responses (request_id, donor_id, status) VALUES (?, ?, ?)",
      [requestId, donorId, status]
    );

    return NextResponse.json({ success: true, message: "Response recorded" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
    try {
       const db = await getDB();
       const [rows] = await db.query("SELECT * FROM donor_responses");
       return NextResponse.json(rows)
    }
    catch(error) {
       return NextResponse.json({error:"something went wrong"},{status:500})
    }
}
