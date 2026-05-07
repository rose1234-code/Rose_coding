'use client'

import Link from 'next/link'
import React from 'react'

export default function SideBar({ onSelect, activeState }) {
  const courses = [
    { name: "Developement web" },
    { name: "Data Science" },
    { name: "Devops" }
  ]

  return (
    <aside className="hidden md:flex overflow-y-hidden top-0 sticky flex-col pt-8 w-64 h-screen p-6 bg-[#f5ecec] dark:bg-gray-900 border-r dark:border-gray-700 transition-colors duration-300">
      <h1 className='font-semibold text-2xl text-gray-900 dark:text-white'>Intitulés</h1>

      <div className="space-y-3 mt-4">
        {courses.map((course, index) => (
          <button
            onClick={() => onSelect(course.name)}
            key={index}
            className={`block p-2 w-full rounded-lg shadow cursor-pointer transition
              ${activeState === course.name
                ? 'bg-[#8291a7] dark:bg-indigo-600 text-white'
                : 'text-[#334155] dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            {course.name}
          </button>
        ))}
      </div>

      <Link
        href="/dashboardetud"
        className="mt-5 rounded-md text-center shadow p-1.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        Dashboard
      </Link>
    </aside>
  )
}