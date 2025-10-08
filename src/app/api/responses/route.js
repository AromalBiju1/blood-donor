import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

{/*export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not authenticated" });

    const donorId = session.user?.id;
    const requesterId = selectRequest.requester_id;
    const { requestId, status } = await request.json(); // accepted or rejected
    const db = await getDB();

    // 1. Check if donor already responded
    const [existing] = await db.query(
      "SELECT * FROM donor_responses WHERE requester_id = ? AND donor_id = ?",
      [requesterId, donorId]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: "Already responded" }, { status: 400 });
    }

    // 2. Insert donor response
    await db.query(
      "INSERT INTO donor_responses (requester_id, donor_id, status) VALUES (?, ?, ?)",
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
*/}


export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const donorId = session.user?.id;
    const { requestId, status } = await request.json(); // accepted or rejected
    const db = await getDB();

    // Fetch requester_id from the request
    const [rows] = await db.query("SELECT requester_id FROM requests WHERE id = ?", [requestId]);
    if (rows.length === 0) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    const requesterId = rows[0].requester_id;

    // Check if donor already responded
    const [existing] = await db.query(
      "SELECT * FROM donor_responses WHERE requester_id = ? AND donor_id = ?",
      [requesterId, donorId]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: "Already responded" }, { status: 400 });
    }

    // Insert donor response
    await db.query(
      "INSERT INTO donor_responses (requester_id, donor_id, status) VALUES (?, ?, ?)",
      [requesterId, donorId, status]
    );

    return NextResponse.json({ success: true, message: "Response recorded" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
