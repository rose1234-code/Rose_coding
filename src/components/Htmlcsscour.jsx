'use client'

import { useState } from 'react'



export default function Htmlcsscour({ isOpen, onClose,setProgress }) {
  const [currentLesson, setCurrentLesson] = useState(0)

  const lessons = [
    {
      title: "Introduction au HTML",
      content: "Le HTML structure les pages web."
    },
    {
      title: "Balises de base",
      content: "<h1>, <p>, <a>, <div> sont essentielles."
    },
    {
      title: "Introduction au CSS",
      content: "Le CSS stylise le HTML."
    },
    {
      title: "Flexbox",
      content: "Permet d’aligner facilement les éléments."
    }
  ]

  if (!isOpen) return null
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Background overlay */}
        <div className="absolute inset-0 bg-black/60" onClick={onClose}/>
            {/* Modal */}
            <div className="relative bg-white w-[90%] md:w-[70%] h-[80%] rounded-2xl shadow-xl flex overflow-hidden">

                {/* Sidebar */}
                <aside className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
                  <h2 className="font-bold mb-4">Leçons</h2>
                  {lessons.map((lesson, index) => (
                    <div key={index} onClick={() => setCurrentLesson(index)} className={`p-2 rounded-lg cursor-pointer mb-2 ${
                        currentLesson === index ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>
                        {lesson.title}
                    </div>
                  ))}
                </aside>

                {/* Content */}
                <main className="flex-1 relative p-6 flex flex-col justify-between">
                    <button className='border text-[#db3232cc] text-[11px] fixed right-60 top-20 rounded-full px-2 py-1' onClick={() => {setProgress(prev => ({...prev,htmlcss: true}))}}>
                      Terminer le module 
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{lessons[currentLesson].title}</h1>
                        <p className="text-lg">{lessons[currentLesson].content}</p>
                    </div>

                     {/* Navigation */}
                    <div className="flex justify-between mt-6">
                        <button onClick={() => setCurrentLesson(prev => Math.max(prev - 1, 0))} className="bg-gray-300 px-4 py-2 rounded-lg">
                          Précédent
                        </button>

                        <button onClick={() =>setCurrentLesson(prev =>Math.min(prev + 1, lessons.length - 1))}
                          className="bg-black text-white px-4 py-2 rounded-lg">
                          Suivant
                        </button>
                    </div>
                </main>

                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-black text-xl "> ✕ </button>
        </div>
    </div>
  )
}