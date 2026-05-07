// components/ChatIA.tsx
"use client"

import { useState, useRef, useEffect } from "react"



export default function ChatIA() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function envoyer() {
    if (!input.trim()) {
  setMessages(prev => [...prev, {
    role: "assistant",
    content: "Veuillez entrer une question 😊"
  }])
  return
}

    const newMsg = {
      role: "user",
      content: input
    }
    const updatedMessages = [...messages, newMsg]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages })
    })

    const { reply } = await res.json()
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: reply }
    ])
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-125 rounded-2xl overflow-hidden shadow-2xl border bg-white">
      <div className="bg-[#d42f2fcc] text-white p-3 font-semibold text-sm flex justify-between items-center">
  Assistant IA
</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user"
            ? "flex justify-end"
            : "flex justify-start"}>
            <div className={m.role === "user"
              ? "bg-blue-500 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] text-sm"
              : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] text-sm"}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2 text-sm text-gray-400">
              En train de répondre...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t p-3 flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
          placeholder="Posez votre question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && envoyer()}
        />
        <button
          onClick={envoyer}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-40"
        >Envoyer</button>
      </div>
    </div>
  )
}