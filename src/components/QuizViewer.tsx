'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  type: 'qcm' | 'vrai_faux'
  options: string[]
  correct_answer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface QuizViewerProps {
  questions: QuizQuestion[]
}

interface UserAnswer {
  questionId: string
  selectedOption: number
  isCorrect: boolean
}

export default function QuizViewer({ questions }: QuizViewerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Aucune question de quiz disponible</div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return

    setSelectedOption(optionIndex)

    // Réaction immédiate : pas besoin de validation
    const isCorrect = optionIndex === currentQuestion.correct_answer
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      isCorrect
    }

    setUserAnswers([...userAnswers, newAnswer])
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedOption(null)
    setShowExplanation(false)
    setQuizCompleted(false)
  }

  const calculateScore = () => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length
    return {
      correct: correctAnswers,
      total: userAnswers.length,
      percentage: Math.round((correctAnswers / userAnswers.length) * 100)
    }
  }

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent ! Vous maîtrisez parfaitement le sujet ! 🏆"
    if (percentage >= 75) return "Très bien ! Vous avez une bonne compréhension ! 🎯"
    if (percentage >= 60) return "Bien ! Continuez vos efforts ! 📚"
    if (percentage >= 40) return "Passable. Il serait bon de réviser ! 📖"
    return "Il faut réviser davantage. Courage ! 💪"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (quizCompleted) {
    const score = calculateScore()
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Terminé !</h2>
          </div>

          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {score.percentage}%
            </div>
            <div className="text-xl text-gray-600 mb-4">
              {score.correct} / {score.total} bonnes réponses
            </div>
            <div className="text-lg text-gray-700 bg-gray-50 rounded-lg p-4">
              {getScoreMessage(score.percentage)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{score.correct}</div>
              <div className="text-sm text-green-700">Correctes</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{score.total - score.correct}</div>
              <div className="text-sm text-red-700">Incorrectes</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{score.total}</div>
              <div className="text-sm text-blue-700">Total</div>
            </div>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="flex items-center mx-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Recommencer le Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progression */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="text-sm text-gray-600">
            Score: {userAnswers.filter(a => a.isCorrect).length} / {userAnswers.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex-1">
            {currentQuestion.question}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty === 'easy' ? 'Facile' : 
             currentQuestion.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
          </span>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer "

            if (showExplanation) {
              if (index === currentQuestion.correct_answer) {
                buttonClass += "border-green-500 bg-green-100 text-green-800 shadow-md"
              } else if (index === selectedOption && index !== currentQuestion.correct_answer) {
                buttonClass += "border-red-500 bg-red-100 text-red-800 shadow-md"
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500"
              }
            } else {
              buttonClass += "border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={buttonClass}
                disabled={showExplanation}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-medium">
                    {currentQuestion.type === 'vrai_faux' ?
                      (index === 0 ? 'V' : 'F') :
                      String.fromCharCode(65 + index)
                    }
                  </span>
                  <span className="flex-1">{option}</span>
                  {showExplanation && index === currentQuestion.correct_answer && (
                    <CheckCircle className="w-6 h-6 ml-auto text-green-600" />
                  )}
                  {showExplanation && index === selectedOption && index !== currentQuestion.correct_answer && (
                    <XCircle className="w-6 h-6 ml-auto text-red-600" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Explication */}
        {showExplanation && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-start">
              <Target className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-blue-800 mb-1">Explication :</div>
                <div className="text-blue-700">{currentQuestion.explanation}</div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton d'action */}
        <div className="flex justify-end">
          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all shadow-md hover:shadow-lg font-medium"
            >
              {isLastQuestion ? 'Voir les résultats' : 'Question suivante'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
