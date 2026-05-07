"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts"

export default function DashContent() {
  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [chartData, setChartData] = useState([])
  const [totalStudents, setTotalStudents] = useState(0)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("/api/course")
      .then(r => r.json())
      .then(data => {
        setCourses(data)
        const monthMap = {}
        const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
        const now = new Date()
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const key = `${d.getFullYear()}-${d.getMonth()}`
          monthMap[key] = { mois: months[d.getMonth()], cours: 0, etudiants: 0 }
        }
        let total = 0
        data.forEach(course => {
          const d = new Date(course.createdAt)
          const key = `${d.getFullYear()}-${d.getMonth()}`
          if (monthMap[key]) {
            monthMap[key].cours += 1
            monthMap[key].etudiants += course.totalStudents || 0
          }
          total += course.totalStudents || 0
        })
        setChartData(Object.values(monthMap))
        setTotalStudents(total)
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingCourses(false))
  }, [])

  useEffect(() => {
    fetch("/api/project")
      .then(r => r.json())
      .then(data => setProjects(data.success ? data.projects || [] : []))
      .catch(() => setProjects([]))
      .finally(() => setLoadingProjects(false))
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return "Date non définie"
    return new Date(dateString).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
  }

  const isProjectOverdue = (dueDate) => new Date() > new Date(dueDate)

  const getDaysRemaining = (dueDate) => {
    const diff = new Date(dueDate) - new Date()
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 0
  }

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow animate-pulse">
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
    </div>
  )

  return (
    <div className="p-4 md:p-10 flex-1 dark:bg-gray-950 transition-colors duration-300">
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        {/* GRAPHIQUE */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Activité des 6 derniers mois</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Bar dataKey="cours" name="Cours" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="etudiants" name="Étudiants" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* STATISTIQUES */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-6">
          <div className="bg-gray-600 dark:bg-gray-700 text-white p-4 rounded-xl">
            <p className="text-xs opacity-80">Total Étudiants</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">{totalStudents}</h2>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">Cours publiés</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900 dark:text-white">{courses.length}</h2>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">Projets actifs</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900 dark:text-white">
              {projects.filter(p => p.isPublished && new Date(p.dueDate) > new Date()).length}
            </h2>
          </div>
        </div>

        {/* SECTION COURS */}
        <div className="col-span-12">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Mes cours</h3>
          {loadingCourses ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-center">
              <p className="text-gray-400">Aucun cours pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {courses.map((course) => (
                <Link href={`/cours/${course._id}`} key={course._id}>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer border dark:border-gray-700">
                    {course.coverImage ? (
                      <img src={course.coverImage} alt={course.title} className="h-32 w-full object-cover rounded mb-3" />
                    ) : (
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-3 flex items-center justify-center text-gray-400 text-sm">
                        Pas d'image
                      </div>
                    )}
                    <h4 className="font-bold truncate text-gray-900 dark:text-white">{course.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-red-500 capitalize">{course.level || "Débutant"}</span>
                      <span className="text-xs text-gray-400">👥 {course.totalStudents || 0} étudiant(s)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* SECTION PROJETS */}
        <div className="col-span-12 mt-4 md:mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Mes projets</h3>
          {loadingProjects ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-center">
              <p className="text-gray-400">Aucun projet pour le moment.</p>
              <Link href="/creer-projet" className="inline-block mt-3 text-blue-600 hover:text-blue-700">
                Créer mon premier projet
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project) => (
                <Link href={`/projets/${project._id}`} key={project._id}>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer border dark:border-gray-700">
                    {project.coverImage ? (
                      <img src={project.coverImage} alt={project.title} className="h-32 w-full object-cover rounded mb-3" />
                    ) : (
                      <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded mb-3 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">📁 {project.title.charAt(0)}</span>
                      </div>
                    )}

                    <h4 className="font-bold truncate text-gray-900 dark:text-white">{project.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{project.description}</p>

                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Remise :</span>
                        <span className={isProjectOverdue(project.dueDate) ? "text-red-500 font-semibold" : "text-gray-600 dark:text-gray-300"}>
                          {formatDate(project.dueDate)}
                        </span>
                      </div>
                      {!isProjectOverdue(project.dueDate) && (
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">Jours restants :</span>
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {getDaysRemaining(project.dueDate)} jour(s)
                          </span>
                        </div>
                      )}
                      {isProjectOverdue(project.dueDate) && (
                        <div className="mt-1">
                          <span className="text-xs text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">
                            ⚠️ Date dépassée
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                      {project.isGroupProject && (
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded">
                          👥 Groupe
                        </span>
                      )}
                      {project.isPublished ? (
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
                          ✓ Publié
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">
                          📝 Brouillon
                        </span>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">{project.maxScore || 100} pts</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}