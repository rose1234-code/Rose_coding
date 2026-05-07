'use client'

import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function CreateProject({ OpenP, CloseP }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [dateF, setDateF] = useState("") // ✅ string vide
  const { user, isLoaded, isSignedIn } = useUser()

  if (!OpenP) return null

  async function createProject() {
    if (!isLoaded || !isSignedIn || !user) {
      setError("Utilisateur non connecté")
      return
    }

    // ✅ validation correcte
    if (!title.trim() || !description.trim() || !dateF) {
      setError("Tous les champs sont obligatoires")
      return
    }

    try {
      setLoading(true)
      setError("")

      const res = await fetch("/api/project/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          dueDate:dateF,          // ✅ envoyé à l'API
          instructor: user.id
        })
      })

      const data = await res.json()
      console.log("Réponse API:", res.status, data)

      if (!res.ok) {
        setError(data.error || "Erreur lors de la création")
        return
      }

      setTitle("")
      setDescription("")
      setDateF("")
      CloseP()

    } catch (err) {
      console.error(err)
      setError("Erreur réseau, réessaie.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex "> {/* ✅ centré */}
      <div className="absolute inset-0 bg-black/60" onClick={CloseP} />

      <div className="relative bg-white w-[90%] md:w-[400px] rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Créer un projet</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded">{error}</p>
        )}

        <input
          placeholder="Titre du projet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />

        {/* ✅ input date natif */}
        <input
          type="date"
          value={dateF}
          onChange={(e) => setDateF(e.target.value)}
          className="border p-2 mb-4 w-full rounded text-gray-500"
        />

        <button
          onClick={createProject}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer"}
        </button>

        <button onClick={CloseP} className="absolute top-3 right-3 text-lg">✕</button>
      </div>
    </div>
  )
}