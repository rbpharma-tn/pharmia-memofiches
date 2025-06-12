'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { MemoSection as MemoSectionType } from '@/types'

interface MemoSectionProps {
  sections: MemoSectionType[]
}

interface CollapsibleSectionProps {
  section: MemoSectionType
  level?: number
}

function CollapsibleSection({ section, level = 0 }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(level === 0) // Les sections de niveau 0 sont ouvertes par défaut

  const hasChildren = section.children && section.children.length > 0
  const paddingLeft = level * 1.5 // Indentation progressive

  return (
    <div className="border border-gray-100 rounded-lg mb-4 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
        style={{ paddingLeft: `${1 + paddingLeft}rem` }}
      >
        <h3 className={`font-semibold text-gray-900 ${level === 0 ? 'text-lg' : 'text-base'}`}>
          {section.title}
        </h3>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="bg-white">
          <div 
            className="p-4 border-t border-gray-100 prose prose-gray max-w-none"
            style={{ paddingLeft: `${1 + paddingLeft}rem` }}
          >
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br>') }}
            />
          </div>

          {/* Children sections */}
          {hasChildren && (
            <div className="border-t border-gray-100 bg-gray-25">
              {section.children!.map((childSection) => (
                <CollapsibleSection
                  key={childSection.id}
                  section={childSection}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function MemoSection({ sections }: MemoSectionProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun contenu disponible
        </h3>
        <p className="text-gray-600">
          Le contenu de cette mémofiche sera bientôt ajouté.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contenu théorique
        </h2>
        <p className="text-gray-600">
          Explorez le contenu organisé en sections dépliables pour une meilleure compréhension.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <CollapsibleSection
            key={section.id}
            section={section}
            level={0}
          />
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Conseil d'utilisation</h4>
        <p className="text-blue-700 text-sm">
          Cliquez sur les titres des sections pour les déplier ou les replier. 
          Prenez le temps de lire chaque section avant de passer aux flashcards et au quiz.
        </p>
      </div>
    </div>
  )
}
