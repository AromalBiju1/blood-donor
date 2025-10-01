import { NextResponse } from 'next/server';
import { getDB } from "@/lib/db";

export async function POST(request) {
  try {
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

    const conn = await getDB();

    const sql = `INSERT INTO requests 
      (patientName, bloodGroup, age, unitsRequired, gender, hospitalName, hospitalAddress) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await conn.execute(sql, [
      patientName,
      bloodGroup,
      age,
      unitsRequired,
      gender,
      hospitalName,
      hospitalAddress,
    ]);

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('MySQL insert error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
