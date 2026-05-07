export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const data = await LessonProgression.find({ userId });

  return NextResponse.json(data);
}