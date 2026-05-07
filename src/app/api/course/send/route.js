import { NextResponse } from "next/server";
import Course from "@/models/Course";
import connectDB from "@/db/ConnectDB";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { title, subtitle, description, instructor, categories, level, language, estimatedDuration, coverImage, whatYouWillLearn} = body;

    // validation simple
    if (!title || !description ) {
      return NextResponse.json({ error: "Champs obligatoires manquants" },{ status: 400 });
    }

    const newCourse = await Course.create({
      title,
      subtitle,
      description,
      instructor,
      categories,
      level,
      language,
      estimatedDuration,
      coverImage,
      whatYouWillLearn
    });

    return NextResponse.json(newCourse, { status: 201 });

  } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur serveur" },{ status: 500 } );
    }
}