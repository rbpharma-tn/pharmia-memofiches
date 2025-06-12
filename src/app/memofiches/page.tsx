// import { getMemofiches } from '@/lib/database'
import { getMockMemofiches } from '@/lib/mock-data'
import { Clock, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import MemoFichesLMS from '@/components/MemoFichesLMS'

// Fonction pour récupérer les mémofiches depuis l'API
async function getMemofiches() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'}/api/memofiches`, {
      cache: 'no-store' // Toujours récupérer les données fraîches
    })

    if (!response.ok) {
      throw new Error('Failed to fetch memofiches')
    }

    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Error fetching memofiches:', error)
    // Fallback vers les données mock en cas d'erreur
    return await getMockMemofiches()
  }
}

export default async function MemoFichesPage() {
  const memofiches = await getMemofiches()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-full mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-gray-900">
                PharmIA
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                Accueil
              </Link>
              <Link href="/memofiches" className="text-gray-900 font-medium">
                Mémofiches
              </Link>
              <Link href="/auth/signin" className="text-gray-500 hover:text-gray-900 transition-colors">
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <MemoFichesLMS memofiches={memofiches} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2025 Pharmia - Mémofiches Cas Comptoir à l'Officine
          </p>
        </div>
      </footer>
    </div>
  )
}
