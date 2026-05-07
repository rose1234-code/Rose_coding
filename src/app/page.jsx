'use client'
import React, { useState, useEffect } from 'react'
import { FaArrowRight, FaGraduationCap, FaBookOpen } from "react-icons/fa";
import { LoaderPinwheel, Drill, Link2, Globe, Code, EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const DOMAINES = ["Dev Web", "Data Science", "Devops", "Cybersecurity", "AI & ML"]

// Classes réutilisables
const inputClass = "ring ring-gray-200 dark:ring-gray-600 rounded-md outline-none py-1.5 px-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 w-full"
const labelClass = "font-semibold text-gray-700 dark:text-gray-200"

export default function Page() {
  const [role, setRole] = useState("etudiant")
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPasswordTeacher, setShowPasswordTeacher] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [cour, setCour] = useState("")
  const [bibliographie, setBibliographie] = useState("")
  const [profession, setProfession] = useState("")

  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace('/home')
  }, [isSignedIn, isLoaded])

  if (!isLoaded) return <p className="text-center mt-10 dark:text-white">Loading...</p>

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "etudiant", firstName, lastName, email, password })
      })
      if (response.ok) {
        alert('Compte créé avec succès')
        router.replace("/login")
      } else {
        alert("Erreur lors de la création du compte")
      }
    } catch (error) {
      console.error("Erreur serveur", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitEns = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "enseignant", bibliographie, cour, profession, firstName, lastName, email, password })
      })
      if (response.ok) {
        alert('Candidature soumise avec succès')
        router.replace("/login")
      } else {
        alert("Erreur lors de la soumission")
      }
    } catch (error) {
      console.error("Erreur serveur", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full lg:w-[50%] mx-auto min-h-screen px-3 lg:px-0 dark:bg-gray-950 transition-colors duration-300'>
      <div className='pt-5 flex flex-col bg-[#fcf9f9cc] dark:bg-gray-800 lg:px-4 shadow-xl hover:shadow-2xl rounded-2xl border dark:border-gray-700 transition-colors duration-300'>

        <h1 className='text-[#334155] dark:text-white text-center font-bold text-3xl'>Create your Account</h1>
        <p className='text-[#334155] dark:text-gray-400 text-center mx-auto my-2'>
          select your role to begin your technical <br /> journey!
        </p>

        {/* Sélecteur de rôle */}
        <div className='flex items-center justify-center gap-3 mt-5'>
          <div
            onClick={() => setRole("etudiant")}
            className={`${role === "etudiant" ? 'bg-[#68b3c6] dark:bg-[#44a1b9]' : 'bg-[#f1f6f8] dark:bg-gray-700'} transition duration-300 transform hover:scale-105 flex flex-col rounded-md items-center justify-center border-r px-3.5 py-1 ring ring-[#44a1b9] cursor-pointer`}
          >
            <FaGraduationCap size={21} className="text-gray-700 dark:text-white mb-1" />
            <p className="font-semibold text-sm text-gray-700 dark:text-white">Student</p>
          </div>
          <div
            onClick={() => setRole("teacher")}
            className={`${role === "teacher" ? 'bg-[#68b3c6] dark:bg-[#44a1b9]' : 'bg-[#f1f6f8] dark:bg-gray-700'} transition duration-300 transform hover:scale-105 flex flex-col rounded-md items-center justify-center px-3.5 py-1 hover:ring ring-[#44a1b9] border-r cursor-pointer`}
          >
            <FaBookOpen size={21} className="text-gray-700 dark:text-white mb-1" />
            <p className="font-semibold text-sm text-gray-700 dark:text-white">Teacher</p>
          </div>
        </div>

        {/* Formulaire étudiant */}
        {role === "etudiant" && (
          <div className='px-12 mt-7 pb-6'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>FirstName <span className='text-red-600 text-lg'>*</span></label>
                <input onChange={(e) => setFirstName(e.target.value)} className={inputClass} type="text" placeholder='enter your firstName' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>LastName <span className='text-red-600 text-lg'>*</span></label>
                <input onChange={(e) => setLastName(e.target.value)} className={inputClass} type="text" placeholder='enter your lastName' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>e-mail <span className='text-red-600 text-lg'>*</span></label>
                <input onChange={(e) => setEmail(e.target.value)} className={inputClass} type="email" placeholder='enter your email' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>password <span className='text-red-600 text-lg'>*</span></label>
                <div className='ring ring-gray-200 dark:ring-gray-600 rounded-md px-1 w-full flex justify-between bg-white dark:bg-gray-700'>
                  <input onChange={(e) => setPassword(e.target.value)} className='flex-1 outline-none py-1.5 px-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500' type={showPassword1 ? 'text' : 'password'} placeholder='enter your password' />
                  <button type='button' onClick={() => setShowPassword1(prev => !prev)} className='text-gray-500 dark:text-gray-400'>
                    {showPassword1 ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <span className='text-gray-400 dark:text-gray-500 font-semibold text-[10px]'>Minimum 8 caractères avec au moins un symbole alphanumérique</span>
              </div>
              <button disabled={loading} type='submit' className="flex flex-1 text-center px-5 py-2 items-center justify-center gap-2 text-xl font-semibold text-white rounded-2xl bg-gradient-to-r from-slate-800 to-gray-400 dark:from-indigo-700 dark:to-slate-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50">
                {loading ? 'Chargement...' : 'Submit'}
                <FaArrowRight className="text-white opacity-80" />
              </button>
            </form>
          </div>
        )}

        {/* Formulaire enseignant */}
        {role === "teacher" && (
          <div className='mt-6 px-3 pb-6'>
            <form onSubmit={handleSubmitEns} className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>FirstName <span className='text-red-600 text-lg'>*</span></label>
                <input onChange={(e) => setFirstName(e.target.value)} className={inputClass} type="text" placeholder='enter your firstName' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>LastName <span className='text-red-600 text-lg'>*</span></label>
                <input onChange={(e) => setLastName(e.target.value)} className={inputClass} type="text" placeholder='enter your lastName' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>e-mail <span className='text-red-600 text-lg'>*</span></label>
                <input onChange={(e) => setEmail(e.target.value)} className={inputClass} type="email" placeholder='enter your email' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>password <span className='text-red-600 text-lg'>*</span></label>
                <div className='flex justify-between ring ring-gray-200 dark:ring-gray-600 rounded-md px-1 bg-white dark:bg-gray-700'>
                  <input onChange={(e) => setPassword(e.target.value)} className='outline-none py-1.5 px-1 flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500' type={showPasswordTeacher ? 'text' : 'password'} placeholder='enter your password' />
                  <button onClick={() => setShowPasswordTeacher(prev => !prev)} type='button' className='text-gray-500 dark:text-gray-400'>
                    {showPasswordTeacher ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Titre professionnel <span className='text-red-600 text-lg'>*</span></label>
                <input onChange={(e) => setProfession(e.target.value)} className={inputClass} type="text" placeholder='senior architect' />
              </div>

              {/* Domaine */}
              <div className='flex flex-col gap-1 col-span-2'>
                <div className='flex items-center gap-2 mb-1'>
                  <LoaderPinwheel size={20} className='text-gray-700 dark:text-gray-300' />
                  <span className={labelClass}>DOMAINE D'EXPERTISE <span className='text-red-600 text-lg'>*</span></span>
                </div>
                <select
                  value={cour}
                  onChange={(e) => setCour(e.target.value)}
                  className='border dark:border-gray-600 rounded-md px-3 py-2 w-full outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-white'
                >
                  <option value="">-- Choisir un domaine --</option>
                  {DOMAINES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {cour && <p className='text-sm text-blue-600 dark:text-blue-400 mt-1'>✓ Domaine sélectionné : <strong>{cour}</strong></p>}
              </div>

              {/* Bibliographie */}
              <div className='flex flex-col gap-1 col-span-2'>
                <div className='flex items-center gap-2 mb-1'>
                  <Drill size={20} className='text-gray-700 dark:text-gray-300' />
                  <span className={labelClass}>BIBLIOGRAPHY <span className='text-red-600 text-lg'>*</span></span>
                </div>
                <textarea
                  onChange={(e) => setBibliographie(e.target.value)}
                  className='border dark:border-gray-600 bg-[#f5f9fe] dark:bg-gray-700 h-20 w-full rounded-md py-1 px-2 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
                  placeholder='enter your experience'
                />
              </div>

              {/* Présence en ligne */}
              <div className='col-span-2 space-y-1.5'>
                <div className='flex items-center gap-3 mb-2'>
                  <Link2 size={22} className='text-gray-700 dark:text-gray-300' />
                  <span className={labelClass}>Présence en ligne</span>
                </div>
                <div className='flex bg-gray-50 dark:bg-gray-700 items-center border dark:border-gray-600 gap-1 rounded-md px-2 py-1'>
                  <Globe color='gray' size={17} />
                  <input className='my-1 outline-none py-1 w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500' placeholder='Portfolio Url' type="text" />
                </div>
                <div className='flex bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 items-center gap-1 rounded-md px-2 p-1'>
                  <Code color='gray' size={17} />
                  <input className='my-1 outline-none py-1 w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500' placeholder='Github profile' type="text" />
                </div>
              </div>

              <div className="flex mt-3 col-span-2 w-full">
                <button type='submit' disabled={loading} className="flex flex-1 text-center px-5 py-2 items-center justify-center gap-2 text-xl font-semibold text-white rounded-2xl bg-gradient-to-r from-slate-800 to-gray-400 dark:from-indigo-700 dark:to-slate-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50">
                  {loading ? 'Chargement...' : 'Soumettez la candidature'}
                  <FaArrowRight className="text-white opacity-80" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className='mt-3 pb-4'>
        <Link href="/login" className='text-gray-600 dark:text-gray-400 text-sm'>
          Avez-vous déjà un compte ? <span className='underline text-blue-600 dark:text-blue-400'>Se connecter !</span>
        </Link>
      </div>
    </div>
  )
}