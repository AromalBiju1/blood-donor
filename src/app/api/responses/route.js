import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        const body = await req.json();

        const {requestId,donorId,status} = body;

        const db = await getDB();
        await db.query("INSERT INTO donor_responses (request_id, donor_id, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status=?",[requestId,donorId,status,status]);

        return NextResponse.json({success:true});
    }
    catch(error) {
        return NextResponse.json({error:"Error in updating response"},{status:500});
    }
}