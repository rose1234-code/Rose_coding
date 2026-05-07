import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import connectDB from "@/db/ConnectDB";


export async function POST(request){
    try{
        const body = await request.json()
        const {firstName,lastName,email,password,role, cour, profession, bibliographie}= body
        console.log("Vérification champs :", {
            firstName: !!firstName,
            lastName: !!lastName,
            email: !!email,
            password: !!password,
            role: !!role,
        })
        await connectDB()
        
        if(!firstName || !lastName || !email || !password || !role){
            return NextResponse.json({error:"Please all the fields are required"},{status:400})
        }
        // check if user exist
        const existingUser= await User.findOne({email})
        if(existingUser){
           return NextResponse.json({error:"this email already exist"},{status:400})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        // create a new user
        const newUser=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role,
            cour,
            profession,
            bibliographie
        })
        return NextResponse.json(
      { message: "Compte créé avec succès", userId: newUser._id },
      { status: 201 }
    )
    }catch(error){
        console.error('Error to register user', error)
        return NextResponse.json({error:"Error to register the user"},{status:500})
    }
}