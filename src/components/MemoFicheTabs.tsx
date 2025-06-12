'use client'

import { useState } from 'react'
import { FileText, Zap, HelpCircle, Book, Play, Headphones } from 'lucide-react'
import type { Memofiche } from '@/types'
import MemoSection from './MemoSection'
import FlashcardsSection from './FlashcardsSection'
import QuizSection from './QuizSection'
import GlossarySection from './GlossarySection'

interface MemoFicheTabsProps {
  memofiche: Memofiche
}

type TabId = 'memo' | 'flashcards' | 'quiz' | 'glossary' | 'resources'

const tabs = [
  {
    id: 'memo' as TabId,
    label: 'Mémo',
    icon: FileText,
    description: 'Contenu théorique'
  },
  {
    id: 'flashcards' as TabId,
    label: 'Flashcards',
    icon: Zap,
    description: 'Cartes de révision'
  },
  {
    id: 'quiz' as TabId,
    label: 'Quiz',
    icon: HelpCircle,
    description: 'Questions-réponses'
  },
  {
    id: 'glossary' as TabId,
    label: 'Glossaire',
    icon: Book,
    description: 'Définitions'
  },
  {
    id: 'resources' as TabId,
    label: 'Ressources',
    icon: Play,
    description: 'Vidéos et liens'
  }
]

export default function MemoFicheTabs({ memofiche }: MemoFicheTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('memo')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'memo':
        return <MemoSection sections={memofiche.content.memo} />
      case 'flashcards':
        return <FlashcardsSection flashcards={memofiche.content.flashcards} />
      case 'quiz':
        return <QuizSection questions={memofiche.content.quiz} />
      case 'glossary':
        return <GlossarySection terms={memofiche.content.glossary} />
      case 'resources':
        return (
          <div className="space-y-6">
            {/* YouTube Videos */}
            {memofiche.content.youtube_videos && memofiche.content.youtube_videos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Vidéos YouTube</span>
                </h3>
                <div className="space-y-4">
                  {memofiche.content.youtube_videos.map((video) => (
                    <div key={video.id} className="border border-gray-100 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{video.title}</h4>
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Vidéo YouTube intégrée</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kahoot */}
            {memofiche.content.kahoot_url && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Quiz Kahoot</span>
                </h3>
                <div className="border border-gray-100 rounded-lg p-6 text-center">
                  <p className="text-gray-600 mb-4">
                    Participez au quiz interactif Kahoot pour tester vos connaissances
                  </p>
                  <a
                    href={memofiche.content.kahoot_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <span>Ouvrir Kahoot</span>
                  </a>
                </div>
              </div>
            )}

            {/* Podcast */}
            {memofiche.content.podcast_url && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Headphones className="h-5 w-5" />
                  <span>Podcast</span>
                </h3>
                <div className="border border-gray-100 rounded-lg p-6 text-center">
                  <p className="text-gray-600 mb-4">
                    Écoutez le podcast associé à cette mémofiche
                  </p>
                  <a
                    href={memofiche.content.podcast_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <Headphones className="h-4 w-4" />
                    <span>Écouter le podcast</span>
                  </a>
                </div>
              </div>
            )}

            {/* Message si pas de ressources */}
            {!memofiche.content.youtube_videos?.length && 
             !memofiche.content.kahoot_url && 
             !memofiche.content.podcast_url && (
              <div className="text-center py-12">
                <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune ressource disponible
                </h3>
                <p className="text-gray-600">
                  Les ressources complémentaires seront bientôt ajoutées.
                </p>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-100">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  )
}
