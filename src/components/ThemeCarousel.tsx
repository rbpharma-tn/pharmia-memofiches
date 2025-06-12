'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Stethoscope, Pill, Leaf, Sparkles, Heart, FlaskConical, MessageCircle, Wrench } from 'lucide-react'

interface Theme {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  borderColor: string
}

const themes: Theme[] = [
  {
    id: 'maladies-courantes',
    title: 'Maladies courantes',
    description: 'Pathologies fréquentes au comptoir et leur prise en charge',
    icon: Stethoscope,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'ordonnances',
    title: 'Ordonnances',
    description: 'Analyse et dispensation des prescriptions médicales',
    icon: Pill,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'micronutrition',
    title: 'Micronutrition',
    description: 'Compléments alimentaires et conseils nutritionnels',
    icon: Leaf,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'dermo-cosmetique',
    title: 'Dermo-cosmétique',
    description: 'Soins de la peau et produits de beauté',
    icon: Sparkles,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    id: 'pharmacie-veterinaire',
    title: 'Pharmacie vétérinaire',
    description: 'Santé animale et médicaments vétérinaires',
    icon: Heart,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    id: 'dispositifs',
    title: 'Dispositifs',
    description: 'Dispositifs médicaux et matériel de santé',
    icon: Wrench,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200'
  },
  {
    id: 'pharmacologie',
    title: 'Pharmacologie',
    description: 'Mécanismes d\'action et interactions médicamenteuses',
    icon: FlaskConical,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Relation patient et techniques de communication',
    icon: MessageCircle,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  }
]

export default function ThemeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Mémorisation des thèmes pour éviter les re-renders
  const memoizedThemes = useMemo(() => themes, [])

  // Nombre de cartes visibles selon la taille d'écran
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4 // lg
      if (window.innerWidth >= 768) return 3  // md
      if (window.innerWidth >= 640) return 2  // sm
      return 1 // mobile
    }
    return 4
  }

  const [visibleCards, setVisibleCards] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards())
    }

    // Debounce pour éviter trop d'appels
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    handleResize()
    window.addEventListener('resize', debouncedResize, { passive: true })
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  // Auto-play du carrousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = memoizedThemes.length - visibleCards
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, visibleCards])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => {
      const maxIndex = memoizedThemes.length - visibleCards
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => {
      const maxIndex = memoizedThemes.length - visibleCards
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <div className="relative mb-16">
      {/* En-tête du carrousel */}
      <div className="text-center mb-8">
        <h3 className="scratch-title text-black mb-4">
          Domaines d'expertise
        </h3>
      </div>

      {/* Carrousel */}
      <div className="relative overflow-hidden">
        {/* Boutons de navigation - Style Scratch */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-150 group"
          aria-label="Thème précédent"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-black transition-colors" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-150 group"
          aria-label="Thème suivant"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-black transition-colors" />
        </button>

        {/* Container des cartes */}
        <div className="mx-12 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
            }}
          >
            {memoizedThemes.map((theme, index) => {
              const Icon = theme.icon
              const isHovered = hoveredIndex === index
              
              return (
                <div
                  key={theme.id}
                  className={`flex-shrink-0 px-3`}
                  style={{ width: `${100 / visibleCards}%` }}
                  onMouseEnter={() => {
                    setHoveredIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null)
                    setIsAutoPlaying(true)
                  }}
                >
                  <div
                    className={`relative border-2 rounded-lg p-6 text-center cursor-pointer overflow-hidden bg-white transition-all duration-150 ease-in-out transform ${
                      isHovered
                        ? `${theme.bgColor} ${theme.borderColor} scale-105 shadow-lg -translate-y-1`
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {/* Effet de brillance au hover */}
                    <div className={`
                      absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300
                      ${isHovered ? 'opacity-100' : ''}
                      bg-gradient-to-r from-transparent via-white/30 to-transparent
                      transform -skew-x-12 translate-x-full
                      ${isHovered ? 'animate-shine' : ''}
                    `} />

                    {/* Effet de gradient de fond au hover */}
                    <div className={`
                      absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500
                      ${isHovered ? 'opacity-10' : ''}
                      bg-gradient-to-br ${theme.bgColor.replace('bg-', 'from-')} to-transparent
                    `} />
                    
                    {/* Icône */}
                    <div className={`
                      relative mb-4 transition-all duration-300
                      ${isHovered ? 'scale-110' : ''}
                    `}>
                      <Icon className={`
                        h-10 w-10 mx-auto transition-colors duration-300
                        ${isHovered ? theme.color : 'text-gray-700'}
                      `} />
                    </div>

                    {/* Titre */}
                    <h4 className={`
                      text-lg font-semibold mb-3 transition-colors duration-300
                      ${isHovered ? theme.color : 'text-gray-900'}
                    `}>
                      {theme.title}
                    </h4>

                    {/* Description */}
                    <p className={`
                      text-sm leading-relaxed transition-all duration-300
                      ${isHovered ? 'text-gray-700 scale-105' : 'text-gray-600'}
                    `}>
                      {theme.description}
                    </p>

                    {/* Badge animé au hover */}
                    <div className={`
                      absolute -top-2 -right-2 w-4 h-4 rounded-full
                      transition-all duration-300 transform
                      ${isHovered 
                        ? `${theme.bgColor} ${theme.borderColor} border-2 scale-100 opacity-100` 
                        : 'scale-0 opacity-0'
                      }
                    `} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Indicateurs de pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: memoizedThemes.length - visibleCards + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${currentIndex === index 
                ? 'bg-gray-900 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
              }
            `}
            aria-label={`Aller au groupe ${index + 1}`}
          />
        ))}
      </div>

      {/* Contrôles de lecture */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors group"
        >
          <div className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
          `} />
          <span>{isAutoPlaying ? 'Pause' : 'Lecture'} automatique</span>
        </button>

        {/* Indicateur de progression */}
        {isAutoPlaying && (
          <div className="text-xs text-gray-400">
            Prochaine slide dans 4s
          </div>
        )}
      </div>
    </div>
  )
}
