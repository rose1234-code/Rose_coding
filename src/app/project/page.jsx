'use client'

import NavBar from '@/components/ui/NavBar'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

// ✅ Fonctions utilitaires
function formatDate(dateStr) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}

function isProjectOverdue(dateStr) {
  if (!dateStr) return false
  return new Date(dateStr) < new Date()
}

function getDaysRemaining(dateStr) {
  if (!dateStr) return 0
  const diff = new Date(dateStr) - new Date()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default function Page() {
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("/api/project")
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setProjects(data.projects || [])
        } else {
          console.error("Erreur API projets:", data.error)
          setProjects([])
        }
      })
      .catch(err => {
        console.error("Erreur chargement projets:", err)
        setProjects([])
      })
      .finally(() => setLoadingProjects(false))
  }, [])

  return (
    <div className=' flex flex-col gap-10'>
      <NavBar />

      <div className="py-6 px-12">
        <div className="col-span-12 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Mes projets</h3>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <p className="text-gray-400">Aucun projet pour le moment.</p>
              <Link href="/creer-projet" className="inline-block mt-3 text-blue-600 hover:text-blue-700">
                Créer mon premier projet
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link href={`/projets/${project._id}`} key={project._id}>
                  <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer">

                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-32 w-full object-cover rounded mb-3"
                      />
                    ) : (
                      <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded mb-3 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">📁 {project.title.charAt(0)}</span>
                      </div>
                    )}

                    <h4 className="font-bold truncate">{project.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>

                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Remise :</span>
                        <span className={isProjectOverdue(project.dueDate) ? "text-red-500 font-semibold" : "text-gray-600"}>
                          {formatDate(project.dueDate)}
                        </span>
                      </div>

                      {!isProjectOverdue(project.dueDate) && (
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <span className="text-gray-500">Jours restants :</span>
                          <span className="text-blue-600 font-semibold">
                            {getDaysRemaining(project.dueDate)} jour(s)
                          </span>
                        </div>
                      )}

                      {isProjectOverdue(project.dueDate) && (
                        <div className="mt-1">
                          <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">
                            ⚠️ Date dépassée
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                      {project.isGroupProject && (
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
                          👥 Groupe
                        </span>
                      )}
                      {project.isPublished ? (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                          ✓ Publié
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                          📝 Brouillon
                        </span>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">
                        {project.maxScore || 100} pts
                      </span>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer/>
    </div>
  )
}