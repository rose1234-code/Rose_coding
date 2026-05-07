'use client'

import NavBar from "@/components/ui/NavBar";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const {user,isLoaded,isSignedIn}=useUser()
  if(!isLoaded) return(
    <div>chargement</div>
  )
  if(!isSignedIn) return(
    <div>Non connecte</div>
  )
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
      <NavBar/>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <input
          className="w-full bg-gray-100 border rounded-xl py-4 px-4 focus:ring-2 focus:ring-red-500 outline-none"
          placeholder="Rechercher..."
        />
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 pt-8">

        {/* Hero */}
        <section className="mb-12">
          <h1 className="text-4xl font-extrabold text-red-900 mb-3">
            Bon retour {user.firstName}
          </h1>
          <p className="text-gray-600">
            Vous avez terminé <span className="text-red-600 font-bold">12 modules</span>.
          </p>
        </section>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Active course */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Cours Actif</h3>
            <p className="text-gray-500 mb-4">React avancé</p>

            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-bold text-red-600">64%</span>
              <span className="text-sm text-gray-400">12/18</span>
            </div>

            <button className="bg-red-600 text-white px-6 py-3 rounded-lg">
              Continuer
            </button>
          </div>

          {/* Stats */}
          <div className="bg-gray-100 p-6 rounded-xl">
            <p className="text-2xl font-bold">24j</p>
            <p className="text-xs text-gray-500">Série</p>
          </div>

        </div>

        {/* Projects */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Projets</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((p) => (
              <div key={p} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <h4 className="font-bold mb-2">Projet {p}</h4>
                <p className="text-sm text-gray-500">
                  Description du projet...
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t flex justify-around py-3">
        <button>🏠</button>
        <button>📁</button>
        <button>📚</button>
      </nav>
    </div>
  )
}