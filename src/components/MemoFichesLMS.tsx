'use client'

import { useState } from 'react'
import { Stethoscope, Pill, Leaf, Sparkles, Heart, FlaskConical, MessageCircle, Wrench, Clock, User, FileText } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Memofiche } from '@/types'

interface MemoFichesLMSProps {
  memofiches: Memofiche[]
}

const themes = [
  {
    id: 'all',
    label: 'Toutes les mémofiches',
    icon: FileText
  },
  {
    id: 'maladies-courantes',
    label: 'Maladies courantes',
    icon: Stethoscope
  },
  {
    id: 'ordonnances',
    label: 'Ordonnances',
    icon: Pill
  },
  {
    id: 'micronutrition',
    label: 'Micronutrition',
    icon: Leaf
  },
  {
    id: 'dermo-cosmetique',
    label: 'Dermo-cosmétique',
    icon: Sparkles
  },
  {
    id: 'pharmacie-veterinaire',
    label: 'Pharmacie vétérinaire',
    icon: Heart
  },
  {
    id: 'dispositifs',
    label: 'Dispositifs',
    icon: Wrench
  },
  {
    id: 'pharmacologie',
    label: 'Pharmacologie',
    icon: FlaskConical
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageCircle
  }
]

// Données mock avec catégories thérapeutiques
const mockMemoFichesWithCategories = [
  {
    id: '1',
    title: 'Candidose vulvo-vaginale',
    subtitle: 'Gynécologie',
    description: 'Prise en charge et conseils pour la candidose vulvo-vaginale',
    theme: 'maladies-courantes',
    level: 'Débutant',
    image_url: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Cystite aiguë simple',
    subtitle: 'Urologie',
    description: 'Prise en charge de la cystite aiguë simple chez la femme',
    theme: 'maladies-courantes',
    level: 'Débutant',
    image_url: null,
    created_at: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    title: 'Dysménorrhées',
    subtitle: 'Gynécologie',
    description: 'Prise en charge des dysménorrhées primaires et secondaires',
    theme: 'maladies-courantes',
    level: 'Intermédiaire',
    image_url: null,
    created_at: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    title: 'Analyse d\'ordonnance antibiotique',
    subtitle: 'Infectiologie',
    description: 'Vérification et dispensation des antibiotiques',
    theme: 'ordonnances',
    level: 'Avancé',
    image_url: null,
    created_at: '2024-01-18T11:00:00Z'
  },
  {
    id: '5',
    title: 'Ordonnance pédiatrique',
    subtitle: 'Pédiatrie',
    description: 'Spécificités de la dispensation en pédiatrie',
    theme: 'ordonnances',
    level: 'Avancé',
    image_url: null,
    created_at: '2024-01-19T15:30:00Z'
  },
  {
    id: '6',
    title: 'Compléments en fer',
    subtitle: 'Hématologie',
    description: 'Conseil et suivi des supplémentations en fer',
    theme: 'micronutrition',
    level: 'Intermédiaire',
    image_url: null,
    created_at: '2024-01-20T08:45:00Z'
  },
  {
    id: '7',
    title: 'Soins anti-âge',
    subtitle: 'Dermatologie',
    description: 'Conseils cosmétiques pour le vieillissement cutané',
    theme: 'dermo-cosmetique',
    level: 'Débutant',
    image_url: null,
    created_at: '2024-01-21T16:20:00Z'
  },
  {
    id: '8',
    title: 'Antiparasitaires chien/chat',
    subtitle: 'Parasitologie vétérinaire',
    description: 'Prévention et traitement des parasites',
    theme: 'pharmacie-veterinaire',
    level: 'Intermédiaire',
    image_url: null,
    created_at: '2024-01-22T10:10:00Z'
  }
]

export default function MemoFichesLMS({ memofiches }: MemoFichesLMSProps) {
  const [selectedTheme, setSelectedTheme] = useState('all')

  // Filtrer les mémofiches par thème sélectionné
  const filteredMemofiches = selectedTheme === 'all'
    ? memofiches
    : memofiches.filter(memofiche => memofiche.theme === selectedTheme)

  const selectedThemeData = themes.find(theme => theme.id === selectedTheme)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Mémofiches
          </h2>
          <p className="text-sm text-gray-600">
            Découvrez nos Mémofiches interactives pour optimiser votre conseil au comptoir de l'officine
          </p>
        </div>

        {/* Themes List */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Thèmes
          </h3>
          <nav className="space-y-2">
            {themes.map((theme) => {
              const Icon = theme.icon
              const isSelected = selectedTheme === theme.id
              const themeCount = theme.id === 'all'
                ? memofiches.length
                : memofiches.filter(m => m.theme === theme.id).length
              
              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-gray-900' : 'text-gray-400'}`} />
                    <span className="font-medium">{theme.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isSelected ? 'bg-white text-gray-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {themeCount}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            {selectedThemeData && (
              <>
                <selectedThemeData.icon className="h-6 w-6 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedThemeData.label}
                </h1>
              </>
            )}
          </div>
          <p className="text-gray-600">
            {filteredMemofiches.length} mémofiche{filteredMemofiches.length !== 1 ? 's' : ''} disponible{filteredMemofiches.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Memofiches Grid */}
        {filteredMemofiches.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredMemofiches.map((memofiche) => {
              const getLevelColor = (level: string) => {
                switch (level) {
                  case 'Débutant': return 'bg-green-100 text-green-800'
                  case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800'
                  case 'Avancé': return 'bg-red-100 text-red-800'
                  default: return 'bg-gray-100 text-gray-800'
                }
              }

              return (
                <div
                  key={memofiche.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 relative">
                    {memofiche.image_url ? (
                      <Image
                        src={memofiche.image_url}
                        alt={memofiche.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400 text-3xl font-bold">
                          {memofiche.title.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* Badge niveau */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(memofiche.level)}`}>
                        {memofiche.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {memofiche.subtitle}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {memofiche.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {memofiche.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(memofiche.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Pharmia</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progression</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/memofiches/${memofiche.id}`}
                      className="w-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-center block mt-auto"
                    >
                      Commencer
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              {selectedThemeData && <selectedThemeData.icon className="h-8 w-8 text-gray-400" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune mémofiche disponible
            </h3>
            <p className="text-gray-600">
              Les mémofiches pour ce thème seront bientôt ajoutées.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
