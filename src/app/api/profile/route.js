import { getDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { headers, cookies } from "next/headers";

export async function POST(req) {
    try {
        const session = await getServerSession({
        ...authOptions,
        req: { headers: headers() },
        res: { cookies: cookies() },
        })
        console.log(session);
        
        if(!session) {
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }
        const userId = session.user?.id;
        const body = await req.json();
        console.log(body)
        const db = await getDB();
     const {phone,year,blood_group,semester,gender,division,allergies,address} = body;
     const [existing] = await db.query("SELECT id FROM user_profiles WHERE user_id = ?",[userId]);
     if(existing.length > 0) {
        return NextResponse.json({
            error:"profile already exists"
        },{status:400});
     };
     await db.query("INSERT INTO user_profiles(user_id,phone, year, blood_group, semester, gender, division, allergies, address) VALUES (?,?,?,?,?,?,?,?,?)",[userId,phone,year,blood_group,semester,gender,division,allergies,address]);

     return NextResponse.json({message:"Profile created successfully"},{status:201});
    }
    catch(error) {
      return NextResponse.json({error:"something went wrong"},{status:500})
    }
}