'use client'

import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function CreateCourseModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isOpen) return null

  async function createCourse() {
    // 1. Garde : user pas encore chargé
    if (!isLoaded || !isSignedIn || !user) {
      setError("Utilisateur non connecté")
      return
    }

    // 2. Validation côté client
    if (!title.trim() || !description.trim()) {
      setError("Le titre et la description sont obligatoires")
      return
    }

    try {
      setLoading(true)
      setError("")

      const res = await fetch("/api/course/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description
         
        })
      })

      const data = await res.json()
      console.log("Réponse API:", res.status, data)

      // 3. Vérifier le statut avant de fermer
      if (!res.ok) {
        setError(data.error || "Erreur lors de la création")
        return
      }

      // 4. Réinitialiser les champs
      setTitle("")
      setDescription("")
      onClose() // fermer seulement si succès

    } catch (err) {
      console.error(err)
      setError("Erreur réseau, réessaie.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed left-0 inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-white w-[30%] md:w-[300px] rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Créer un cours</h2>

        {/* Affichage des erreurs */}
        {error && (
          <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <input
          placeholder="Titre du cours"
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

        <button
          onClick={createCourse}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer"}
        </button>

        <button onClick={onClose} className="absolute top-3 right-3 text-lg">
          ✕
        </button>
      </div>
    </div>
  )
}