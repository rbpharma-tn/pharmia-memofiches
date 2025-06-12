'use client'

import { useState } from 'react'
import { CheckCircle, Circle, Lock, Star, Trophy, Target, BookOpen, Brain, Zap, Crown } from 'lucide-react'

interface Milestone {
  id: string
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert'
  title: string
  description: string
  skills: string[]
  duration: string
  memofichesCount: number
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  borderColor: string
  completed: boolean
  locked: boolean
  progress: number
}

const milestones: Milestone[] = [
  {
    id: 'debutant',
    level: 'Débutant',
    title: 'Fondamentaux du conseil',
    description: 'Maîtrisez les bases du conseil pharmaceutique au comptoir',
    skills: ['Accueil patient', 'Questions essentielles', 'Pathologies courantes', 'Orientation médicale'],
    duration: '2-4 semaines',
    memofichesCount: 15,
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    completed: true,
    locked: false,
    progress: 100
  },
  {
    id: 'intermediaire',
    level: 'Intermédiaire',
    title: 'Expertise approfondie',
    description: 'Développez vos compétences en analyse et conseil spécialisé',
    skills: ['Interactions médicamenteuses', 'Cas complexes', 'Dermo-cosmétique', 'Micronutrition'],
    duration: '4-6 semaines',
    memofichesCount: 25,
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    completed: false,
    locked: false,
    progress: 65
  },
  {
    id: 'avance',
    level: 'Avancé',
    title: 'Spécialisation experte',
    description: 'Perfectionnez-vous dans les domaines de pointe',
    skills: ['Pharmacologie avancée', 'Dispositifs médicaux', 'Pharmacie vétérinaire', 'Communication complexe'],
    duration: '6-8 semaines',
    memofichesCount: 30,
    icon: Zap,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    completed: false,
    locked: true,
    progress: 0
  },
  {
    id: 'expert',
    level: 'Expert',
    title: 'Maîtrise complète',
    description: 'Devenez référent en conseil pharmaceutique',
    skills: ['Formation équipe', 'Cas exceptionnels', 'Innovation thérapeutique', 'Leadership pharmaceutique'],
    duration: '8-12 semaines',
    memofichesCount: 40,
    icon: Crown,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    completed: false,
    locked: true,
    progress: 0
  }
]

