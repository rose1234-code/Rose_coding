'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
import { Menu, X } from 'lucide-react'

export default function NavBar() {
  const path = usePathname()
  const { isSignedIn } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: "/home", label: "Accueil" },
    { href: "/project", label: "Projects" },
    { href: "/courses", label: "Cours" },
    { href: "/portfolio", label: "PortFolio" },
  ]

  return (
    <div className='w-full px-5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300'>
      <div className='flex items-center justify-between py-3'>

        {/* Logo */}
        <div className='flex items-center gap-2'>
          <span style={{ background: "linear-gradient(135deg, #ef4444, #7f1d1d)" }} className='px-2 py-1.5 text-white font-bold rounded-md'>RC</span>
          <p className='font-bold text-xl text-[#334155] dark:text-white'>Rose Coding</p>
        </div>

        {/* Liens desktop */}
        <ul className='hidden md:flex items-center gap-1'>
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              <li className={`
                px-2 py-0.5 rounded-md transition-colors duration-200
                ${path === href
                  ? 'text-red-500 bg-red-50 dark:bg-red-950 dark:text-red-400 border border-red-200 dark:border-red-800'
                  : 'text-[#5e6f87] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}>
                {label}
              </li>
            </Link>
          ))}
        </ul>

        {/* Auth + Dark mode + Hamburger */}
        <div className='flex items-center gap-2'>
          <div>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/register" />
            ) : (
              <SignInButton mode="modal">
                <button className='px-3 py-1 text-white rounded-md bg-[#334155] dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-sm transition-colors'>
                  Get started
                </button>
              </SignInButton>
            )}
          </div>

          <ModeToggle />

          {/* Hamburger mobile */}
          <button
            className='md:hidden text-gray-700 dark:text-gray-200'
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className='md:hidden flex flex-col gap-1 pb-4'>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              <div className={`
                px-3 py-2 rounded-md border transition-colors duration-200
                ${path === href
                  ? 'text-red-500 bg-red-50 dark:bg-red-950 dark:text-red-400 border-red-200 dark:border-red-800'
                  : 'text-[#334155] dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}>
                {label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}