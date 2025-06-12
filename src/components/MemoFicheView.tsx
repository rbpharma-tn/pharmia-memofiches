'use client'

import { useState } from 'react'
import { Home, FileText, Zap, HelpCircle, Book, Mic, Video, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Memofiche } from '@/types'
import FlashcardsViewer from './FlashcardsViewer'
import QuizViewer from './QuizViewer'
import GlossaryViewer from './GlossaryViewer'
import ResourcesViewer from './ResourcesViewer'

interface MemoFicheViewProps {
  memofiche: Memofiche
}

const tabs = [
  {
    id: 'memo',
    label: 'Memo',
    icon: FileText,
    active: true
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    icon: Zap,
    active: false
  },
  {
    id: 'quiz',
    label: 'Quiz',
    icon: HelpCircle,
    active: false
  },
  {
    id: 'glossaire',
    label: 'Glossaire',
    icon: Book,
    active: false
  },
  {
    id: 'ressources',
    label: 'Ressources',
    icon: ExternalLink,
    active: false
  },
  {
    id: 'audio',
    label: '',
    icon: Mic,
    active: false
  },
  {
    id: 'video',
    label: '',
    icon: Video,
    active: false
  }
]

const memoSections = [
  {
    id: 'cas-comptoir',
    title: 'Cas comptoir',
    content: `Une femme de 28 ans se présente au comptoir avec des symptômes de brûlures et démangeaisons vulvaires, accompagnées de pertes blanches épaisses. Elle vous demande conseil pour soulager ses symptômes.

**Symptômes rapportés :**
- Démangeaisons vulvaires intenses
- Brûlures lors de la miction
- Pertes blanches épaisses, "en fromage blanc"
- Inconfort lors des rapports sexuels

**Questions à poser :**
- Depuis quand ces symptômes sont-ils apparus ?
- Y a-t-il eu des facteurs déclenchants récents ?
- Avez-vous déjà eu ce type de symptômes ?`
  },
  {
    id: 'questions-poser',
    title: 'Questions à poser',
    content: `**Questions essentielles pour le diagnostic différentiel :**

1. **Antécédents :**
   - Avez-vous déjà eu une candidose ?
   - Prenez-vous des antibiotiques actuellement ?
   - Êtes-vous enceinte ou allaitez-vous ?

2. **Symptômes associés :**
   - Y a-t-il des pertes malodorantes ?
   - Avez-vous de la fièvre ?
   - Y a-t-il des douleurs pelviennes ?

3. **Facteurs de risque :**
   - Diabète connu ?
   - Stress récent ?
   - Changement de contraception ?`
  },
  {
    id: 'informations-maladie',
    title: 'Informations sur la maladie ou les symptômes',
    content: `**La candidose vulvo-vaginale**

La candidose vulvo-vaginale est une infection fongique très fréquente causée principalement par *Candida albicans*.

**Physiopathologie :**
- Déséquilibre de la flore vaginale normale
- Prolifération excessive du champignon Candida
- pH vaginal perturbé (normalement acide)

**Facteurs favorisants :**
- Antibiothérapie récente
- Grossesse
- Diabète
- Immunodépression
- Stress
- Contraception hormonale
- Vêtements serrés et synthétiques

**Diagnostic :**
- Clinique dans la majorité des cas
- Prélèvement vaginal si récidives`
  },
  {
    id: 'frequence-femme',
    title: 'Pourquoi la cystite est-elle plus fréquente chez la femme ?',
    content: `**Facteurs anatomiques et physiologiques :**

1. **Anatomie féminine :**
   - Urètre plus court (3-4 cm vs 15-20 cm chez l'homme)
   - Proximité entre l'urètre et l'anus
   - Méat urétral proche de l'entrée vaginale

2. **Facteurs hormonaux :**
   - Variations hormonales du cycle menstruel
   - Grossesse (compression vésicale, stase urinaire)
   - Ménopause (diminution des œstrogènes)

3. **Facteurs comportementaux :**
   - Activité sexuelle
   - Hygiène intime inadéquate
   - Retenue urinaire prolongée
   - Utilisation de spermicides

4. **Facteurs mécaniques :**
   - Vidange vésicale incomplète
   - Reflux vésico-urétéral`
  },
  {
    id: 'orientation-medecin',
    title: 'Quand orienter vers le médecin ?',
    content: `**Orientation immédiate nécessaire :**

1. **Signes de gravité :**
   - Fièvre > 38°C
   - Douleurs lombaires (pyélonéphrite)
   - Vomissements
   - Altération de l'état général

2. **Populations à risque :**
   - Femme enceinte
   - Diabétique
   - Immunodéprimée
   - Enfant < 15 ans
   - Homme (cystite compliquée)

3. **Échec du traitement :**
   - Persistance des symptômes après 48h de traitement
   - Récidive dans les 15 jours
   - Plus de 4 épisodes par an

4. **Symptômes atypiques :**
   - Hématurie macroscopique
   - Douleurs pelviennes importantes
   - Pertes vaginales associées`
  }
]

