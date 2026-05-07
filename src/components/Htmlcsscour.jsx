'use client'

import { useState } from 'react'

export default function Htmlcsscour({ isOpen, onClose, setProgress }) {
  const [currentLesson, setCurrentLesson] = useState(0)

  const lessons = [
    { title: "Introduction au HTML", content: "Le HTML structure les pages web." },
    { title: "Balises de base", content: "<h1>, <p>, <a>, <div> sont essentielles." },
    { title: "Introduction au CSS", content: "Le CSS stylise le HTML." },
    { title: "Flexbox", content: "Permet d'aligner facilement les éléments." }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 w-[90%] md:w-[70%] h-[80%] rounded-2xl shadow-xl flex overflow-hidden border dark:border-gray-700 transition-colors duration-300">

        {/* Sidebar */}
        <aside className="w-1/3 bg-gray-100 dark:bg-gray-800 p-1 lg:p-4 overflow-y-auto border-r dark:border-gray-700">
          <h2 className="font-bold mb-4 text-gray-900 dark:text-white">Leçons</h2>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() => setCurrentLesson(index)}
              className={`p-2 rounded-lg text-sm cursor-pointer  mb-2 transition-colors duration-200 
                ${currentLesson === index
                  ? 'bg-gray-900 dark:bg-indigo-600 text-white line-clamp-1'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 line-clamp-1 dark:hover:bg-gray-700'
                }`}
            >
              {lesson.title}
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 relative p-6 flex flex-col justify-between bg-white dark:bg-gray-900">

          {/* Bouton terminer */}
          <button
            onClick={() => setProgress(prev => ({ ...prev, htmlcss: true }))}
            className="border border-[#db3232cc] text-[#db3232cc] dark:border-red-400 dark:text-red-400 text-[9px] lg:text-[11px] fixed right-40 lg:right-60 top-12 lg:top-20 rounded-full p-0.5 md:px-2 lg:py-1 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
          >
            Terminer le module
          </button>

          <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {lessons[currentLesson].title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {lessons[currentLesson].content}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentLesson(prev => Math.max(prev - 1, 0))}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Précédent
            </button>
            <button
              onClick={() => setCurrentLesson(prev => Math.min(prev + 1, lessons.length - 1))}
              className="bg-gray-900 dark:bg-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Suivant
            </button>
          </div>
        </main>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl transition"
        >
          ✕
        </button>
      </div>
    </div>
  )
}