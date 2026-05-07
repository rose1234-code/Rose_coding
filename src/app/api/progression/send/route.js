import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LessonProgression from "@/models/LessonProgression";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, lessonId, courseId, completed, progress } = await req.json();

    const updated = await LessonProgression.findOneAndUpdate(
      { userId, lessonId },
      {
        userId,
        lessonId,
        courseId,
        completed,
        progress
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(updated);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}