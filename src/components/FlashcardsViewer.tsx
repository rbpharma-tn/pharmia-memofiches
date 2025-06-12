'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Zap } from 'lucide-react'

interface Flashcard {
  id: string
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface FlashcardsViewerProps {
  flashcards: Flashcard[]
}

export default function FlashcardsViewer({ flashcards }: FlashcardsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Aucune flashcard disponible</div>
        <div className="text-sm text-gray-400 mt-2">Les flashcards seront générées automatiquement</div>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-gray-100 text-gray-700 border-gray-300'
      case 'medium': return 'bg-gray-200 text-gray-800 border-gray-400'
      case 'hard': return 'bg-gray-800 text-white border-gray-900'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile'
      case 'medium': return 'Moyen'
      case 'hard': return 'Difficile'
      default: return 'Normal'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* En-tête avec icône et progression */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-gray-700 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
        </div>
        <div className="text-lg font-semibold text-gray-700 mb-3">
          Carte {currentIndex + 1} sur {flashcards.length}
        </div>
        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Carte principale */}
      <div className="relative mb-8 max-w-2xl mx-auto">
        <div
          className={`flip-card ${isFlipped ? 'flipped' : ''}`}
          onClick={flipCard}
        >
          <div className="flip-card-inner h-80">
            {/* Recto - Question */}
            <div className="flip-card-front bg-white border-2 border-gray-300 rounded-xl shadow-lg p-8 flex flex-col justify-center items-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide">Question</div>
                <div className="text-xl font-semibold text-gray-900 leading-relaxed mb-6">
                  {currentCard.question}
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                  Cliquez pour voir la réponse
                </div>
              </div>

              {/* Badge difficulté */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(currentCard.difficulty)}`}>
                  {getDifficultyLabel(currentCard.difficulty)}
                </span>
              </div>
            </div>

            {/* Verso - Réponse */}
            <div className="flip-card-back bg-gray-50 border-2 border-gray-400 rounded-xl shadow-lg p-8 flex flex-col justify-center items-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">Réponse</div>
                <div className="text-lg text-gray-900 leading-relaxed mb-6">
                  {currentCard.answer}
                </div>
                <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg">
                  Cliquez pour voir la question
                </div>
              </div>

              {/* Icône retourner */}
              <div className="absolute top-4 right-4">
                <RotateCcw className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles de navigation */}
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-300 hover:border-gray-400'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Précédent
        </button>

        <div className="flex space-x-2">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsFlipped(false)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-gray-800 scale-125'
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentIndex === flashcards.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              : 'bg-gray-800 text-white hover:bg-gray-900 shadow-md hover:shadow-lg border border-gray-800'
          }`}
        >
          Suivant
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
        <div className="font-medium mb-2">💡 Comment utiliser les flashcards :</div>
        <div className="space-y-1">
          <div>• Cliquez sur la carte pour la retourner</div>
          <div>• Utilisez les boutons ou les points pour naviguer</div>
          <div>• Testez vos connaissances avant de voir la réponse</div>
        </div>
      </div>
    </div>
  )
}

// Styles CSS pour les animations 3D
const styles = `
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`

// Injection des styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
