import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { requestId, donorId, confirmed } = body;
  console.log(requestId)
  console.log(donorId)
    const db = await getDB();

    // Check current status to prevent duplicate confirmations
    const [existingRequest] = await db.query(
      "SELECT status FROM requests WHERE id = ?",
      [requestId]
    );

   console.log(existingRequest);
   

    // Prevent confirming if already fulfilled
    // if (existingRequest[0].status === "fulfilled" || existingRequest[0].status === "donated") {
    //   return NextResponse.json(
    //     { error: "This donation has already been confirmed" },
    //     { status: 400 }
    //   );
    // }

    if (confirmed) {
      // Donor accepted → mark response as donated
      await db.query(
        "UPDATE donor_responses SET status='donated' WHERE requester_id=? AND donor_id=?",
        [requestId, donorId]
      );

      // Mark the original request as fulfilled
      await db.query("UPDATE requests SET status='fulfilled' WHERE requester_id=?", [
        requestId,
      ]);

      // Reward donor with points
      await db.query(
        "INSERT INTO donor_points (user_id, points) VALUES (?, 10) ON DUPLICATE KEY UPDATE points = points + 10",
        [donorId]
      );
    } else {
      // Donor rejected
      await db.query(
        "UPDATE donor_responses SET status='rejected' WHERE requester_id=? AND donor_id=?",
        [requestId, donorId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Donation confirm error:", error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}