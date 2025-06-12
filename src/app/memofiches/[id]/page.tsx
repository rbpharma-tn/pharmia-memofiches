import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Home } from 'lucide-react'
import MemoFicheView from '@/components/MemoFicheView'

// Fonction pour récupérer une mémofiche par ID
async function getMemofiche(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/memofiches`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch memofiches')
    }

    const result = await response.json()
    const memofiche = result.data?.find((m: any) => m.id === id)

    return memofiche || null
  } catch (error) {
    console.error('Error fetching memofiche:', error)
    return null
  }
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function MemoFichePage({ params }: PageProps) {
  const { id } = await params
  const memofiche = await getMemofiche(id)

  if (!memofiche) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MemoFicheView memofiche={memofiche} />
    </div>
  )
}
