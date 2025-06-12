'use client'

import { useState, useRef } from 'react'
import { 
  Brain, 
  FileText, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Send,
  Eye,
  Edit,
  Save,
  Trash2,
  Upload,
  Link,
  Play,
  Volume2,
  Copy,
  RefreshCw,
  Download,
  ArrowLeft,
  Settings,
  Zap
} from 'lucide-react'

interface GenerationRequest {
  topic: string
  knowledgeBase: string
  targetLevel: string
  theme: string
  therapeutic_area: string
  language: string
}

interface GeneratedMemofiche {
  id: string
  title: string
  subtitle: string
  description: string
  content: any
  level: string
  theme: string
  image_url?: string
  youtube_url?: string
  audio_url?: string
  kahoot_url?: string
  variants?: GeneratedMemofiche[]
}

const themes = [
  { id: 'maladies-courantes', label: 'Maladies courantes' },
  { id: 'ordonnances', label: 'Ordonnances' },
  { id: 'micronutrition', label: 'Micronutrition' },
  { id: 'dermo-cosmetique', label: 'Dermo-cosmétique' },
  { id: 'pharmacie-veterinaire', label: 'Pharmacie vétérinaire' },
  { id: 'dispositifs', label: 'Dispositifs' },
  { id: 'pharmacologie', label: 'Pharmacologie' },
  { id: 'communication', label: 'Communication' }
]

const levels = ['Débutant', 'Intermédiaire', 'Avancé']
const therapeuticAreas = [
  'Gynécologie', 'Urologie', 'Dermatologie', 'Gastro-entérologie', 
  'Cardiologie', 'Pneumologie', 'Endocrinologie', 'Neurologie',
  'Pédiatrie', 'Gériatrie', 'Infectiologie', 'Hématologie'
]

