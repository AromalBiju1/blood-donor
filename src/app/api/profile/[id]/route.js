import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req,{params}) {
    try {
       const {id} = params;
       const db = getDB()
       const [rows] = await db.query("SELECT u.id,u.name,up.phone, up.year, up.blood_group, up.semester, up.gender, up.division, up.allergies, up.address FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = ?",[id]);

       if(rows.length === 0) {
        return NextResponse.json({error:"profile not found"},{status:404});
       }
       return NextResponse.json(rows[0],{status:200});
    }
    catch(error) {
     return NextResponse.json({error:"something went wrong"},{status:500});
    }
}