export default function LearningPath() {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null)
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null)

  const getStatusIcon = (milestone: Milestone) => {
    if (milestone.completed) {
      return <CheckCircle className={`h-6 w-6 ${milestone.color}`} />
    } else if (milestone.locked) {
      return <Lock className="h-6 w-6 text-gray-400" />
    } else {
      return <Circle className={`h-6 w-6 ${milestone.color}`} />
    }
  }

  const getProgressColor = (milestone: Milestone) => {
    if (milestone.completed) return 'bg-green-500'
    if (milestone.locked) return 'bg-gray-300'
    return milestone.color.replace('text-', 'bg-')
  }

  return (
    <div className="mb-16">
      {/* En-tête */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Target className="w-6 h-6 text-gray-700 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            Parcours d'apprentissage personnalisé
          </h3>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Progressez étape par étape dans votre maîtrise du conseil pharmaceutique. 
          Chaque niveau débloque de nouvelles compétences et mémofiches spécialisées.
        </p>
      </div>

      {/* Timeline des jalons */}
      <div className="relative">
        {/* Ligne de progression */}
        <div className="absolute top-8 left-0 right-0 h-2 bg-gray-200 rounded-full mx-8 overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-1000 relative"
            style={{ width: '40%' }}
          >
            {/* Effet de brillance sur la barre de progression */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
          </div>

          {/* Points de progression */}
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`
                absolute top-1/2 w-3 h-3 rounded-full border-2 border-white transform -translate-y-1/2 transition-all duration-300
                ${milestone.completed
                  ? 'bg-gray-900'
                  : milestone.locked
                    ? 'bg-gray-400'
                    : hoveredMilestone === milestone.id
                      ? milestone.color.replace('text-', 'bg-')
                      : 'bg-gray-500'
                }
                ${hoveredMilestone === milestone.id ? 'scale-150 z-30' : 'z-20'}
              `}
              style={{ left: `${(index / (milestones.length - 1)) * 100}%`, marginLeft: '-6px' }}
            />
          ))}
        </div>

        {/* Jalons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            const isSelected = selectedMilestone === milestone.id
            const isActive = !milestone.locked

            return (
              <div
                key={milestone.id}
                className={`
                  relative cursor-pointer transition-all duration-300 transform
                  ${isSelected ? 'scale-105' : 'hover:scale-102'}
                  ${isActive ? '' : 'opacity-60'}
                  ${hoveredMilestone === milestone.id ? 'z-20' : 'z-10'}
                `}
                onClick={() => isActive && setSelectedMilestone(isSelected ? null : milestone.id)}
                onMouseEnter={() => setHoveredMilestone(milestone.id)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                {/* Numéro du jalon */}
                <div className="flex justify-center mb-4">
                  <div className={`
                    relative w-16 h-16 rounded-full border-4 flex items-center justify-center
                    transition-all duration-300 transform
                    ${milestone.completed
                      ? 'bg-gray-900 border-gray-900 shadow-lg'
                      : milestone.locked
                        ? 'bg-gray-100 border-gray-300'
                        : 'bg-white border-gray-200 hover:shadow-md'
                    }
                    ${hoveredMilestone === milestone.id && !milestone.locked
                      ? `scale-110 shadow-xl ${milestone.bgColor} ${milestone.borderColor}`
                      : ''
                    }
                    ${milestone.completed ? 'animate-pulse-slow' : ''}
                  `}>
                    <div className={`transition-colors duration-300 ${
                      milestone.completed
                        ? 'text-white'
                        : milestone.locked
                          ? 'text-gray-400'
                          : hoveredMilestone === milestone.id
                            ? milestone.color
                            : 'text-gray-600'
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : milestone.locked ? (
                        <Lock className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </div>

                    {/* Badge de niveau */}
                    <div className={`
                      absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold
                      flex items-center justify-center text-white transition-all duration-300
                      ${milestone.completed
                        ? 'bg-green-500 animate-bounce-slow'
                        : milestone.locked
                          ? 'bg-gray-400'
                          : hoveredMilestone === milestone.id
                            ? milestone.color.replace('text-', 'bg-')
                            : 'bg-gray-600'
                      }
                      ${hoveredMilestone === milestone.id ? 'scale-125' : ''}
                    `}>
                      {index + 1}
                    </div>

                    {/* Effet de brillance pour les jalons complétés */}
                    {milestone.completed && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                    )}
                  </div>
                </div>

                {/* Carte du jalon */}
                <div className={`
                  border rounded-xl p-6 text-center transition-all duration-300
                  ${isSelected
                    ? `${milestone.bgColor} ${milestone.borderColor} shadow-lg`
                    : hoveredMilestone === milestone.id && !milestone.locked
                      ? `${milestone.bgColor} ${milestone.borderColor} shadow-md`
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }
                  ${milestone.locked ? 'bg-gray-50' : 'bg-white'}
                `}>
                  {/* Icône et titre */}
                  <div className="mb-4">
                    <Icon className={`
                      h-8 w-8 mx-auto mb-3 transition-colors duration-300
                      ${milestone.locked
                        ? 'text-gray-400'
                        : milestone.completed
                          ? 'text-gray-900'
                          : hoveredMilestone === milestone.id
                            ? milestone.color
                            : 'text-gray-600'
                      }
                    `} />
                    <h4 className={`
                      text-lg font-semibold mb-2 transition-colors duration-300
                      ${milestone.locked
                        ? 'text-gray-500'
                        : hoveredMilestone === milestone.id
                          ? milestone.color
                          : 'text-gray-900'
                      }
                    `}>
                      {milestone.title}
                    </h4>
                    <div className={`
                      inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                      ${milestone.completed
                        ? 'bg-gray-900 text-white'
                        : milestone.locked
                          ? 'bg-gray-100 text-gray-600'
                          : hoveredMilestone === milestone.id
                            ? `${milestone.bgColor} ${milestone.color}`
                            : 'bg-gray-100 text-gray-700'
                      }
                    `}>
                      {milestone.level}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`
                    text-sm mb-4 leading-relaxed
                    ${milestone.locked ? 'text-gray-500' : 'text-gray-600'}
                  `}>
                    {milestone.description}
                  </p>

                  {/* Barre de progression */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progression</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          milestone.completed
                            ? 'bg-gray-900'
                            : milestone.locked
                              ? 'bg-gray-300'
                              : hoveredMilestone === milestone.id
                                ? milestone.color.replace('text-', 'bg-')
                                : 'bg-gray-400'
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                      <div className="font-medium">{milestone.memofichesCount}</div>
                      <div>Mémofiches</div>
                    </div>
                    <div>
                      <div className="font-medium">{milestone.duration}</div>
                      <div>Durée</div>
                    </div>
                  </div>

                  {/* Détails étendus */}
                  {isSelected && (
                    <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
                      <h5 className="font-medium text-gray-900 mb-3">Compétences développées :</h5>
                      <div className="flex flex-wrap gap-2">
                        {milestone.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`
                              px-2 py-1 rounded-full text-xs transition-all duration-300
                              ${milestone.locked
                                ? 'bg-gray-100 text-gray-500'
                                : isSelected || hoveredMilestone === milestone.id
                                  ? `${milestone.bgColor} ${milestone.color}`
                                  : 'bg-gray-100 text-gray-600'
                              }
                            `}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {/* Bouton d'action */}
                      <div className="mt-4">
                        {milestone.completed ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center text-green-600 text-sm">
                              <Trophy className="h-4 w-4 mr-1 animate-bounce" />
                              Niveau complété !
                            </div>
                            <div className="flex justify-center space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        ) : milestone.locked ? (
                          <div className="text-gray-500 text-sm text-center">
                            <Lock className="h-4 w-4 mx-auto mb-1" />
                            Complétez le niveau précédent pour débloquer
                          </div>
                        ) : (
                          <button className={`
                            w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                            bg-gray-900 text-white
                            hover:bg-gray-800 hover:scale-105 active:scale-95
                            flex items-center justify-center space-x-2
                          `}>
                            <span>Continuer le parcours</span>
                            <Target className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">110</div>
            <div className="text-sm text-gray-600">Mémofiches totales</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">1/4</div>
            <div className="text-sm text-gray-600">Niveaux complétés</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">65%</div>
            <div className="text-sm text-gray-600">Progression actuelle</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">16</div>
            <div className="text-sm text-gray-600">Compétences acquises</div>
          </div>
        </div>
      </div>
    </div>
  )
}
