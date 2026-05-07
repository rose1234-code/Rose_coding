import connectDB from "@/db/ConnectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 }) // ✅ return manquant
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 }) // ✅ status manquant
    }

    return NextResponse.json({
      message: "Connexion réussie",
      role: user.role, // ✅ au premier niveau pour data.role côté front
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      }
    }, { status: 200 })

  } catch (error) {
    console.error("Erreur login:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}