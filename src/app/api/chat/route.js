import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { messages } = await req.json()

    const API_KEY = process.env.GROQ_API_KEY

    if (!API_KEY) {
      return NextResponse.json({ reply: "Clé API manquante" }, { status: 500 })
    }

    const formattedMessages = messages
      .filter(msg => {
        const text = msg.content || msg.parts?.[0]?.text
        return text && text.trim() !== ""
      })
      .map(msg => ({
        role: msg.role === "model" ? "assistant" : "user",
        content: String(msg.content || msg.parts?.[0]?.text),
      }))

    if (!formattedMessages.length) {
      return NextResponse.json({ reply: "Message vide" }, { status: 400 })
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",  // gratuit et rapide
        messages: [
          {
            role: "system",
            content: "Tu es un assistant pédagogique. Réponds en français de façon claire et encourageante."
          },
          ...formattedMessages
        ],
        max_tokens: 1024
      })
    })

    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ reply: "Erreur API: " + data.error.message }, { status: 500 })
    }

    const reply = data?.choices?.[0]?.message?.content || "Réponse vide"

    return NextResponse.json({ reply })

  } catch (error) {
    console.error("Erreur serveur :", error)
    return NextResponse.json({ reply: "Erreur serveur" }, { status: 500 })
  }
}