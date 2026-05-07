'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Eye, EyeOff } from 'lucide-react'
import Image from "next/image"
import { SignInButton, useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function Page() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // ✅ Ne redirige que si l'user Clerk est connecté ET qu'on ne soumet pas le formulaire custom
    if (isLoaded && isSignedIn && !isSubmitting) {
      router.replace("/home")
    }
  }, [isSignedIn, isLoaded, isSubmitting])

  if (!isLoaded) return <p className="text-center mt-10">Loading...</p>

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (!email || !password) {
      setError("Email et mot de passe requis")
      setIsSubmitting(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/user/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      console.log("Réponse auth:", data) // 👈 pour déboguer

      if (response.ok) {
        // ✅ redirection selon le role retourné par l'API
        if (data.role === "enseignant") {
          router.replace("/dashboardens")
        } else if (data.role === "admin") {
          router.replace("/admin")
        } else {
          router.replace("/home")
        }
      } else {
        setError(data.error || "Email ou mot de passe incorrect")
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error("Erreur serveur", err)
      setError("Erreur réseau, réessaie.")
      setIsSubmitting(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full lg:w-[40%] mx-auto h-screen px-3 lg:px-0 pt-16'>
      <div className='pt-5 flex flex-col bg-[#fcf9f9cc] px-4 shadow-xl hover:shadow-2xl rounded-2xl'>
        <h1 className='text-[#334155] text-center font-bold text-3xl'>Se connecter</h1>

        <div className='flex justify-center items-center gap-3 mb-5 mt-7'>
          <SignInButton mode="modal" strategy="oauth_google" afterSignInUrl="/home">
            <button className="border p-2 rounded-full flex flex-col items-center">
              <Image src="/google.svg" alt="Google" width={18} height={18} />
            </button>
          </SignInButton>
          <span className='text-gray-400'>ou</span>
          <SignInButton mode="modal" strategy="oauth_github" afterSignInUrl="/home">
            <button className="border p-2 rounded-full flex flex-col items-center">
              <Image src="/github.svg" alt="GitHub" width={18} height={18} />
            </button>
          </SignInButton>
        </div>

        <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-3 pb-6'>
          {error && (
            <p className='text-red-500 text-sm bg-red-50 p-2 rounded'>{error}</p>
          )}

          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-md'>
              Adresse email <span className='text-red-600 text-lg'>*</span>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className='outline-none border px-3 py-1 rounded-md'
              placeholder='name@gmail.com'
              type='email'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <label className='font-semibold text-md'>
                Password <span className='text-red-600 text-lg'>*</span>
              </label>
              <p className='text-blue-400 hover:underline text-sm cursor-pointer'>Mot de passe oublié ?</p>
            </div>
            <div className='border w-full rounded-md flex items-center justify-between px-2'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='outline-none flex-1 p-1'
                placeholder='············'
                type={showPassword ? "text" : "password"}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-black transition">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex mt-4 flex-1 w-full">
            <button
              type='submit'
              disabled={loading}
              className="flex flex-1 text-center px-4 py-1.5 items-center justify-center gap-2 text-xl font-semibold text-white rounded-2xl bg-gradient-to-r from-slate-800 to-gray-300 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Submit'}
              <FaArrowRight className="text-white opacity-80" />
            </button>
          </div>
        </form>
      </div>

      <div className='mt-3'>
        <Link className='text-[12px]' href="/register">
          Êtes-vous nouveau à l'académie ? <span className='underline text-blue-600'>Créer un compte !</span>
        </Link>
      </div>
    </div>
  )
}