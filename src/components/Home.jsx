import Image from 'next/image'
import React from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full dark:bg-gray-950 transition-colors duration-300'>

      {/* Hero */}
      <div className='flex flex-col md:flex-row justify-between items-center px-5 md:px-7 pt-6 gap-8'>
        {/* Text */}
        <div className='flex flex-col gap-5 pt-8 md:pt-16 w-full md:w-1/2'>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-[#334155] via-[#d13f6bee] to-[#5a5f65] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
            L'architecture logicielle <br className='hidden md:block' /> redéfinie
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-sm md:text-base'>
            Une plateforme éditoriale de haute précision pour les architectes tech. <br className='hidden md:block'/>
            Maîtrisez les disciplines complexes à travers <br className='hidden md:block'/>
            une expérience IDE-immersive signée Rose Coding.
          </p>
          <div className='flex items-center gap-3 flex-wrap'>
            <button className='px-4 py-2 rounded-md bg-[#d13f6bee] text-white hover:opacity-90 transition'>
              Explorer les cours
            </button>
            <button className='px-4 py-2 rounded-md bg-[#dedcdc] dark:bg-gray-700 dark:text-white hover:ring transition'>
              Documentation
            </button>
          </div>
        </div>

        {/* Image */}
        <div className='w-full md:w-1/2 h-64 md:h-[490px] rounded-md overflow-hidden border dark:border-gray-700'>
          <Image className='w-full h-full object-cover rounded-md' src="/code.jpg" alt='code' width={600} height={490} />
        </div>
      </div>

      {/* Disciplines */}
      <section className="px-5 md:px-12 py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Disciplines Fondamentales</h2>
          <div className="w-20 h-1 bg-indigo-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Grande carte */}
          <div className="md:col-span-2 md:row-span-2 bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col justify-between group cursor-pointer transition hover:-translate-y-1 shadow-sm hover:shadow-lg">
            <div>
              {/* <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6 text-indigo-600">🏗️</div> */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Développement Web</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Apprenez à concevoir des systèmes distribués résilients, scalables et découplés
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-xl h-48">
              <img className="w-full h-full object-cover" src="/code.jpg" alt="architecture" />
            </div>
          </div>

          {/* Card Data Science */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 transition hover:bg-gray-100 dark:hover:bg-gray-700 border-b-2 border-transparent hover:border-indigo-500">
            {/* <div className="text-indigo-500 mb-4 text-2xl">💻</div> */}
            <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Data Science</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Transformez vos données en information utile</p>
          </div>

          {/* Card Cyber */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 transition hover:bg-gray-100 dark:hover:bg-gray-700 border-b-2 border-transparent hover:border-indigo-500">
            {/* <div className="text-indigo-500 mb-4 text-2xl">🔐</div> */}
            <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Cyber-Sécurité</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Zéro-trust et chiffrement avancé.</p>
          </div>

          {/* Image horizontale */}
          <div className="md:col-span-2 w-full h-52 bg-gray-900 dark:bg-gray-700 rounded-xl overflow-hidden">
            <img className="w-full h-full object-contain" src="/datarose.jpg" alt="data" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-5 md:px-12 py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Investissez dans votre expertise
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Des plans conçus par Rose Coding pour chaque étape de votre carrière d'architecte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Gratuit */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col border dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Gratuit</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-gray-900 dark:text-white">0€</span>
              <span className="text-gray-400 text-sm">/mois</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2"><Check size={17} color='red' /> 2 Modules Découverte</li>
              <li className="flex items-center gap-2"><Check size={17} color='red' /> Accès Communauté Slack</li>
              <li className="flex items-center gap-2"><Check size={17} color='red' /> Documentation publique</li>
              <li className="flex items-center gap-2 text-gray-400">❌ Certification officielle</li>
            </ul>
            <Link href="/courses" className="w-full py-3 text-center text-sm rounded-lg font-bold border border-gray-900 dark:border-gray-300 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white transition">
              Démarrer
            </Link>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl p-8 bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
            <p className='px-3 py-1 rounded-xl absolute z-20 bg-[#d4829aee] text-white text-xs top-3 right-4'>plus populaire</p>

            <div style={{
              position: 'absolute', width: '200%', height: '200%',
              top: '-50%', left: '-50%',
              background: 'conic-gradient(from 0deg, transparent 0deg, #e0205aee 60deg, #6366f1 120deg, #06b6d4 180deg, transparent 240deg)',
              animation: 'spinSlow 4s linear infinite', zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', inset: '3px', borderRadius: '0.9rem',
              background: 'var(--premium-bg, white)', zIndex: 1
            }} className="dark:!bg-gray-800" />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-2">Premium</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-gray-900 dark:text-white">49€</span>
                <span className="text-gray-400 text-sm">/mois</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-sm text-gray-700 dark:text-gray-300">
                <li className='flex items-center gap-2'><Check size={17} color='red' /> Accès illimité aux modules</li>
                <li className='flex items-center gap-2'><Check size={17} color='red' /> Workspace collaboratif illimité</li>
                <li className='flex items-center gap-2'><Check size={17} color='red' /> Certifications blockchain</li>
                <li className='flex items-center gap-2'><Check size={17} color='red' /> Revue de code hebdomadaire</li>
              </ul>
              <button className="w-full py-4 rounded-xl font-bold bg-[#334155] dark:bg-indigo-600 text-white shadow-lg hover:scale-105 transition">
                S'abonner maintenant
              </button>
            </div>
          </div>

          {/* Platinum */}
          <div className="bg-[#334155] dark:bg-gray-800 dark:border dark:border-gray-600 text-white rounded-xl p-8 flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 text-indigo-400">Platinum</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">129€</span>
              <span className="text-gray-400 text-sm">/mois</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1 text-sm">
              <li className='flex items-center gap-2'><Check size={17} color='red' /> Tout le plan Premium</li>
              <li className='flex items-center gap-2'><Check size={17} color='red' /> 2h de Mentorat 1-on-1</li>
              <li className='flex items-center gap-2'><Check size={17} color='red' /> Accès aux projets confidentiels</li>
              <li className='flex items-center gap-2'><Check size={17} color='red' /> Priorité support 24/7</li>
            </ul>
            <button className="w-full py-3 rounded-lg font-bold bg-white text-gray-900 hover:bg-gray-200 transition">
              Contacter les ventes
            </button>
          </div>

        </div>
      </section>
    </div>
  )
}