export default function MemoFicheView({ memofiche }: MemoFicheViewProps) {
  const [activeTab, setActiveTab] = useState('memo')
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header centré */}
      <div className="text-center py-12 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-end mb-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors border border-gray-200 rounded-lg px-4 py-2"
            >
              <Home className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
          </div>
          
          <h1 className="text-2xl text-gray-600 mb-2">
            Mémo fiche conseil
          </h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            {memofiche.title}
          </h2>

          {/* Onglets horizontaux */}
          <div className="flex justify-center space-x-1 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label && <span>{tab.label}</span>}
                </button>
              )
            })}
          </div>

          {/* Barre de progression */}
          <div className="flex justify-end">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Progression: 0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'memo' && (
          <div className="space-y-4">
            {memofiche.content?.memo && memofiche.content.memo.length > 0 ? (
              memofiche.content.memo.map((section: any) => {
                const isExpanded = expandedSections.includes(section.id)

                return (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {section.title}
                      </h3>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="prose prose-gray max-w-none">
                          <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: section.content
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                .replace(/\n/g, '<br>')
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-16">
                <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun contenu disponible
                </h3>
                <p className="text-gray-600">
                  Le contenu de cette mémofiche n'est pas encore disponible.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsViewer flashcards={memofiche.content?.flashcards || []} />
        )}

        {activeTab === 'quiz' && (
          <QuizViewer questions={memofiche.content?.quiz || []} />
        )}

        {activeTab === 'glossaire' && (
          <GlossaryViewer
            terms={memofiche.content?.glossary || []}
            memoContent={memofiche.content?.memo || []}
          />
        )}

        {activeTab === 'ressources' && (
          <ResourcesViewer memofiche={memofiche} />
        )}

        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            {memofiche.content?.flashcards && memofiche.content.flashcards.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {memofiche.content.flashcards.map((card: any, index: number) => (
                  <div key={card.id || index} className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Question :</h4>
                      <p className="text-gray-700">{card.question}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Réponse :</h4>
                      <p className="text-gray-700">{card.answer}</p>
                    </div>
                    {card.difficulty && (
                      <div className="mt-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          card.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {card.difficulty === 'easy' ? 'Facile' :
                           card.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune flashcard disponible
                </h3>
                <p className="text-gray-600">
                  Les flashcards pour cette mémofiche ne sont pas encore disponibles.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-8">
            {memofiche.content?.quiz && memofiche.content.quiz.length > 0 ? (
              memofiche.content.quiz.map((question: any, index: number) => (
                <div key={question.id || index} className="border border-gray-200 rounded-lg p-6 bg-white">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Question {index + 1}: {question.question}
                  </h4>
                  <div className="space-y-2 mb-4">
                    {question.options?.map((option: string, optIndex: number) => (
                      <div key={optIndex} className={`p-3 rounded-lg border ${
                        optIndex === question.correct_answer
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        {option}
                        {optIndex === question.correct_answer && (
                          <span className="ml-2 text-green-600 font-medium">✓ Bonne réponse</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {question.explanation && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Explication :</h5>
                      <p className="text-gray-700">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun quiz disponible
                </h3>
                <p className="text-gray-600">
                  Le quiz pour cette mémofiche n'est pas encore disponible.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'glossaire' && (
          <div className="space-y-4">
            {memofiche.content?.glossary && memofiche.content.glossary.length > 0 ? (
              memofiche.content.glossary.map((term: any, index: number) => (
                <div key={term.id || index} className="border border-gray-200 rounded-lg p-6 bg-white">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {term.term}
                    {term.category && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        {term.category}
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-700">{term.definition}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun terme de glossaire
                </h3>
                <p className="text-gray-600">
                  Le glossaire pour cette mémofiche n'est pas encore disponible.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab !== 'memo' && activeTab !== 'flashcards' && activeTab !== 'quiz' && activeTab !== 'glossaire' && activeTab !== 'ressources' && (
          <div className="text-center py-16">
            <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl font-bold">?</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Contenu en cours de développement
            </h3>
            <p className="text-gray-600">
              Cette section sera bientôt disponible.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
