'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react'
import type { QuizQuestion } from '@/types'

interface QuizSectionProps {
  questions: QuizQuestion[]
}

interface QuizState {
  currentQuestionIndex: number
  selectedAnswers: (number | null)[]
  showResults: boolean
  score: number
}

export default function QuizSection({ questions }: QuizSectionProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: new Array(questions.length).fill(null),
    showResults: false,
    score: 0
  })

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun quiz disponible
        </h3>
        <p className="text-gray-600">
          Les questions de quiz pour cette mémofiche seront bientôt ajoutées.
        </p>
      </div>
    )
  }

  const currentQuestion = questions[quizState.currentQuestionIndex]
  const isLastQuestion = quizState.currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...quizState.selectedAnswers]
    newSelectedAnswers[quizState.currentQuestionIndex] = answerIndex
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: newSelectedAnswers
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculer le score
      const score = quizState.selectedAnswers.reduce((acc, answer, index) => {
        if (answer === questions[index].correct_answer) {
          return acc + 1
        }
        return acc
      }, 0)

      setQuizState(prev => ({
        ...prev,
        showResults: true,
        score
      }))
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }))
    }
  }

  const handlePrevious = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex - 1
    }))
  }

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: new Array(questions.length).fill(null),
      showResults: false,
      score: 0
    })
  }

  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestionIndex]

  if (quizState.showResults) {
    const percentage = Math.round((quizState.score / questions.length) * 100)
    
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="mb-6">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quiz terminé !
          </h2>
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {percentage}%
          </div>
          <p className="text-xl text-gray-600 mb-6">
            {quizState.score} bonnes réponses sur {questions.length}
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Recommencer</span>
            </button>
          </div>
        </div>

        {/* Détail des réponses */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Détail des réponses</h3>
          {questions.map((question, index) => {
            const userAnswer = quizState.selectedAnswers[index]
            const isCorrect = userAnswer === question.correct_answer
            
            return (
              <div key={question.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Votre réponse :</span> {question.options[userAnswer!]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Bonne réponse :</span> {question.options[question.correct_answer]}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Quiz de connaissances
        </h2>
        <p className="text-gray-600">
          Testez vos connaissances avec ce quiz interactif.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          Question {quizState.currentQuestionIndex + 1} sur {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
        <div 
          className="bg-gray-900 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((quizState.currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                selectedAnswer === index
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswer === index
                    ? 'border-gray-900 bg-gray-900'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={quizState.currentQuestionIndex === 0}
          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Précédent
        </button>

        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="px-6 py-2 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isLastQuestion ? 'Terminer' : 'Suivant'}
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">💡 Conseil</h4>
        <p className="text-yellow-700 text-sm">
          Prenez le temps de bien lire chaque question et toutes les options avant de répondre. 
          Vous pourrez voir les explications à la fin du quiz.
        </p>
      </div>
    </div>
  )
}
