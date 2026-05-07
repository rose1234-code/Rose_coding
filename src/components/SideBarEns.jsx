'use client'

import { useState } from "react"
import CreateCourseModal from "./CreateCourse"
import { UserButton, useUser } from "@clerk/nextjs"
import CreateProject from "./CreateProject"

export default function SideBarEns() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [openCreate, setOpenCreate] = useState(false)
  const [openProject, setOpenProject] = useState(false)

  return (
    <aside className="w-30 lg:w-72 h-screen lg:px-7 sticky top-0 bg-slate-100 dark:bg-gray-900 flex gap-6 flex-col border-r dark:border-gray-700 transition-colors duration-300">

      {/* MENU */}
      <div className="mt-10 space-y-1">
        <button className="flex items-center px-6 py-2 bg-white dark:bg-gray-800 border-l-4 border-red-600 text-red-600 font-bold w-full rounded-r-md">
          Dashboard
        </button>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col pt-10 gap-2">
        <button
          onClick={() => setOpenProject(true)}
          style={{ background: "linear-gradient(135deg, #ef4444, #7f1d1d)" }}
          className="w-full text-white py-1 rounded-xl hover:opacity-90 transition"
        >
          + New Project
        </button>

        <button
          onClick={() => setOpenCreate(true)}
          style={{ background: "linear-gradient(135deg, #ef4444, #7f1d1d)" }}
          className="w-full text-center text-white py-1 rounded-xl hover:opacity-90 transition"
        >
          + New Course
        </button>

        <CreateProject OpenP={openProject} CloseP={() => setOpenProject(false)} />
        <CreateCourseModal isOpen={openCreate} onClose={() => setOpenCreate(false)} />

        {/* User */}
        <div className="mt-6 flex items-center gap-2 border-t dark:border-gray-700 pt-4">
          {isSignedIn && <UserButton afterSignOutUrl="/register" />}
          <div>
            {isSignedIn && (
              <p className="text-sm font-bold text-gray-900 dark:text-white">{user.firstName}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">Developer</p>
          </div>
        </div>
      </div>
    </aside>
  )
}