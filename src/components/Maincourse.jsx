'use client'

import { useState } from "react"
import Htmlcsscour from "./Htmlcsscour"
import ChatIA from "./ChatIA"

// Composant card réutilisable
function CourseCard({ level, duration, title, description, onExplore, done }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 hover:shadow-xl transition">
      <div className="flex justify-between text-sm mb-6">
        <span className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">{level}</span>
        <span className="text-gray-500 dark:text-gray-400">{duration}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2">{description}</p>
      <button
        onClick={onExplore}
        className={`${done ? "bg-green-500" : "bg-[#334155] dark:bg-indigo-600"} text-white px-2 py-1.5 rounded hover:opacity-90 transition`}
      >
        {done ? "Terminé" : "Explorer"}
      </button>
    </div>
  )
}

// Header de section réutilisable
function SectionHeader({ tag, title, description }) {
  return (
    <div>
      <span className="text-[#9b1c1c] dark:text-red-400 text-xs font-bold uppercase">{tag}</span>
      <h2 className="text-4xl font-black text-[#334155] dark:text-white mt-3">{title}</h2>
      <input
        placeholder="Rechercher un cours..."
        className="mt-6 w-full border dark:border-gray-600 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:placeholder-gray-400"
      />
      <p className="mt-5 mb-3 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default function Maincourse({ module }) {
  const [open, setOpen] = useState(false)
  const [openAI, setOpenAI] = useState(false)
  const [progress, setProgress] = useState({
    htmlcss: false,
    javascript: false,
    typescript: false,
    react: false,
    nextjs: false
  })

  const main = () => {

    if (module === "Developement web") {
      return (
        <section className="flex-1 p-6 md:p-12 space-y-16 bg-[#fdf8f8] dark:bg-gray-900 transition-colors duration-300">
          <SectionHeader
            tag="Architecture Logicielle"
            title={module}
            description="Maîtrisez les fondations du web moderne avec une approche orientée performance."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <CourseCard level="Basic" duration="10h" title="HTML & CSS"
              description="HTML & CSS est le langage de base qui structure le contenu des pages web."
              done={progress.htmlcss} onExplore={() => setOpen(true)}
            />
            <Htmlcsscour isOpen={open} onClose={() => setOpen(false)} setProgress={setProgress} />

            <CourseCard level="Intermédiaire" duration="15h" title="JavaScript"
              description="JavaScript permet de rendre les pages web interactives et dynamiques."
            />
            <CourseCard level="Intermédiaire" duration="15h" title="TypeScript"
              description="Sécuriser et structurer le code JavaScript."
            />
            <CourseCard level="Intermédiaire" duration="12h" title="React"
              description="Bibliothèque JavaScript pour créer des interfaces utilisateur dynamiques et réutilisables."
            />
            <CourseCard level="Basic" duration="20h" title="Next.js"
              description="Framework React pour créer des applications complètes, rapides et optimisées."
            />
          </div>
        </section>
      )
    }

    if (module === "Data Science") {
      return (
        <section className="flex-1 p-6 md:p-12 space-y-16 bg-[#fdf8f8] dark:bg-gray-900 transition-colors duration-300">
          <SectionHeader
            tag="Analyse de Donnée"
            title={module}
            description="Apprenez à analyser, visualiser et exploiter les données pour prendre de meilleures décisions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <CourseCard level="Basic" duration="12h" title="Python"
              description="Langage essentiel pour l'analyse de données."
            />
            <CourseCard level="Intermédiaire" duration="15h" title="Pandas"
              description="Manipulation et transformation des données."
            />
            <CourseCard level="Intermédiaire" duration="14h" title="Data Visualization"
              description="Visualisez les données avec Matplotlib et Seaborn."
            />
            <CourseCard level="Avancé" duration="20h" title="Machine Learning"
              description="Introduction aux modèles prédictifs."
            />
            <div className="sm:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 hover:shadow-xl transition">
              <div className="flex justify-between text-sm mb-6">
                <span className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">Avancé</span>
                <span className="text-gray-500 dark:text-gray-400">25h</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Deep Learning</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Réseaux de neurones et intelligence artificielle.</p>
              <button className="bg-[#334155] dark:bg-indigo-600 text-white px-3 py-2 rounded hover:opacity-90 transition">
                Explorer
              </button>
            </div>
          </div>
        </section>
      )
    }

    if (module === "Devops") {
      return (
        <section className="flex-1 p-6 md:p-12 space-y-16 bg-[#fdf8f8] dark:bg-gray-900 transition-colors duration-300">
          <SectionHeader
            tag="Architecture Logicielle"
            title={module}
            description="Maîtrisez les fondations du DevOps avec une approche orientée automatisation."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <CourseCard level="Basic" duration="10h" title="Linux & Bash"
              description="Les bases du système Linux et des scripts shell pour l'automatisation."
            />
            <CourseCard level="Intermédiaire" duration="15h" title="Docker"
              description="Conteneurisation des applications pour des déploiements reproductibles."
            />
            <CourseCard level="Intermédiaire" duration="15h" title="Kubernetes"
              description="Orchestration de conteneurs à grande échelle."
            />
            <CourseCard level="Intermédiaire" duration="12h" title="CI/CD"
              description="Pipelines d'intégration et de déploiement continu avec GitHub Actions."
            />
            <CourseCard level="Avancé" duration="20h" title="Terraform"
              description="Infrastructure as Code pour gérer vos ressources cloud."
            />
          </div>
        </section>
      )
    }
  }

  return (
    <div className="w-full text-[#1f1a1a] dark:text-white min-h-screen dark:bg-gray-900 transition-colors duration-300">
      {main()}

      {/* Bouton IA flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full p-[5px] animate-spin-slow bg-[conic-gradient(#d42f2fcc,orange,#d42f2fcc)]">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
              <button
                onClick={() => setOpenAI(!openAI)}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-[#d42f2fcc] text-white shadow-xl active:scale-95 transition text-xs font-bold"
              >
                Aide?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat IA */}
      {openAI && (
        <div className="fixed shadow-2xl bottom-20 right-6 z-50 w-[350px] animate-fadeIn">
          <ChatIA />
        </div>
      )}
    </div>
  )
}