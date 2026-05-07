import { NextResponse } from "next/server";
import connectDB from "@/db/ConnectDB";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find();

    return NextResponse.json(courses);

  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}