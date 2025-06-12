'use client'

import { useState, useMemo } from 'react'
import { Search, Book } from 'lucide-react'
import type { GlossaryTerm } from '@/types'

interface GlossarySectionProps {
  terms: GlossaryTerm[]
}

export default function GlossarySection({ terms }: GlossarySectionProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTerms = useMemo(() => {
    if (!searchTerm) return terms
    
    return terms.filter(term =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [terms, searchTerm])

  if (!terms || terms.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Book className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun terme de glossaire disponible
        </h3>
        <p className="text-gray-600">
          Les termes du glossaire pour cette mémofiche seront bientôt ajoutés.
        </p>
      </div>
    )
  }

  // Grouper les termes par première lettre
  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: GlossaryTerm[] } = {}
    
    filteredTerms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(term)
    })

    // Trier les termes dans chaque groupe
    Object.keys(groups).forEach(letter => {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term))
    })

    return groups
  }, [filteredTerms])

  const sortedLetters = Object.keys(groupedTerms).sort()

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Glossaire
        </h2>
        <p className="text-gray-600">
          Retrouvez les définitions des termes importants de cette mémofiche.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un terme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      {/* Results count */}
      {searchTerm && (
        <div className="text-sm text-gray-600">
          {filteredTerms.length} terme{filteredTerms.length !== 1 ? 's' : ''} trouvé{filteredTerms.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Terms */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-8">
          <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Aucun terme trouvé pour "{searchTerm}"</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedLetters.map(letter => (
            <div key={letter}>
              {/* Letter header */}
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                  {letter}
                </div>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Terms for this letter */}
              <div className="space-y-4">
                {groupedTerms[letter].map((term) => (
                  <div
                    key={term.id}
                    className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
                  >
                    <dt className="font-semibold text-gray-900 mb-2">
                      {term.term}
                    </dt>
                    <dd className="text-gray-700 leading-relaxed">
                      {term.definition}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Conseil d'utilisation</h4>
        <p className="text-blue-700 text-sm">
          Utilisez la barre de recherche pour trouver rapidement un terme spécifique. 
          Les termes sont organisés par ordre alphabétique pour faciliter la navigation.
        </p>
      </div>
    </div>
  )
}
