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
  Download
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
  youtube_url?: string
  audio_files?: File[]
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

const levels = [
  { id: 'Débutant', label: 'Débutant' },
  { id: 'Intermédiaire', label: 'Intermédiaire' },
  { id: 'Avancé', label: 'Avancé' }
]

const therapeuticAreas = [
  'Gynécologie', 'Urologie', 'Dermatologie', 'Gastro-entérologie', 
  'Cardiologie', 'Pneumologie', 'Endocrinologie', 'Neurologie',
  'Pédiatrie', 'Gériatrie', 'Infectiologie', 'Hématologie',
  'Rhumatologie', 'Ophtalmologie', 'ORL', 'Parasitologie vétérinaire'
]

export default function MemoFicheGenerator() {
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

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

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
      await new Promise(resolve => setTimeout(resolve, 800))

      addToLog('📚 Analyse de la base de connaissances...')
      await new Promise(resolve => setTimeout(resolve, 1200))

      addToLog('🤖 Génération du contenu avec OpenAI GPT-4...')
      await new Promise(resolve => setTimeout(resolve, 2500))

      addToLog('📝 Structuration pédagogique...')
      await new Promise(resolve => setTimeout(resolve, 1000))

      addToLog('🎯 Adaptation au niveau d\'apprentissage...')
      await new Promise(resolve => setTimeout(resolve, 800))

      addToLog('✅ Mémofiche générée avec succès !')

      // Simulation de la réponse générée
      const mockGenerated: GeneratedMemofiche = {
        id: Date.now().toString(),
        title: formData.topic,
        subtitle: formData.therapeutic_area,
        description: `Formation ${formData.targetLevel.toLowerCase()} sur ${formData.topic.toLowerCase()} - Basée sur votre documentation personnalisée`,
        level: formData.targetLevel,
        theme: formData.theme,
        content: {
          memo: [
            {
              id: 'section1',
              type: 'section',
              title: 'Cas comptoir',
              content: `**Situation clinique :**\n\nUn patient se présente au comptoir avec des symptômes liés à ${formData.topic.toLowerCase()}.\n\n**Approche recommandée :**\n- Écoute active du patient\n- Questions ciblées pour le diagnostic\n- Conseil adapté au niveau ${formData.targetLevel.toLowerCase()}\n\n*Contenu basé sur votre base de connaissances fournie.*`
            },
            {
              id: 'section2',
              type: 'section',
              title: 'Questions à poser',
              content: `**Questions essentielles :**\n\n1. Depuis quand ces symptômes sont-ils apparus ?\n2. Y a-t-il des facteurs déclenchants ?\n3. Avez-vous déjà eu ce type de problème ?\n4. Prenez-vous des médicaments actuellement ?\n\n**Questions spécifiques à ${formData.topic} :**\n- [Questions générées selon votre documentation]\n- [Adaptées au niveau ${formData.targetLevel}]`
            },
            {
              id: 'section3',
              type: 'section',
              title: 'Informations sur la pathologie',
              content: `**Définition :**\n${formData.topic} - Pathologie relevant de ${formData.therapeutic_area.toLowerCase()}\n\n**Physiopathologie :**\n[Contenu généré à partir de votre base de connaissances]\n\n**Épidémiologie :**\n[Données adaptées au niveau ${formData.targetLevel}]\n\n**Facteurs de risque :**\n- [Liste générée selon documentation fournie]`
            },
            {
              id: 'section4',
              type: 'section',
              title: 'Critères d\'orientation',
              content: `**Orientation vers le médecin nécessaire si :**\n\n🚨 **Signes d'alarme :**\n- [Signes générés selon votre documentation]\n- [Adaptés au niveau de formation ${formData.targetLevel}]\n\n⚠️ **Situations particulières :**\n- Femme enceinte ou allaitante\n- Enfant de moins de 15 ans\n- Échec d'un traitement précédent\n\n✅ **Conseil officinal possible :**\n- [Critères basés sur votre base de connaissances]`
            }
          ],
          flashcards: [
            {
              id: 'card1',
              question: `Quels sont les symptômes principaux de ${formData.topic.toLowerCase()} ?`,
              answer: 'Réponse générée à partir de votre base de connaissances et adaptée au niveau ' + formData.targetLevel
            },
            {
              id: 'card2',
              question: `Quand orienter vers le médecin pour ${formData.topic.toLowerCase()} ?`,
              answer: 'Critères d\'orientation basés sur votre documentation personnalisée'
            }
          ],
          quiz: [
            {
              id: 'q1',
              question: `Quelle est la prise en charge de première intention pour ${formData.topic.toLowerCase()} ?`,
              options: ['Option A (générée)', 'Option B (générée)', 'Option C (générée)', 'Option D (générée)'],
              correct_answer: 1,
              explanation: 'Explication basée sur votre base de connaissances et adaptée au niveau ' + formData.targetLevel
            }
          ],
          glossary: [
            {
              id: 'term1',
              term: 'Terme spécialisé',
              definition: 'Définition extraite de votre documentation et simplifiée pour le niveau ' + formData.targetLevel
            }
          ]
        }
      }

      setGeneratedMemofiche(mockGenerated)
      setEditedMemofiche(mockGenerated)
      setStep('preview')

    } catch (err) {
      addToLog('❌ Erreur lors de la génération')
      setError('Erreur lors de la génération de la mémofiche. Veuillez réessayer.')
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
      await new Promise(resolve => setTimeout(resolve, 2000))

      const variants = ['Débutant', 'Intermédiaire', 'Avancé']
        .filter(level => level !== formData.targetLevel)
        .map(level => ({
          ...generatedMemofiche,
          id: Date.now().toString() + level,
          level,
          description: `Formation ${level.toLowerCase()} sur ${formData.topic.toLowerCase()} - Variante adaptée`,
          content: {
            ...generatedMemofiche.content,
            memo: generatedMemofiche.content.memo.map((section: any) => ({
              ...section,
              content: section.content.replace(formData.targetLevel, level)
            }))
          }
        }))

      setGeneratedMemofiche(prev => prev ? { ...prev, variants } : null)
      addToLog('✅ Variantes générées avec succès !')

    } catch (err) {
      addToLog('❌ Erreur lors de la génération des variantes')
    } finally {
      setIsGeneratingVariants(false)
    }
  }

  const saveMemofiche = async () => {
    if (!editedMemofiche) return

    addToLog('💾 Sauvegarde de la mémofiche...')
    // Ici on ferait l'appel pour sauvegarder la mémofiche
    await new Promise(resolve => setTimeout(resolve, 1000))
    addToLog('✅ Mémofiche sauvegardée avec succès !')

    // Retour à l'état initial
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
  }

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (editedMemofiche) {
      setEditedMemofiche(prev => prev ? { ...prev, audio_files: files } : null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Brain className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Générateur de Mémofiches IA</h2>
          <p className="text-gray-600">Création automatisée de contenu éducatif avec intelligence artificielle</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire de génération */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span>Paramètres de Génération</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sujet de la mémofiche *
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="Ex: Candidose vulvo-vaginale, Cystite aiguë..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thème
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {themes.map(theme => (
                    <option key={theme.id} value={theme.id}>{theme.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sphère thérapeutique
              </label>
              <select
                value={formData.therapeutic_area}
                onChange={(e) => setFormData(prev => ({ ...prev, therapeutic_area: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {therapeuticAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contexte additionnel (optionnel)
              </label>
              <textarea
                value={formData.additional_context}
                onChange={(e) => setFormData(prev => ({ ...prev, additional_context: e.target.value }))}
                placeholder="Informations spécifiques, cas particuliers, focus souhaité..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={generateMemofiche}
              disabled={isGenerating}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Générer la Mémofiche</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Log de génération et résultat */}
        <div className="space-y-6">
          {/* Log en temps réel */}
          {(isGenerating || generationLog.length > 0) && (
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              <h4 className="text-white font-semibold mb-2">Log de génération</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {generationLog.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
                {isGenerating && (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>En cours...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Résultat généré */}
          {generatedMemofiche && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Mémofiche Générée</span>
                </h4>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {generatedMemofiche.level}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900">{generatedMemofiche.title}</h5>
                  <p className="text-sm text-gray-600">{generatedMemofiche.subtitle}</p>
                </div>
                
                <p className="text-sm text-gray-700">{generatedMemofiche.description}</p>
                
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Sections: {generatedMemofiche.content.memo.length}</span>
                  <span>•</span>
                  <span>Flashcards: {generatedMemofiche.content.flashcards.length}</span>
                  <span>•</span>
                  <span>Quiz: {generatedMemofiche.content.quiz.length}</span>
                </div>

                <div className="flex space-x-3 pt-3">
                  <button
                    onClick={publishMemofiche}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Publier</span>
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>Prévisualiser</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
