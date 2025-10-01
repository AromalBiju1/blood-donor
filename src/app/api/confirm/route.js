import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
     const body = await req.json();
     const {requestId,donorId,confirmed} = body;

     const db = await getDB();

     if(confirmed) {
        await db.query("UPDATE donor_responses SET status='donated' WHERE request_id=? AND donor_id=?", [requestId, donorId]);
      await db.query("UPDATE requests SET status='fulfilled' WHERE id=?", [requestId]);

      await db.query("INSERT INTO donor_points (user_id, points) VALUES (?, 10) ON DUPLICATE KEY UPDATE points = points + 10",[donorId])
     }
     else {
         await db.query("UPDATE donor_responses SET status='rejected' WHERE request_id=? AND donor_id=?", [requestId, donorId]);
     }
     return NextResponse.json({success : true});
    }
    catch(error) {
        return NextResponse.json({error : "something went wrong"},{status:500})
    }
}