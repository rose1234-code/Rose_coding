import connectDB from "@/db/ConnectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        await connectDB()
        const users= await User.find({},"-password")
        return NextResponse.json(users)
    }catch(error){
        console.error("Failed to fetch data", error)
        return NextResponse.json({error:"Error to fetch data"},{status:500})
    }
}