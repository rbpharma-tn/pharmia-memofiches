'use client'

import { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  TrendingUp, 
  Award, 
  Clock,
  BookOpen,
  Brain,
  Target,
  BarChart3,
  Eye,
  Settings
} from 'lucide-react'

interface Learner {
  id: string
  name: string
  email: string
  role: string
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  totalPoints: number
  completedMemofiches: number
  averageScore: number
  lastActivity: string
  streak: number
  badges: string[]
  joinedAt: string
}

const mockLearners: Learner[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@pharmacie.fr',
    role: 'Pharmacien titulaire',
    level: 'Avancé',
    totalPoints: 3450,
    completedMemofiches: 18,
    averageScore: 92,
    lastActivity: '2h',
    streak: 12,
    badges: ['Perfectionniste', 'Expert Gynécologie', 'Streak Warrior'],
    joinedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Pierre Martin',
    email: 'pierre.martin@officine.fr',
    role: 'Préparateur en pharmacie',
    level: 'Intermédiaire',
    totalPoints: 1890,
    completedMemofiches: 12,
    averageScore: 78,
    lastActivity: '1j',
    streak: 5,
    badges: ['Explorer', 'Quiz Master'],
    joinedAt: '2024-02-03'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@pharma.fr',
    role: 'Étudiant en pharmacie',
    level: 'Débutant',
    totalPoints: 650,
    completedMemofiches: 6,
    averageScore: 85,
    lastActivity: '3h',
    streak: 3,
    badges: ['Premiers Pas', 'Apprenant Dévoué'],
    joinedAt: '2024-03-10'
  },
  {
    id: '4',
    name: 'Thomas Durand',
    email: 'thomas.durand@officine.fr',
    role: 'Pharmacien adjoint',
    level: 'Intermédiaire',
    totalPoints: 2340,
    completedMemofiches: 15,
    averageScore: 88,
    lastActivity: '5h',
    streak: 8,
    badges: ['Dedicated Learner', 'Spécialiste Ordonnances'],
    joinedAt: '2024-01-28'
  }
]

export default function LearnerManager() {
  const [learners, setLearners] = useState(mockLearners)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null)

  const filteredLearners = learners.filter(learner => {
    const matchesSearch = learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || learner.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800'
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800'
      case 'Avancé': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const assessLearner = async (learnerId: string) => {
    // Simulation d'appel à l'API d'évaluation
    console.log(`Évaluation de l'apprenant ${learnerId}`)
    // Ici on appellerait le workflow n8n d'évaluation
  }

  const generatePersonalizedPath = async (learnerId: string) => {
    // Simulation de génération de parcours personnalisé
    console.log(`Génération de parcours pour l'apprenant ${learnerId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Apprenants</h2>
          <p className="text-gray-600">Suivi et analyse des profils d'apprentissage</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700">
            <Brain className="h-4 w-4" />
            <span>Évaluation Globale</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Total Apprenants</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{learners.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Score Moyen</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {Math.round(learners.reduce((sum, l) => sum + l.averageScore, 0) / learners.length)}%
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Mémofiches Complétées</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {learners.reduce((sum, l) => sum + l.completedMemofiches, 0)}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-600">Badges Débloqués</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {learners.reduce((sum, l) => sum + l.badges.length, 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un apprenant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Learners Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Apprenant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Niveau</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Progression</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Activité</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLearners.map((learner) => (
                <tr key={learner.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{learner.name}</div>
                      <div className="text-sm text-gray-600">{learner.email}</div>
                      <div className="text-xs text-gray-500">{learner.role}</div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(learner.level)}`}>
                      {learner.level}
                    </span>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <BookOpen className="h-3 w-3 text-gray-400" />
                        <span>{learner.completedMemofiches} mémofiches</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Award className="h-3 w-3 text-gray-400" />
                        <span>{learner.totalPoints} points</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <BarChart3 className="h-3 w-3 text-gray-400" />
                        <span>{learner.averageScore}% moyenne</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Target className="h-3 w-3 text-gray-400" />
                        <span>{learner.streak} jours de suite</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>Il y a {learner.lastActivity}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedLearner(learner)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Voir le profil"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => assessLearner(learner.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Évaluer le niveau"
                      >
                        <Brain className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => generatePersonalizedPath(learner.id)}
                        className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
                        title="Parcours personnalisé"
                      >
                        <Target className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Learner Detail Modal */}
      {selectedLearner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Profil de {selectedLearner.name}
              </h3>
              <button
                onClick={() => setSelectedLearner(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informations</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Email:</span> {selectedLearner.email}</div>
                    <div><span className="text-gray-600">Rôle:</span> {selectedLearner.role}</div>
                    <div><span className="text-gray-600">Inscrit le:</span> {new Date(selectedLearner.joinedAt).toLocaleDateString('fr-FR')}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Niveau:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getLevelColor(selectedLearner.level)}`}>
                        {selectedLearner.level}
                      </span>
                    </div>
                    <div><span className="text-gray-600">Score moyen:</span> {selectedLearner.averageScore}%</div>
                    <div><span className="text-gray-600">Streak actuel:</span> {selectedLearner.streak} jours</div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Badges obtenus ({selectedLearner.badges.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLearner.badges.map((badge, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      🏆 {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={() => assessLearner(selectedLearner.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Brain className="h-4 w-4" />
                  <span>Réévaluer le niveau</span>
                </button>
                <button
                  onClick={() => generatePersonalizedPath(selectedLearner.id)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <Target className="h-4 w-4" />
                  <span>Parcours personnalisé</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
