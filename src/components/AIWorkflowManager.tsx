'use client'

import { useState } from 'react'
import { 
  Brain, 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Zap,
  Users,
  FileText,
  Award
} from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'error'
  lastRun: string
  nextRun?: string
  executions: number
  successRate: number
  category: 'generation' | 'assessment' | 'gamification' | 'personalization'
}

const mockWorkflows: Workflow[] = [
  {
    id: 'memofiche-generator',
    name: 'Générateur de Mémofiches',
    description: 'Création automatisée de mémofiches éducatives avec IA',
    status: 'active',
    lastRun: '15 min',
    nextRun: 'Sur demande',
    executions: 47,
    successRate: 96,
    category: 'generation'
  },
  {
    id: 'learner-assessment',
    name: 'Évaluation Niveau Apprenant',
    description: 'Analyse automatique du niveau et recommandations personnalisées',
    status: 'active',
    lastRun: '30 min',
    nextRun: 'Quotidien 08:00',
    executions: 156,
    successRate: 94,
    category: 'assessment'
  },
  {
    id: 'gamification-engine',
    name: 'Moteur de Gamification',
    description: 'Gestion des points, badges et récompenses en temps réel',
    status: 'active',
    lastRun: '5 min',
    nextRun: 'Temps réel',
    executions: 1247,
    successRate: 99,
    category: 'gamification'
  },
  {
    id: 'personalized-path',
    name: 'Parcours Personnalisé',
    description: 'Création de parcours d\'apprentissage adaptatifs',
    status: 'paused',
    lastRun: '2h',
    nextRun: 'En pause',
    executions: 23,
    successRate: 87,
    category: 'personalization'
  }
]

export default function AIWorkflowManager() {
  const [workflows, setWorkflows] = useState(mockWorkflows)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'paused': return <Pause className="h-4 w-4 text-yellow-500" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'generation': return <FileText className="h-5 w-5 text-blue-600" />
      case 'assessment': return <Users className="h-5 w-5 text-green-600" />
      case 'gamification': return <Award className="h-5 w-5 text-purple-600" />
      case 'personalization': return <Brain className="h-5 w-5 text-orange-600" />
      default: return <Zap className="h-5 w-5 text-gray-600" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'generation': return 'Génération'
      case 'assessment': return 'Évaluation'
      case 'gamification': return 'Gamification'
      case 'personalization': return 'Personnalisation'
      default: return 'Autre'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflows IA</h2>
          <p className="text-gray-600">Gestion et monitoring des processus d'intelligence artificielle</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700">
          <Brain className="h-4 w-4" />
          <span>Nouveau Workflow</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Workflows Actifs</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {workflows.filter(w => w.status === 'active').length}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Exécutions Totales</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {workflows.reduce((sum, w) => sum + w.executions, 0)}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Taux de Succès</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">Dernière Activité</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">5 min</p>
        </div>
      </div>

      {/* Workflows List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Workflows Disponibles</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div 
                key={workflow.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {getCategoryIcon(workflow.category)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        {getCategoryLabel(workflow.category)}
                      </span>
                      {getStatusIcon(workflow.status)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Dernière exécution: {workflow.lastRun}</span>
                      <span>•</span>
                      <span>Prochaine: {workflow.nextRun}</span>
                      <span>•</span>
                      <span>{workflow.executions} exécutions</span>
                      <span>•</span>
                      <span>{workflow.successRate}% succès</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleWorkflow(workflow.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      workflow.status === 'active'
                        ? 'text-yellow-600 hover:bg-yellow-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={workflow.status === 'active' ? 'Mettre en pause' : 'Activer'}
                  >
                    {workflow.status === 'active' ? 
                      <Pause className="h-4 w-4" /> : 
                      <Play className="h-4 w-4" />
                    }
                  </button>
                  
                  <button
                    onClick={() => setSelectedWorkflow(workflow)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Configurer"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Details Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Configuration - {selectedWorkflow.name}
              </h3>
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="active">Actif</option>
                  <option value="paused">En pause</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fréquence d'exécution
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="realtime">Temps réel</option>
                  <option value="hourly">Toutes les heures</option>
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="manual">Manuel</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setSelectedWorkflow(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
