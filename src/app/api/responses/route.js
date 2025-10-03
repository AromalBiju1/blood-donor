import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const donorId = session.user?.id;
    const { requestId, status } = await request.json();

    if (!donorId || !requestId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const validStatuses = ["pending", "accepted", "rejected", "donated"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const db = await getDB();

    const [rows] = await db.query(
      "SELECT * FROM donor_responses WHERE request_id = ? AND donor_id = ?",
      [requestId, donorId]
    );

    if (rows.length > 0) {
      return NextResponse.json({ error: "Already responded" }, { status: 400 });
    }

    await db.query(
      "INSERT INTO donor_responses (request_id, donor_id, status) VALUES (?, ?, ?)",
      [requestId, donorId, status]
    );



    if (status === "accepted") {
      const [updateResult] = await db.query(
        "UPDATE requests SET status = ? WHERE id = ?",
        ["fulfilled", requestId]
      );

    }

    return NextResponse.json({ success: true, message: "Response recorded" });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
