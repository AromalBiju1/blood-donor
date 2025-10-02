import { NextResponse } from 'next/server';
import { getDB } from "@/lib/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if(!session) {
      return NextResponse.json({error : "Not authenticated"});
    }

    const requesterId = session.user?.id
    const body = await request.json();
    const {
      patientName,
      bloodGroup,
      age,
      unitsRequired,
      gender,
      hospitalName,
      hospitalAddress,
    } = body;

    const db = await getDB();

    const [result] = await db.query("INSERT INTO requests (patientName, bloodGroup, age, unitsRequired, gender, hospitalName, hospitalAddress,requester_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
      patientName,
      bloodGroup,
      age,
      unitsRequired,
      gender,
      hospitalName,
      hospitalAddress,
      requesterId
    ]);

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('MySQL insert error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
   try {
    const db = await getDB();
    const [rows] = await db.query("SELECT r.id,r.patientName,r.bloodGroup,r.age,r.unitsRequired,r.gender,r.hospitalName,r.hospitalAddress,r.status,r.requester_id FROM requests r JOIN users u ON r.requester_id  = u.id WHERE r.status = 'pending'");
    return NextResponse.json(rows);
   }
   catch(error) {
    return NextResponse.json({error :"Error Fetching Requests"},{status:500});
   }
}
