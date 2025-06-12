'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Eye } from 'lucide-react'
import type { Flashcard } from '@/types'

interface FlashcardsSectionProps {
  flashcards: Flashcard[]
}

interface FlashcardComponentProps {
  flashcard: Flashcard
  isFlipped: boolean
  onFlip: () => void
}

function FlashcardComponent({ flashcard, isFlipped, onFlip }: FlashcardComponentProps) {
  return (
    <div className="relative w-full h-80 cursor-pointer perspective-1000" onClick={onFlip}>
      <div className={`flashcard-inner relative w-full h-full transition-transform duration-600 ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="flashcard-front absolute w-full h-full backface-hidden rounded-lg border-2 border-gray-200 bg-white shadow-lg flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mb-4">
              <Eye className="h-8 w-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Question</h3>
            <p className="text-gray-700 leading-relaxed">{flashcard.question}</p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">Cliquez pour voir la réponse</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flashcard-back absolute w-full h-full backface-hidden rotate-y-180 rounded-lg border-2 border-blue-200 bg-blue-50 shadow-lg flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-sm font-bold">R</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Réponse</h3>
            <p className="text-blue-800 leading-relaxed">{flashcard.answer}</p>
            <div className="mt-6">
              <p className="text-sm text-blue-600">Cliquez pour retourner la carte</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FlashcardsSection({ flashcards }: FlashcardsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucune flashcard disponible
        </h3>
        <p className="text-gray-600">
          Les flashcards pour cette mémofiche seront bientôt ajoutées.
        </p>
      </div>
    )
  }

  const currentFlashcard = flashcards[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1))
    setIsFlipped(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0))
    setIsFlipped(false)
  }

  const resetCard = () => {
    setIsFlipped(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Flashcards de révision
        </h2>
        <p className="text-gray-600">
          Testez vos connaissances avec ces cartes de révision interactives.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          Carte {currentIndex + 1} sur {flashcards.length}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetCard}
            className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Remettre à l'endroit</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div 
          className="bg-gray-900 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        ></div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-lg">
          <FlashcardComponent
            flashcard={currentFlashcard}
            isFlipped={isFlipped}
            onFlip={flipCard}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={goToPrevious}
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Précédente</span>
        </button>

        <div className="flex space-x-2">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsFlipped(false)
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-gray-900'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>Suivante</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">💡 Conseil d'utilisation</h4>
        <p className="text-green-700 text-sm">
          Lisez d'abord la question et essayez de formuler une réponse mentalement avant de retourner la carte. 
          Utilisez les flèches ou les points pour naviguer entre les cartes.
        </p>
      </div>
    </div>
  )
}
