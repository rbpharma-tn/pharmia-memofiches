'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Lightbulb, BookOpen, HelpCircle, Zap } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AITeacherProps {
  memoficheId?: string
  userLevel?: 'Débutant' | 'Intermédiaire' | 'Avancé'
  context?: string
}

export default function AITeacher({ memoficheId, userLevel = 'Débutant', context }: AITeacherProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Bonjour ! Je suis votre assistant IA spécialisé en pharmacie d'officine. Je suis là pour vous accompagner dans votre apprentissage${memoficheId ? ' de cette mémofiche' : ''}. Comment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
      suggestions: [
        'Expliquer un concept',
        'Poser une question',
        'Demander des exemples',
        'Vérifier mes connaissances'
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulation d'appel API à l'IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, userLevel, context)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string, level: string, context?: string) => {
    // Simulation de réponses intelligentes basées sur le contexte
    const responses = {
      'Débutant': {
        content: `Excellente question ! En tant que débutant, je vais vous expliquer cela de manière simple et progressive. ${getContextualResponse(userMessage, 'basic')}`,
        suggestions: ['Donner plus d\'exemples', 'Expliquer les bases', 'Quiz simple', 'Cas pratique facile']
      },
      'Intermédiaire': {
        content: `Bonne question ! Avec votre niveau intermédiaire, nous pouvons approfondir ce sujet. ${getContextualResponse(userMessage, 'intermediate')}`,
        suggestions: ['Approfondir le sujet', 'Cas complexes', 'Interactions médicamenteuses', 'Quiz avancé']
      },
      'Avancé': {
        content: `Question pertinente ! À votre niveau avancé, explorons les aspects les plus complexes. ${getContextualResponse(userMessage, 'advanced')}`,
        suggestions: ['Cas cliniques complexes', 'Dernières recherches', 'Protocoles avancés', 'Analyse critique']
      }
    }

    return responses[level] || responses['Débutant']
  }

  const getContextualResponse = (message: string, level: string) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('candidose') || lowerMessage.includes('mycose')) {
      return level === 'basic' 
        ? 'La candidose vulvo-vaginale est une infection fongique très courante. Elle se manifeste par des démangeaisons et des pertes blanches épaisses.'
        : level === 'intermediate'
        ? 'La candidose résulte d\'un déséquilibre de la flore vaginale, souvent favorisé par les antibiotiques, le stress ou les variations hormonales.'
        : 'Les récidives de candidose nécessitent une approche différentielle incluant l\'exclusion d\'un diabète, l\'évaluation de l\'immunité et la recherche de souches résistantes.'
    }
    
    if (lowerMessage.includes('cystite') || lowerMessage.includes('infection urinaire')) {
      return level === 'basic'
        ? 'La cystite est une infection de la vessie qui provoque des brûlures en urinant et des envies fréquentes.'
        : level === 'intermediate'
        ? 'E. coli est responsable de 80% des cystites. Le diagnostic repose sur la bandelette urinaire et les symptômes cliniques.'
        : 'Les cystites récidivantes nécessitent une antibioprophylaxie ou un traitement préventif selon les recommandations SPILF.'
    }

    return 'Je peux vous aider à comprendre ce concept en détail. Voulez-vous que je vous donne des exemples concrets ?'
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="flex flex-col h-96 bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">AI Teacher</h3>
          <p className="text-xs text-gray-600">Assistant pédagogique intelligent • Niveau: {userLevel}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-gray-900' : 'bg-blue-100'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-3 w-3 text-white" />
                ) : (
                  <Bot className="h-3 w-3 text-blue-600" />
                )}
              </div>
              <div className={`rounded-lg px-3 py-2 ${
                message.type === 'user' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Suggestions */}
        {messages.length > 0 && messages[messages.length - 1].type === 'ai' && messages[messages.length - 1].suggestions && (
          <div className="flex flex-wrap gap-2 mt-3">
            {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="h-3 w-3 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Posez votre question..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => handleSendMessage('Peux-tu m\'expliquer ce concept ?')}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <Lightbulb className="h-3 w-3" />
            <span>Expliquer</span>
          </button>
          <button
            onClick={() => handleSendMessage('Donne-moi un exemple pratique')}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <BookOpen className="h-3 w-3" />
            <span>Exemple</span>
          </button>
          <button
            onClick={() => handleSendMessage('Teste mes connaissances')}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <HelpCircle className="h-3 w-3" />
            <span>Quiz</span>
          </button>
        </div>
      </div>
    </div>
  )
}