export default function MemoFicheGeneratorNew() {
  const [step, setStep] = useState<'input' | 'generating' | 'preview' | 'edit'>('input')
  const [formData, setFormData] = useState<GenerationRequest>({
    topic: '',
    knowledgeBase: '',
    targetLevel: 'Débutant',
    theme: 'maladies-courantes',
    therapeutic_area: 'Gynécologie',
    language: 'Français'
  })

  const [generatedMemofiche, setGeneratedMemofiche] = useState<GeneratedMemofiche | null>(null)
  const [editedMemofiche, setEditedMemofiche] = useState<GeneratedMemofiche | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generationLog, setGenerationLog] = useState<string[]>([])
  const [isGeneratingVariants, setIsGeneratingVariants] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<'together'>('together')
  const [isSaving, setIsSaving] = useState(false)



  const addToLog = (message: string) => {
    setGenerationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const generateMemofiche = async () => {
    if (!formData.topic.trim()) {
      setError('Veuillez saisir un sujet pour la mémofiche')
      return
    }

    if (!formData.knowledgeBase.trim()) {
      setError('Veuillez fournir une base de connaissances')
      return
    }

    setStep('generating')
    setIsGenerating(true)
    setError(null)
    setGenerationLog([])

    try {
      addToLog('🚀 Initialisation de la génération...')

      addToLog(`🤖 Connexion à Together AI Llama 3.1...`)

      // Appel à l'API réelle
      const response = await fetch(`/api/generate/${selectedProvider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          knowledgeBase: formData.knowledgeBase,
          targetLevel: formData.targetLevel,
          theme: formData.theme,
          therapeutic_area: formData.therapeutic_area
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la génération')
      }

      addToLog('📚 Analyse de la base de connaissances...')

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la génération')
      }

      addToLog('📝 Structuration pédagogique...')
      addToLog('🎯 Adaptation au niveau d\'apprentissage...')
      addToLog(`✅ Mémofiche générée avec succès ! (${result.provider})`)

      if (result.tokens_used) {
        addToLog(`📊 Tokens utilisés: ${result.tokens_used}`)
      }

      const generatedData = result.data
      setGeneratedMemofiche(generatedData)
      setEditedMemofiche(generatedData)
      setStep('preview')

    } catch (err) {
      console.error('Generation error:', err)
      addToLog('❌ Erreur lors de la génération')
      setError(err instanceof Error ? err.message : 'Erreur lors de la génération de la mémofiche. Veuillez réessayer.')
      setStep('input')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateVariants = async () => {
    if (!generatedMemofiche) return

    setIsGeneratingVariants(true)
    addToLog('🔄 Génération des variantes par niveau...')

    try {
      const variantPromises = levels
        .filter(level => level !== formData.targetLevel)
        .map(async (level) => {
          const response = await fetch(`/api/generate/${selectedProvider}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              topic: formData.topic,
              knowledgeBase: formData.knowledgeBase,
              targetLevel: level,
              theme: formData.theme,
              therapeutic_area: formData.therapeutic_area
            })
          })

          if (!response.ok) {
            throw new Error(`Erreur génération variante ${level}`)
          }

          const result = await response.json()
          return result.data
        })

      const variants = await Promise.all(variantPromises)

      setGeneratedMemofiche(prev => prev ? { ...prev, variants } : null)
      addToLog('✅ Variantes générées avec succès !')

    } catch (err) {
      console.error('Variants generation error:', err)
      addToLog('❌ Erreur lors de la génération des variantes')
    } finally {
      setIsGeneratingVariants(false)
    }
  }

  const saveMemofiche = async () => {
    if (!editedMemofiche) return

    setIsSaving(true)
    addToLog('💾 Sauvegarde de la mémofiche...')

    try {
      // Sauvegarde de la mémofiche
      const memoficheToSave = {
        ...editedMemofiche
      }

      const response = await fetch('/api/memofiches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memoficheToSave)
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error || errorData.details || 'Erreur lors de la sauvegarde'
        throw new Error(errorMessage)
      }

      const result = await response.json()
      addToLog('✅ Mémofiche sauvegardée avec succès !')

      // Retour à l'état initial après un délai
      setTimeout(() => {
        setStep('input')
        setGeneratedMemofiche(null)
        setEditedMemofiche(null)
        setFormData({
          topic: '',
          knowledgeBase: '',
          targetLevel: 'Débutant',
          theme: 'maladies-courantes',
          therapeutic_area: 'Gynécologie',
          language: 'Français'
        })
      }, 2000)

    } catch (err) {
      console.error('Save error:', err)
      addToLog('❌ Erreur lors de la sauvegarde')
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }



  // Interface de saisie inspirée de StudyRaid
  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Créer une Mémofiche avec l'IA</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Générez du contenu éducatif personnalisé à partir de votre base de connaissances
            </p>
          </div>

          {/* Formulaire principal */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              {/* Sujet */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Que souhaitez-vous apprendre ?
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="Ex: Candidose vulvo-vaginale, Hypertension artérielle, Analyse d'ordonnance..."
                  className="w-full text-lg border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Base de connaissances */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Base de connaissances (Document source)
                </label>
                <textarea
                  value={formData.knowledgeBase}
                  onChange={(e) => setFormData(prev => ({ ...prev, knowledgeBase: e.target.value }))}
                  placeholder="Collez ici votre documentation, protocoles, guidelines, ou toute source de connaissances que l'IA doit utiliser pour générer la mémofiche..."
                  rows={8}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Plus votre documentation est détaillée, plus la mémofiche sera précise et adaptée
                </p>
              </div>

              {/* Options avancées */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau d'apprentissage
                  </label>
                  <select
                    value={formData.targetLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetLevel: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thème
                  </label>
                  <select
                    value={formData.theme}
                    onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    {themes.map(theme => (
                      <option key={theme.id} value={theme.id}>{theme.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sphère thérapeutique
                  </label>
                  <select
                    value={formData.therapeutic_area}
                    onChange={(e) => setFormData(prev => ({ ...prev, therapeutic_area: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    {therapeuticAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moteur IA
                  </label>
                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value as 'together')}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="together">🔥 Together AI Llama 3.1 ($25 Gratuit)</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Bouton de génération */}
              <button
                onClick={generateMemofiche}
                disabled={!formData.topic.trim() || !formData.knowledgeBase.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <Sparkles className="h-6 w-6" />
                <span>Générer ma Mémofiche</span>
                <Zap className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Exemples */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">💡 Exemples de sujets :</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Candidose vulvo-vaginale', 'Cystite aiguë', 'Conseil en micronutrition', 'Analyse d\'ordonnance'].map((example) => (
                <button
                  key={example}
                  onClick={() => setFormData(prev => ({ ...prev, topic: example }))}
                  className="px-3 py-1 text-xs bg-white text-gray-600 rounded-full hover:bg-gray-50 border border-gray-200 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Interface de génération
  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Génération en cours...</h2>
              <p className="text-gray-600">L'IA analyse votre documentation et crée votre mémofiche personnalisée</p>
            </div>

            {/* Log de génération */}
            <div className="bg-gray-900 rounded-xl p-4 text-left">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {generationLog.map((log, index) => (
                  <div key={index} className="text-green-400 font-mono text-sm">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Interface de prévisualisation et édition
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setStep('input')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour</span>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{editedMemofiche?.title}</h1>
                <p className="text-sm text-gray-600">{editedMemofiche?.subtitle} • {editedMemofiche?.level}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {step === 'preview' && (
                <button
                  onClick={() => setStep('edit')}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4" />
                  <span>Éditer</span>
                </button>
              )}
              
              <button
                onClick={saveMemofiche}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sauvegarde...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Sauvegarder</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenu de la mémofiche</h3>
              
              {editedMemofiche?.content.memo.map((section: any, index: number) => (
                <div key={section.id} className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {section.title}
                  </h4>

                  {/* Contenu de la section */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu
                    </label>
                    {step === 'edit' ? (
                      <textarea
                        value={section.content}
                        onChange={(e) => {
                          if (editedMemofiche) {
                            const updatedMemo = [...editedMemofiche.content.memo]
                            updatedMemo[index] = { ...section, content: e.target.value }
                            setEditedMemofiche({
                              ...editedMemofiche,
                              content: { ...editedMemofiche.content, memo: updatedMemo }
                            })
                          }
                        }}
                        rows={6}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="prose prose-sm max-w-none bg-white p-3 rounded border">
                        {section.content.split('\n').map((line: string, i: number) => (
                          <p key={i} className="mb-2">{line}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Champs multimédia pour chaque section */}
                  {step === 'edit' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-300">
                      {/* Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Upload className="h-3 w-3 inline mr-1" />
                          Image (Google Drive)
                        </label>
                        <input
                          type="url"
                          value={section.image_url || ''}
                          onChange={(e) => {
                            if (editedMemofiche) {
                              const updatedMemo = [...editedMemofiche.content.memo]
                              updatedMemo[index] = { ...section, image_url: e.target.value }
                              setEditedMemofiche({
                                ...editedMemofiche,
                                content: { ...editedMemofiche.content, memo: updatedMemo }
                              })
                            }
                          }}
                          placeholder="https://drive.google.com/..."
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Vidéo YouTube */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Play className="h-3 w-3 inline mr-1" />
                          Vidéo (YouTube)
                        </label>
                        <input
                          type="url"
                          value={section.youtube_url || ''}
                          onChange={(e) => {
                            if (editedMemofiche) {
                              const updatedMemo = [...editedMemofiche.content.memo]
                              updatedMemo[index] = { ...section, youtube_url: e.target.value }
                              setEditedMemofiche({
                                ...editedMemofiche,
                                content: { ...editedMemofiche.content, memo: updatedMemo }
                              })
                            }
                          }}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Audio Google Drive */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Volume2 className="h-3 w-3 inline mr-1" />
                          Audio (Google Drive)
                        </label>
                        <input
                          type="url"
                          value={section.audio_url || ''}
                          onChange={(e) => {
                            if (editedMemofiche) {
                              const updatedMemo = [...editedMemofiche.content.memo]
                              updatedMemo[index] = { ...section, audio_url: e.target.value }
                              setEditedMemofiche({
                                ...editedMemofiche,
                                content: { ...editedMemofiche.content, memo: updatedMemo }
                              })
                            }
                          }}
                          placeholder="https://drive.google.com/..."
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Affichage des médias en mode preview */}
                  {step === 'preview' && (section.image_url || section.youtube_url || section.audio_url) && (
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="flex flex-wrap gap-2">
                        {section.image_url && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <Upload className="h-3 w-3 mr-1" />
                            Image
                          </span>
                        )}
                        {section.youtube_url && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                            <Play className="h-3 w-3 mr-1" />
                            Vidéo
                          </span>
                        )}
                        {section.audio_url && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            <Volume2 className="h-3 w-3 mr-1" />
                            Audio
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={generateVariants}
                  disabled={isGeneratingVariants}
                  className="w-full flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isGeneratingVariants ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span>Générer variantes par niveau</span>
                </button>

                <button className="w-full flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <Eye className="h-4 w-4" />
                  <span>Prévisualiser apprenant</span>
                </button>

                <button className="w-full flex items-center space-x-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                  <span>Supprimer</span>
                </button>
              </div>
            </div>

            {/* Médias */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Médias</h3>
              
              <div className="space-y-4">
                {/* Image de la mémofiche */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="h-4 w-4 inline mr-2" />
                    Image de la mémofiche (Google Drive)
                  </label>
                  <input
                    type="url"
                    value={editedMemofiche?.image_url || ''}
                    onChange={(e) => setEditedMemofiche(prev => prev ? { ...prev, image_url: e.target.value } : null)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lien de partage Google Drive de l'image principale de la mémofiche
                  </p>
                </div>

                {/* YouTube */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Play className="h-4 w-4 inline mr-2" />
                    Lien vidéo YouTube
                  </label>
                  <input
                    type="url"
                    value={editedMemofiche?.youtube_url || ''}
                    onChange={(e) => setEditedMemofiche(prev => prev ? { ...prev, youtube_url: e.target.value } : null)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Audio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Volume2 className="h-4 w-4 inline mr-2" />
                    Audio principal (Google Drive)
                  </label>
                  <input
                    type="url"
                    value={editedMemofiche?.audio_url || ''}
                    onChange={(e) => setEditedMemofiche(prev => prev ? { ...prev, audio_url: e.target.value } : null)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lien de partage Google Drive du fichier audio principal (MP3, podcast)
                  </p>
                </div>

                {/* Kahoot */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lien Quiz Kahoot
                  </label>
                  <input
                    type="url"
                    value={editedMemofiche?.kahoot_url || ''}
                    onChange={(e) => setEditedMemofiche(prev => prev ? { ...prev, kahoot_url: e.target.value } : null)}
                    placeholder="https://kahoot.it/..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Variantes générées */}
            {generatedMemofiche?.variants && generatedMemofiche.variants.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Variantes par niveau</h3>
                <div className="space-y-2">
                  {generatedMemofiche.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="font-medium">{variant.level}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Voir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Log */}
            {generationLog.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Log de génération</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {generationLog.slice(-5).map((log, index) => (
                    <div key={index} className="text-green-400 font-mono text-xs">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
