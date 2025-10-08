import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { getDB } from "@/lib/db";

export async function POST(req) {
    try {
   const body = await req.json();
   const {name,email,password} = body;

   if(!name || !email || ! password) {
    return NextResponse.json({
        error:"All fields are required"
    },{status:400});
   }
   const db = getDB();

   const [existingUser] = await db.query(
    "SELECT * FROM users WHERE email=?",[email]
   );

   if (existingUser.length > 0) {
    return NextResponse(
        {error:"User already exists"},
        {status:400}
    );
   }

   const hashedPassword = await bcrypt.hash(password,10);

   await db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",[name,email,hashedPassword]
   );
   return NextResponse.json(
    {message:"User registered successfully"},
    {status:201}
   );
    }
    catch(error) {
      return NextResponse.json(
        {error:error.message}
      )
    }
}
