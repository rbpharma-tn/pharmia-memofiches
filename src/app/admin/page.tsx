'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  FileText,
  Users,
  TrendingUp,
  Settings,
  Zap,
  Award,
  BookOpen,
  BarChart3,
  Plus,
  Play,
  Pause
} from 'lucide-react'
import AIWorkflowManager from '@/components/AIWorkflowManager'
import MemoFicheGeneratorNew from '@/components/MemoFicheGeneratorNew'
import LearnerManager from '@/components/LearnerManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalLearners: 1247,
    activeMemofiches: 24,
    completionRate: 78,
    avgScore: 85
  }

  const recentActivity = [
    { id: 1, user: 'Marie Dubois', action: 'Terminé', memofiche: 'Candidose vulvo-vaginale', time: '2h' },
    { id: 2, user: 'Pierre Martin', action: 'Commencé', memofiche: 'Cystite aiguë', time: '3h' },
    { id: 3, user: 'Sophie Laurent', action: 'Badge obtenu', memofiche: 'Expert Gynécologie', time: '5h' },
    { id: 4, user: 'Thomas Durand', action: 'Niveau up', memofiche: 'Débutant → Intermédiaire', time: '1j' }
  ]

  const aiWorkflows = [
    { id: 1, name: 'Génération Mémofiches', status: 'active', lastRun: '15 min' },
    { id: 2, name: 'Évaluation Niveau', status: 'active', lastRun: '30 min' },
    { id: 3, name: 'Parcours Personnalisé', status: 'paused', lastRun: '2h' },
    { id: 4, name: 'Gamification Engine', status: 'active', lastRun: '5 min' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-gray-900" />
                <span className="text-xl font-semibold text-gray-900">PharmIA Admin</span>
              </Link>
            </div>
            
            <nav className="flex items-center space-x-6">
              <Link href="/memofiches" className="text-gray-600 hover:text-gray-900">
                Voir le site
              </Link>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'ai-workflows', label: 'Workflows IA', icon: Brain },
              { id: 'memofiches', label: 'Mémofiches', icon: FileText },
              { id: 'learners', label: 'Apprenants', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Paramètres', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Apprenants Total</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalLearners}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Mémofiches Actives</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeMemofiches}</p>
                  </div>
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Taux de Completion</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Score Moyen</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.avgScore}%</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user} - {activity.action}
                          </p>
                          <p className="text-xs text-gray-600">{activity.memofiche}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-workflows' && (
          <AIWorkflowManager />
        )}

        {activeTab === 'memofiches' && (
          <MemoFicheGeneratorNew />
        )}

        {activeTab === 'learners' && (
          <LearnerManager />
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-16">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analytics Avancées
            </h3>
            <p className="text-gray-600">
              Tableaux de bord et métriques d'apprentissage
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-16">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Paramètres Système
            </h3>
            <p className="text-gray-600">
              Configuration de l'IA et des workflows
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
