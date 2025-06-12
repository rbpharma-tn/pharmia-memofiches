'use client'

import { useState } from 'react'
import { Search, BookOpen, Pill, Stethoscope, Settings, Loader2, Lightbulb } from 'lucide-react'

interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: 'pathologie' | 'medicament' | 'procedure' | 'technique' | string
}

interface GlossaryViewerProps {
  terms: GlossaryTerm[]
  memoContent?: any[] // Contenu de la section mémo pour highlighting
}

export default function GlossaryViewer({ terms, memoContent }: GlossaryViewerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [customTerm, setCustomTerm] = useState('')
  const [customDefinition, setCustomDefinition] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Filtrage des termes
  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Catégories disponibles
  const categories = ['all', ...Array.from(new Set(terms.map(term => term.category)))]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pathologie': return <Stethoscope className="w-4 h-4" />
      case 'medicament': return <Pill className="w-4 h-4" />
      case 'procedure': return <Settings className="w-4 h-4" />
      case 'technique': return <BookOpen className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pathologie': return 'bg-red-100 text-red-800 border-red-200'
      case 'medicament': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'procedure': return 'bg-green-100 text-green-800 border-green-200'
      case 'technique': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'pathologie': return 'Pathologie'
      case 'medicament': return 'Médicament'
      case 'procedure': return 'Procédure'
      case 'technique': return 'Technique'
      case 'all': return 'Toutes les catégories'
      default: return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  // Fonction pour créer du contenu avec tooltips
  const createContentWithTooltips = (content: string) => {
    if (!terms || terms.length === 0) return content

    let processedContent = content

    terms.forEach(term => {
      const regex = new RegExp(`\\b${term.term}\\b`, 'gi')
      processedContent = processedContent.replace(regex, (match) => {
        return `<span class="glossary-highlight" data-tooltip="${term.definition}" title="${term.definition}">${match}</span>`
      })
    })

    return processedContent
  }

  const handleExplainTerm = async () => {
    if (!customTerm.trim()) return

    setIsLoading(true)
    setError('')
    setCustomDefinition('')

    try {
      const response = await fetch('/api/explain-term', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          term: customTerm.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'explication du terme')
      }

      const data = await response.json()
      
      if (data.success) {
        setCustomDefinition(data.definition)
      } else {
        throw new Error(data.error || 'Erreur inconnue')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'explication')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Barre de recherche et filtres */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un terme ou une définition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              {category !== 'all' && getCategoryIcon(category)}
              <span className={category !== 'all' ? 'ml-2' : ''}>
                {getCategoryLabel(category)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Section "Expliquer un terme" */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-blue-800">Expliquer un terme médical</h3>
        </div>
        
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Entrez un terme médical à expliquer..."
            value={customTerm}
            onChange={(e) => setCustomTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleExplainTerm()}
            className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={handleExplainTerm}
            disabled={!customTerm.trim() || isLoading}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !customTerm.trim() || isLoading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Explication...
              </div>
            ) : (
              'Expliquer'
            )}
          </button>
        </div>

        {/* Résultat de l'explication */}
        {customDefinition && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-800 mb-2">{customTerm}</div>
            <div className="text-gray-700">{customDefinition}</div>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-700">{error}</div>
          </div>
        )}
      </div>

      {/* Liste des termes */}
      <div className="space-y-4">
        {filteredTerms.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">
              {searchTerm ? 'Aucun terme trouvé pour cette recherche' : 'Aucun terme disponible'}
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-800">{term.term}</h4>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(term.category)}`}>
                    {getCategoryIcon(term.category)}
                    <span className="ml-1">{getCategoryLabel(term.category)}</span>
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{term.definition}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistiques */}
      {terms.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <div className="text-center text-sm text-gray-600">
            <span className="font-medium">{filteredTerms.length}</span> terme(s) affiché(s) sur{' '}
            <span className="font-medium">{terms.length}</span> au total
          </div>
        </div>
      )}
    </div>
  )
}
