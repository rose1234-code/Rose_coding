// components/Header.tsx
export default function Header() {
  return (
    <header className=" bg-white/80 backdrop-blur-md flex justify-between items-center px-10 py-4 shadow">

      <div>
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Vue d'ensemble
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-4">
        <input
          placeholder="Rechercher..."
          className="px-4 py-2 rounded-full bg-gray-100 outline-none"
        />

        <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Get Started
        </button>
      </div>

    </header>
  )
}