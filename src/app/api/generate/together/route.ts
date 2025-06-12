import { NextRequest, NextResponse } from 'next/server'

// Fonction pour réparer un JSON malformé
function repairJSON(jsonText: string): string {
  console.log('🔧 Attempting to repair JSON...')

  // Supprimer les caractères de contrôle
  let repaired = jsonText.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')

  // Réparer les virgules manquantes avant les accolades fermantes
  repaired = repaired.replace(/([^,\s])\s*}/g, '$1}')

  // Réparer les virgules manquantes avant les crochets fermants
  repaired = repaired.replace(/([^,\s])\s*]/g, '$1]')

  // Supprimer les virgules en trop avant les accolades fermantes
  repaired = repaired.replace(/,\s*}/g, '}')

  // Supprimer les virgules en trop avant les crochets fermants
  repaired = repaired.replace(/,\s*]/g, ']')

  // Réparer les guillemets manquants pour les clés
  repaired = repaired.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')

  // Échapper les guillemets dans les valeurs de chaîne
  repaired = repaired.replace(/"([^"]*)"([^"]*)"([^"]*)":/g, '"$1\\"$2\\"$3":')

  console.log('🔧 JSON repair completed')
  return repaired
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, knowledgeBase, targetLevel, theme, therapeutic_area } = body

    // Validation
    if (!topic || !knowledgeBase) {
      return NextResponse.json(
        { error: 'Topic et base de connaissances requis' },
        { status: 400 }
      )
    }

    const apiKey = process.env.TOGETHER_API_KEY

    // Mode démo si pas de clé API
    if (!apiKey || apiKey === 'your_together_api_key') {
      console.log('Mode démo Together AI - Pas de clé API configurée')
      return NextResponse.json({
        success: true,
        data: generateDemoContent(topic, knowledgeBase, targetLevel, theme, therapeutic_area),
        provider: "Together AI (Mode Démo)",
        demo_mode: true
      })
    }

    // Prompt système optimisé pour Together AI
    const systemPrompt = `Tu es un expert pharmacien spécialisé dans la création de mémofiches éducatives. Tu dois OBLIGATOIREMENT répondre UNIQUEMENT avec un JSON valide, sans aucun texte explicatif avant ou après.

RÈGLES STRICTES :
- Commence directement par {
- Termine directement par }
- Aucun texte avant ou après le JSON
- JSON valide uniquement

Tes compétences incluent :
- Analyse approfondie des cas cliniques pharmaceutiques
- Adaptation pédagogique selon le niveau (Débutant/Intermédiaire/Avancé)
- Structuration claire et logique du contenu éducatif
- Intégration de bonnes pratiques pharmaceutiques au comptoir`

    const userPrompt = `Crée une mémofiche complète et détaillée sur "${topic}" pour le niveau ${targetLevel} en ${therapeutic_area}.

MISSION CRITIQUE : PRÉSERVER INTÉGRALEMENT la structure et le contenu source.

BASE DE CONNAISSANCES SOURCE (À REPRODUIRE FIDÈLEMENT) :
${knowledgeBase}

RÈGLES DE PRÉSERVATION STRICTES :
1. EXTRAIRE et REPRODUIRE EXACTEMENT chaque section numérotée du document source
2. CONSERVER INTÉGRALEMENT tous les dosages, durées, critères, et références
3. MAINTENIR la structure originale (sections 1, 2, 3, etc.)
4. ENRICHIR uniquement avec des explications complémentaires SANS modifier le contenu source
5. AJOUTER des détails pédagogiques APRÈS avoir reproduit fidèlement le contenu original

MÉTHODE D'EXTRACTION :
- Identifier chaque section numérotée (1., 2., 3., etc.) dans la base de connaissances
- Reproduire le contenu de chaque section SANS modification
- Enrichir avec des explications complémentaires en conservant l'information originale
- Structurer selon le plan original du document

STRUCTURE JSON REQUISE :
{
  "title": "${topic}",
  "subtitle": "${therapeutic_area} - Formation ${targetLevel}",
  "description": "Description claire et engageante de la mémofiche",
  "estimated_duration": "15-25 minutes",
  "learning_objectives": [
    "Objectif d'apprentissage spécifique 1",
    "Objectif d'apprentissage spécifique 2", 
    "Objectif d'apprentissage spécifique 3"
  ],
  "content": {
    "memo": [
      {
        "id": "section_1",
        "title": "Section 1 - [Titre exact de la section 1 du document source]",
        "content": "REPRODUIRE EXACTEMENT le contenu de la section 1 de la base de connaissances, puis enrichir avec explications complémentaires. Conserver tous les détails, dosages, et références originaux.",
        "icon": "user"
      },
      {
        "id": "section_2",
        "title": "Section 2 - [Titre exact de la section 2 du document source]",
        "content": "REPRODUIRE EXACTEMENT le contenu de la section 2 de la base de connaissances, puis enrichir avec explications complémentaires. Conserver tous les détails, dosages, et références originaux.",
        "icon": "help-circle"
      },
      {
        "id": "section_3",
        "title": "Section 3 - [Titre exact de la section 3 du document source]",
        "content": "REPRODUIRE EXACTEMENT le contenu de la section 3 de la base de connaissances, puis enrichir avec explications complémentaires. Conserver tous les détails, dosages, et références originaux.",
        "icon": "book"
      },
      {
        "id": "section_4",
        "title": "Section 4 - [Titre exact de la section 4 du document source]",
        "content": "REPRODUIRE EXACTEMENT le contenu de la section 4 de la base de connaissances, puis enrichir avec explications complémentaires. Conserver tous les détails, dosages, et références originaux.",
        "icon": "arrow-right"
      },
      {
        "id": "section_5",
        "title": "Section 5 - [Titre exact de la section 5 du document source]",
        "content": "REPRODUIRE EXACTEMENT le contenu de la section 5 de la base de connaissances, puis enrichir avec explications complémentaires. Conserver tous les détails, dosages, et références originaux.",
        "icon": "heart"
      },
      {
        "id": "section_6",
        "title": "Section 6 - [Titre exact de la section 6 du document source]",
        "content": "REPRODUIRE EXACTEMENT le contenu de la section 6 de la base de connaissances, puis enrichir avec explications complémentaires. Conserver tous les détails, dosages, et références originaux.",
        "icon": "shield"
      },
      {
        "id": "section_7",
        "title": "Section 7 - [Titre exact de la section 7 du document source]",
        "content": "REPRODUIRE EXACTEMENT le contenu de la section 7 de la base de connaissances, puis enrichir avec explications complémentaires. Conserver tous les détails, dosages, et références originaux.",
        "icon": "book-open"
      }
    ],
    "flashcards": [
      {
        "id": "card1",
        "question": "Question sur les symptômes de ${topic}",
        "answer": "Réponse basée sur les symptômes EXACTS de la base de connaissances",
        "difficulty": "easy"
      },
      {
        "id": "card2",
        "question": "Question sur le traitement de ${topic}",
        "answer": "Réponse avec dosages et durées PRÉCIS de la source",
        "difficulty": "medium"
      },
      {
        "id": "card3",
        "question": "Question sur les règles d'hygiène de vie",
        "answer": "Réponse avec recommandations EXACTES de la documentation",
        "difficulty": "medium"
      },
      {
        "id": "card4",
        "question": "Question sur les critères d'orientation",
        "answer": "Réponse avec critères PRÉCIS de la base de connaissances",
        "difficulty": "medium"
      },
      {
        "id": "card5",
        "question": "Question sur la surveillance",
        "answer": "Réponse avec modalités de surveillance EXACTES",
        "difficulty": "hard"
      },
      {
        "id": "card6",
        "question": "Question sur les mécanismes physiopathologiques",
        "answer": "Réponse enrichie sur la physiopathologie",
        "difficulty": "hard"
      },
      {
        "id": "card7",
        "question": "Question de synthèse sur ${topic}",
        "answer": "Réponse synthétique intégrant tous les aspects",
        "difficulty": "hard"
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Question sur le cas comptoir de ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options basées sur le cas comptoir de la section memo"],
        "correct_answer": 0,
        "explanation": "Explication basée sur le cas comptoir de la base de connaissances",
        "difficulty": "easy"
      },
      {
        "id": "q2",
        "question": "Question sur les questions clés à poser pour ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options basées sur les questions clés de la section memo"],
        "correct_answer": 0,
        "explanation": "Explication basée sur les questions clés de la documentation",
        "difficulty": "easy"
      },
      {
        "id": "q3",
        "question": "Question sur les informations pathologie de ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options basées sur la pathologie de la section memo"],
        "correct_answer": 0,
        "explanation": "Explication basée sur la pathologie de la base de connaissances",
        "difficulty": "medium"
      },
      {
        "id": "q4",
        "question": "Question sur les critères d'orientation pour ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options basées sur l'orientation de la section memo"],
        "correct_answer": 0,
        "explanation": "Explication basée sur les critères d'orientation de la documentation",
        "difficulty": "medium"
      },
      {
        "id": "q5",
        "question": "Question sur le conseil et prise en charge de ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options basées sur le conseil de la section memo"],
        "correct_answer": 0,
        "explanation": "Explication basée sur le conseil et prise en charge de la base de connaissances",
        "difficulty": "medium"
      },
      {
        "id": "q6",
        "question": "Question sur les règles d'hygiène de vie pour ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options basées sur l'hygiène de vie de la section memo"],
        "correct_answer": 0,
        "explanation": "Explication basée sur les règles d'hygiène de la documentation",
        "difficulty": "medium"
      },
      {
        "id": "q7",
        "question": "Question sur les références bibliographiques de ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options basées sur les références de la section memo"],
        "correct_answer": 0,
        "explanation": "Explication basée sur les références de la documentation",
        "difficulty": "easy"
      },
      {
        "id": "q8",
        "question": "Question de synthèse sur le traitement de ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options de synthèse basées sur toute la section memo"],
        "correct_answer": 0,
        "explanation": "Explication de synthèse basée sur toute la base de connaissances",
        "difficulty": "hard"
      },
      {
        "id": "q9",
        "question": "Question de synthèse sur la surveillance de ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options de synthèse basées sur toute la section memo"],
        "correct_answer": 0,
        "explanation": "Explication de synthèse basée sur toute la documentation",
        "difficulty": "hard"
      },
      {
        "id": "q10",
        "question": "Question de synthèse générale sur ${topic} (type aléatoire qcm ou vrai_faux)",
        "type": "qcm ou vrai_faux (choix aléatoire)",
        "options": ["Options de synthèse basées sur toute la section memo"],
        "correct_answer": 0,
        "explanation": "Explication de synthèse complète basée sur toute la base de connaissances",
        "difficulty": "hard"
      }
    ],
    "glossary": [
      {
        "id": "term1",
        "term": "${topic}",
        "definition": "Définition basée sur les informations de la base de connaissances",
        "category": "pathologie"
      },
      {
        "id": "term2",
        "term": "Médicament principal mentionné dans la source",
        "definition": "Mécanisme d'action et dosage EXACT de la documentation",
        "category": "medicament"
      },
      {
        "id": "term3",
        "term": "Terme technique 1 de la base de connaissances",
        "definition": "Explication adaptée au niveau ${targetLevel}",
        "category": "technique"
      },
      {
        "id": "term4",
        "term": "Terme technique 2 de la base de connaissances",
        "definition": "Définition précise basée sur la documentation",
        "category": "technique"
      },
      {
        "id": "term5",
        "term": "Symptôme principal de ${topic}",
        "definition": "Description du symptôme selon la source",
        "category": "symptome"
      },
      {
        "id": "term6",
        "term": "Critère d'orientation pour ${topic}",
        "definition": "Explication du critère selon la documentation",
        "category": "procedure"
      },
      {
        "id": "term7",
        "term": "Règle d'hygiène pour ${topic}",
        "definition": "Description de la règle selon la source",
        "category": "hygiene"
      },
      {
        "id": "term8",
        "term": "Surveillance de ${topic}",
        "definition": "Modalités de surveillance selon la documentation",
        "category": "surveillance"
      },
      {
        "id": "term9",
        "term": "Référence bibliographique 1",
        "definition": "Description de la référence mentionnée",
        "category": "reference"
      },
      {
        "id": "term10",
        "term": "Référence bibliographique 2",
        "definition": "Description de la référence mentionnée",
        "category": "reference"
      }
    ],
    "key_points": [
      "Point clé essentiel sur la pathologie",
      "Point clé sur la prise en charge",
      "Point clé sur l'orientation",
      "Point clé sur la prévention"
    ],
    "practical_tips": [
      "Conseil pratique concret pour le comptoir",
      "Astuce pour l'interrogatoire patient",
      "Point d'attention important",
      "Conseil pour l'éducation du patient"
    ]
  }
}

CONTRAINTES STRICTES DE FIDÉLITÉ :
- ANALYSER la structure numérotée du document source (1., 2., 3., etc.)
- EXTRAIRE chaque section dans l'ordre exact du document original
- REPRODUIRE INTÉGRALEMENT chaque section SANS modification du contenu factuel
- CONSERVER tous les dosages, durées, critères, et références EXACTEMENT comme dans la source
- ENRICHIR uniquement APRÈS avoir reproduit fidèlement le contenu original
- GÉNÉRER OBLIGATOIREMENT 7 flashcards complètes (facile à difficile)
- GÉNÉRER OBLIGATOIREMENT 10 questions de quiz complètes (mélange QCM et Vrai/Faux)
- GÉNÉRER OBLIGATOIREMENT 10 termes de glossaire complets
- INCLURE toutes les sections : memo, flashcards, quiz, glossary, key_points, practical_tips
- Réponds UNIQUEMENT avec le JSON VALIDE ci-dessous, RIEN D'AUTRE

MÉTHODE D'EXTRACTION OBLIGATOIRE :
1. Lire ENTIÈREMENT la base de connaissances
2. Identifier CHAQUE section numérotée (1., 2., 3., etc.)
3. Extraire le TITRE EXACT de chaque section
4. Reproduire le CONTENU INTÉGRAL de chaque section
5. Enrichir avec des explications complémentaires SANS altérer l'information source

IMPORTANT CRITIQUE :
- Réponds UNIQUEMENT avec le JSON ci-dessous
- Commence directement par {
- Termine directement par }
- AUCUN texte explicatif, AUCUN commentaire
- JSON valide uniquement

OBJECTIF : JSON complet avec traitement source intact + sections enrichies + 7 flashcards + 10 questions quiz + 10 termes glossaire.

EXEMPLE DE DÉBUT DE RÉPONSE ATTENDUE :
{
  "title": "${topic}",
  "subtitle": "${therapeutic_area} - Formation ${targetLevel}",
  ...`

    // Appel à l'API Together AI
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 0.9,
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur Together AI API:', errorText)
      
      // Fallback vers le mode démo
      return NextResponse.json({
        success: true,
        data: generateDemoContent(topic, knowledgeBase, targetLevel, theme, therapeutic_area),
        provider: "Together AI (Fallback Démo)",
        demo_mode: true,
        error_details: errorText
      })
    }

    const result = await response.json()
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error('Format de réponse inattendu de Together AI')
    }

    const generatedText = result.choices[0].message.content
    console.log('🤖 Generated text from Together AI (first 300 chars):', generatedText.substring(0, 300) + '...')
    console.log('📊 Full response length:', generatedText.length, 'characters')

    // Tentative de parsing JSON avec réparation automatique
    let parsedContent
    try {
      // Nettoyer le texte généré
      const cleanedText = generatedText.trim()
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)

      if (jsonMatch) {
        console.log('✅ JSON pattern found, attempting to parse...')
        let jsonText = jsonMatch[0]

        // Tentative de parsing direct
        try {
          parsedContent = JSON.parse(jsonText)
          console.log('🎉 JSON parsing successful!')
        } catch (directParseError) {
          console.log('⚠️ Direct parsing failed, attempting JSON repair...')

          // Tentative de réparation JSON
          jsonText = repairJSON(jsonText)
          parsedContent = JSON.parse(jsonText)
          console.log('🔧 JSON repair successful!')
        }
      } else {
        throw new Error('Pas de JSON valide trouvé dans la réponse')
      }
    } catch (parseError) {
      console.log('❌ JSON parsing failed:', parseError.message)
      console.log('🔄 Using intelligent fallback system')
      // Utilisation directe du fallback intelligent
      parsedContent = { content: generateStructuredContent(topic, knowledgeBase, targetLevel, theme, therapeutic_area, generatedText) }
    }

    // Formatage final
    const memofiche = {
      id: `together_memofiche_${Date.now()}`,
      title: parsedContent.title || topic,
      subtitle: parsedContent.subtitle || `${therapeutic_area} - Formation ${targetLevel}`,
      description: parsedContent.description || `Mémofiche éducative sur ${topic.toLowerCase()} générée par Together AI Llama 3.1.`,
      level: targetLevel,
      theme: theme,
      estimated_duration: parsedContent.estimated_duration || "15-25 minutes",
      learning_objectives: parsedContent.learning_objectives || [
        `Maîtriser la prise en charge de ${topic.toLowerCase()}`,
        "Développer les compétences de conseil au comptoir",
        "Identifier les critères d'orientation médicale",
        "Appliquer les protocoles pharmaceutiques"
      ],
      content: parsedContent.content || generateDefaultContent(topic, targetLevel, generatedText),
      metadata: {
        created_by: "Together AI Llama 3.1",
        source: "Base de connaissances personnalisée",
        version: "1.0",
        last_updated: new Date().toISOString(),
        model: "meta-llama/Llama-3-8b-chat-hf",
        tokens_used: result.usage?.total_tokens || 'N/A'
      },
      created_at: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: memofiche,
      provider: "Together AI Llama 3",
      model: "meta-llama/Llama-3-8b-chat-hf",
      tokens_used: result.usage?.total_tokens,
      demo_mode: false
    })

  } catch (error) {
    console.error('Erreur génération Together AI:', error)

    // Fallback vers le mode démo en cas d'erreur
    // Utiliser les paramètres déjà extraits au début de la fonction
    return NextResponse.json({
      success: true,
      data: generateDemoContent(topic, knowledgeBase, targetLevel, theme, therapeutic_area),
      provider: "Together AI (Erreur - Mode Démo)",
      demo_mode: true,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    })
  }
}

// Fonction de génération démo pour Together AI
function generateDemoContent(topic: string, knowledgeBase: string, targetLevel: string, theme: string, therapeutic_area: string) {
  return {
    id: `together_demo_${Date.now()}`,
    title: topic,
    subtitle: `${therapeutic_area} - Formation ${targetLevel}`,
    description: `Mémofiche éducative sur ${topic.toLowerCase()} générée par Together AI Llama 3.1 (Mode Démo). Contenu basé sur votre documentation.`,
    level: targetLevel,
    theme: theme,
    estimated_duration: "15-25 minutes",
    learning_objectives: [
      `Comprendre les mécanismes de ${topic.toLowerCase()}`,
      "Maîtriser l'approche conseil au comptoir avec Together AI",
      "Identifier les critères d'orientation appropriés",
      "Bénéficier de l'IA collaborative Together"
    ],
    content: {
      memo: [
        {
          id: "together_intro",
          title: "Introduction - Together AI",
          content: `**Génération par Together AI Llama 3.1**\n\nCette mémofiche utilise la plateforme collaborative Together AI.\n\n**Sujet traité :** ${topic}\n**Niveau :** ${targetLevel}\n**Documentation :** ${knowledgeBase.substring(0, 100)}...\n\n**Avantages Together AI :**\n- $25 de crédit gratuit généreux\n- Modèles Llama 3.1 optimisés\n- Plateforme collaborative\n- Excellente qualité éducative`,
          icon: "brain"
        },
        {
          id: "together_cas_comptoir",
          title: "Cas comptoir",
          content: `**Situation clinique :**\n\nUn patient se présente au comptoir concernant ${topic}.\n\n**Approche Together AI :**\n- Génération collaborative intelligente\n- Adaptation niveau ${targetLevel} optimisée\n- Intégration parfaite de votre documentation\n- Conseil expert et personnalisé\n\n*Contenu généré par Together AI à partir de : "${knowledgeBase.substring(0, 50)}..."*`,
          icon: "user"
        }
      ],
      flashcards: [
        {
          id: "together_card1",
          question: `Quels sont les avantages de Together AI pour ${topic} ?`,
          answer: "$25 crédit gratuit, modèles Llama 3.1 optimisés, plateforme collaborative, et excellente qualité éducative.",
          difficulty: "easy"
        },
        {
          id: "together_card2",
          question: `Comment Together AI optimise-t-il la génération pour ${targetLevel} ?`,
          answer: "Adaptation collaborative du contenu, structuration pédagogique avancée, et personnalisation selon l'expertise.",
          difficulty: "medium"
        }
      ],
      quiz: [
        {
          id: "together_quiz1",
          question: `Quel est l'avantage principal de Together AI pour ${topic} ?`,
          options: [
            "Plateforme collaborative avec $25 gratuit",
            "Simple copie de contenu",
            "Génération basique",
            "Traduction automatique"
          ],
          correct_answer: 0,
          explanation: "Together AI offre une plateforme collaborative avec $25 de crédit gratuit et des modèles optimisés.",
          difficulty: "medium"
        }
      ],
      glossary: [
        {
          id: "together_term1",
          term: "Together AI",
          definition: "Plateforme collaborative d'IA offrant $25 de crédit gratuit et des modèles Llama 3.1 optimisés pour l'éducation.",
          category: "technologie"
        }
      ],
      key_points: [
        `${topic} traité par Together AI`,
        "$25 de crédit gratuit généreux",
        "Modèles Llama 3.1 collaboratifs",
        "Optimisation pour l'éducation pharmaceutique"
      ],
      practical_tips: [
        "Utiliser Together AI pour du contenu éducatif avancé",
        "Profiter du crédit gratuit généreux",
        "Tester la qualité collaborative",
        "Optimiser les prompts pour Llama 3.1"
      ]
    },
    metadata: {
      created_by: "Together AI Llama 3.1 (Mode Démo)",
      source: "Démonstration API",
      version: "1.0",
      last_updated: new Date().toISOString(),
      demo_mode: true
    }
  }
}

// Fonction pour extraire les sections numérotées de la base de connaissances
function extractNumberedSections(knowledgeBase: string, topic: string) {
  console.log('🔍 Extracting numbered sections from knowledge base...')
  console.log('📄 Knowledge base length:', knowledgeBase.length)

  const sections = []

  // Patterns améliorés pour capturer TOUTES les sections numérotées
  const patterns = [
    // Pattern principal : 1. Titre suivi du contenu jusqu'à la prochaine section
    /(\d+)\.\s*([^\n\r]+)[\n\r]*((?:(?!\d+\.).)*)/g,
    // Pattern alternatif : numéro avec point et contenu
    /(\d+)\.\s*([^1-9]+?)(?=\d+\.|$)/gs,
    // Pattern pour sections avec tirets
    /(\d+)[\.\-]\s*([^0-9]+?)(?=\d+[\.\-]|$)/gs,
    // Pattern pour sections avec espaces
    /(\d+)\s*[\.\-]\s*([^\n\r]+(?:\n(?!\d+[\.\-])[^\n\r]*)*)/g
  ]

  // Essayer chaque pattern et garder le meilleur résultat
  let bestSections = []

  for (const pattern of patterns) {
    pattern.lastIndex = 0 // Reset regex
    const currentSections = []
    let match

    while ((match = pattern.exec(knowledgeBase)) !== null) {
      const sectionNumber = parseInt(match[1])
      let sectionTitle = match[2] ? match[2].trim() : ''
      let sectionContent = match[3] ? match[3].trim() : match[2].trim()

      // Si pas de contenu séparé, utiliser le titre comme contenu
      if (!match[3] && sectionTitle) {
        sectionContent = sectionTitle
        sectionTitle = generateSectionTitle(sectionContent, sectionNumber)
      }

      if (sectionContent.length > 10) { // Ignorer les sections trop courtes
        // Éviter les doublons
        if (!currentSections.find(s => s.number === sectionNumber)) {
          currentSections.push({
            number: sectionNumber,
            content: sectionContent,
            title: sectionTitle || generateSectionTitle(sectionContent, sectionNumber)
          })
        }
      }
    }

    // Garder le résultat avec le plus de sections
    if (currentSections.length > bestSections.length) {
      bestSections = currentSections
    }
  }

  // Trier les sections par numéro
  bestSections.sort((a, b) => a.number - b.number)

  // Si pas de sections numérotées trouvées, essayer d'autres patterns
  if (bestSections.length === 0) {
    console.log('⚠️ No numbered sections found, trying traditional extraction')
    return extractTraditionalSections(knowledgeBase, topic)
  }

  console.log('✅ Found numbered sections:', bestSections.length)
  bestSections.forEach((section, index) => {
    console.log(`📋 Section ${section.number}: ${section.title} (${section.content.length} chars)`)
  })

  return bestSections
}

// Fonction pour générer un titre de section basé sur le contenu
function generateSectionTitle(content: string, sectionNumber: number): string {
  // Essayer d'extraire un titre explicite au début du contenu
  const lines = content.split('\n')
  const firstLine = lines[0].trim()

  // Si la première ligne semble être un titre (courte et sans ponctuation finale)
  if (firstLine.length < 80 && !firstLine.endsWith('.') && !firstLine.endsWith(':')) {
    // Nettoyer le titre potentiel
    const cleanTitle = firstLine.replace(/^[\d\.\-\s]+/, '').trim()
    if (cleanTitle.length > 3 && cleanTitle.length < 60) {
      return cleanTitle
    }
  }

  // Fallback : analyser le contenu pour déterminer le type
  const firstWords = content.split(' ').slice(0, 10).join(' ').toLowerCase()

  // Patterns étendus pour identifier le type de section
  if (/cas|patient|situation|comptoir|présent|vient|consulte/i.test(firstWords)) {
    return "Cas comptoir"
  } else if (/question|interrogatoire|demander|poser|évaluer/i.test(firstWords)) {
    return "Questions clés à poser"
  } else if (/pathologie|définition|maladie|infection|qu'est-ce|description/i.test(firstWords)) {
    return "Informations sur la pathologie"
  } else if (/orientation|médecin|spécialiste|référer|consulter|urgence/i.test(firstWords)) {
    return "Critères d'orientation"
  } else if (/traitement|thérapie|médicament|prise en charge|conseil|recommand/i.test(firstWords)) {
    return "Conseil et prise en charge"
  } else if (/hygiène|alimentaire|mode de vie|prévention|éviter|recommandation/i.test(firstWords)) {
    return "Règles d'hygiène de vie"
  } else if (/surveillance|suivi|contrôle|vérifier|surveiller/i.test(firstWords)) {
    return "Surveillance"
  } else if (/référence|bibliographie|source|étude|publication/i.test(firstWords)) {
    return "Références bibliographiques"
  } else {
    // Utiliser les premiers mots comme titre si aucun pattern ne correspond
    const potentialTitle = content.split(' ').slice(0, 6).join(' ')
    return potentialTitle.length > 50 ? `Section ${sectionNumber}` : potentialTitle
  }
}

// Fonction de fallback pour extraction traditionnelle
function extractTraditionalSections(knowledgeBase: string, topic: string) {
  console.log('Using traditional section extraction')

  const sections = []

  // Extraction des sections traditionnelles
  const patterns = [
    { regex: /SYMPTÔMES?\s*:\s*([^.]+(?:\.[^.]*)*)/i, title: "Symptômes" },
    { regex: /TRAITEMENT\s*:\s*([^.]+(?:\.[^.]*)*)/i, title: "Traitement" },
    { regex: /RÈGLES?\s+HYGIÉNO?-?DIÉTÉTIQUES?\s*:\s*([^.]+(?:\.[^.]*)*)/i, title: "Règles hygiéno-diététiques" },
    { regex: /SURVEILLANCE\s*:\s*([^.]+(?:\.[^.]*)*)/i, title: "Surveillance" },
    { regex: /RÉFÉRENCES?\s*:\s*([^.]+(?:\.[^.]*)*)/i, title: "Références" }
  ]

  patterns.forEach((pattern, index) => {
    const match = knowledgeBase.match(pattern.regex)
    if (match && match[1]) {
      sections.push({
        number: index + 1,
        title: pattern.title,
        content: match[1].trim()
      })
    }
  })

  // Si aucune section trouvée, créer une section par défaut
  if (sections.length === 0) {
    sections.push({
      number: 1,
      title: "Contenu principal",
      content: knowledgeBase.trim()
    })
  }

  return sections
}

// Fonction pour extraire du contenu entre deux sections
function extractBetweenSections(text: string, startPattern: RegExp, endPattern: RegExp): string | null {
  const startMatch = text.search(startPattern)
  if (startMatch === -1) return null

  const afterStart = text.substring(startMatch)
  const colonIndex = afterStart.indexOf(':')
  if (colonIndex === -1) return null

  const content = afterStart.substring(colonIndex + 1)
  const endMatch = content.search(endPattern)

  if (endMatch === -1) {
    return content.trim().substring(0, 200) // Prendre les 200 premiers caractères
  }

  return content.substring(0, endMatch).trim()
}

// Fonction pour extraire du contenu depuis la fin
function extractFromEnd(text: string, pattern: RegExp): string | null {
  const match = text.search(pattern)
  if (match === -1) return null

  const afterMatch = text.substring(match)
  const colonIndex = afterMatch.indexOf(':')
  if (colonIndex === -1) return null

  return afterMatch.substring(colonIndex + 1).trim()
}

// Fonction pour structurer le contenu généré avec sections complètes
function generateStructuredContent(topic: string, knowledgeBase: string, targetLevel: string, theme: string, therapeutic_area: string, generatedText: string) {
  const extractedSections = extractNumberedSections(knowledgeBase, topic)

  // Conversion des sections extraites en format memo
  const memoSections = extractedSections.map((section, index) => {
    const iconMap = {
      "Cas comptoir": "user",
      "Questions clés à poser": "help-circle",
      "Informations sur la pathologie": "book",
      "Critères d'orientation": "arrow-right",
      "Conseil et prise en charge": "heart",
      "Règles d'hygiène de vie": "shield",
      "Surveillance": "eye",
      "Références bibliographiques": "book-open"
    }

    return {
      id: `section_${section.number}`,
      title: section.title,
      content: section.content,
      icon: iconMap[section.title] || "file-text"
    }
  })

  // Si moins de 3 sections, ajouter des sections par défaut
  if (memoSections.length < 3) {
    const defaultSections = [
      {
        id: "cas_comptoir",
        title: "Cas comptoir",
        content: `Patient présentant ${topic}. Évaluation et conseil pharmaceutique selon la documentation fournie.`,
        icon: "user"
      },
      {
        id: "pathologie",
        title: "Informations sur la pathologie",
        content: `${topic} : pathologie nécessitant une prise en charge adaptée selon le niveau ${targetLevel}.`,
        icon: "book"
      },
      {
        id: "prise_en_charge",
        title: "Prise en charge",
        content: `Approche thérapeutique basée sur la documentation fournie pour ${topic}.`,
        icon: "heart"
      }
    ]

    // Ajouter les sections par défaut si nécessaire
    defaultSections.forEach(defaultSection => {
      if (!memoSections.find(s => s.title.toLowerCase().includes(defaultSection.title.toLowerCase()))) {
        memoSections.push(defaultSection)
      }
    })
  }

  return {
    memo: memoSections,
    flashcards: generateFlashcardsFromSections(extractedSections, topic, targetLevel),
    quiz: generateQuizFromSections(extractedSections, topic, targetLevel),
    glossary: generateGlossaryFromSections(extractedSections, topic, targetLevel),
    key_points: [
      `${topic} : pathologie traitée`,
      `Traitement : selon documentation`,
      `Hygiène : règles importantes`,
      `Surveillance : modalités adaptées`
    ],
    practical_tips: [
      "Évaluer la gravité des symptômes",
      "Adapter le conseil au niveau du patient",
      "Surveiller l'efficacité du traitement",
      "Orienter si nécessaire"
    ]
  }
}

// Fonction pour générer les flashcards basées sur les sections
function generateFlashcardsFromSections(sections: any[], topic: string, targetLevel: string) {
  const flashcards = []
  const difficulties = ['easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard']

  sections.forEach((section, index) => {
    if (index < 7) { // Limiter à 7 flashcards
      const shortContent = section.content.length > 100 ?
        section.content.substring(0, 100) + "..." :
        section.content

      flashcards.push({
        id: `card${index + 1}`,
        question: `${section.title} pour ${topic} ?`,
        answer: shortContent,
        difficulty: difficulties[index] || 'medium'
      })
    }
  })

  // Compléter avec des flashcards génériques si moins de 7
  while (flashcards.length < 7) {
    const index = flashcards.length
    flashcards.push({
      id: `card${index + 1}`,
      question: `Question ${index + 1} sur ${topic}`,
      answer: `Réponse basée sur la documentation fournie pour ${topic}.`,
      difficulty: difficulties[index] || 'medium'
    })
  }

  return flashcards
}

// Fonction pour générer le quiz basé sur les sections
function generateQuizFromSections(sections: any[], topic: string, targetLevel: string) {
  const quiz = []
  const types = ['qcm', 'vrai_faux', 'qcm', 'vrai_faux', 'qcm', 'vrai_faux', 'qcm', 'vrai_faux', 'qcm', 'vrai_faux']
  const difficulties = ['easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard', 'hard']

  sections.forEach((section, index) => {
    if (index < 10) { // Limiter à 10 questions
      const questionType = types[index]
      const shortContent = section.content.length > 80 ?
        section.content.substring(0, 80) + "..." :
        section.content

      if (questionType === 'qcm') {
        quiz.push({
          id: `q${index + 1}`,
          question: `Concernant ${section.title.toLowerCase()} de ${topic}, que dit la documentation ?`,
          type: "qcm",
          options: [
            shortContent,
            "Information différente",
            "Information non mentionnée",
            "Information contradictoire"
          ],
          correct_answer: 0,
          explanation: `Selon la documentation : ${shortContent}`,
          difficulty: difficulties[index]
        })
      } else {
        quiz.push({
          id: `q${index + 1}`,
          question: `${section.title} est important pour ${topic}`,
          type: "vrai_faux",
          options: ["Vrai", "Faux"],
          correct_answer: 0,
          explanation: `Vrai. ${shortContent}`,
          difficulty: difficulties[index]
        })
      }
    }
  })

  // Compléter avec des questions génériques si moins de 10
  while (quiz.length < 10) {
    const index = quiz.length
    const questionType = types[index]

    if (questionType === 'qcm') {
      quiz.push({
        id: `q${index + 1}`,
        question: `Question ${index + 1} sur ${topic}`,
        type: "qcm",
        options: [
          "Réponse basée sur la documentation",
          "Réponse alternative",
          "Réponse incorrecte",
          "Aucune réponse"
        ],
        correct_answer: 0,
        explanation: `Réponse basée sur la documentation fournie pour ${topic}.`,
        difficulty: difficulties[index]
      })
    } else {
      quiz.push({
        id: `q${index + 1}`,
        question: `Affirmation ${index + 1} sur ${topic}`,
        type: "vrai_faux",
        options: ["Vrai", "Faux"],
        correct_answer: 0,
        explanation: `Affirmation basée sur la documentation fournie.`,
        difficulty: difficulties[index]
      })
    }
  }

  return quiz
}

// Fonction pour générer le glossaire basé sur les sections
function generateGlossaryFromSections(sections: any[], topic: string, targetLevel: string) {
  const glossary = []

  // Terme principal
  glossary.push({
    id: "term1",
    term: topic,
    definition: `Pathologie ou condition médicale traitée dans cette mémofiche.`,
    category: "pathologie"
  })

  // Termes basés sur les sections
  sections.forEach((section, index) => {
    if (index < 9 && glossary.length < 10) { // Limiter à 10 termes
      const firstWords = section.content.split(' ').slice(0, 3).join(' ')

      glossary.push({
        id: `term${index + 2}`,
        term: firstWords.length > 20 ? section.title : firstWords,
        definition: `Concept lié à ${section.title.toLowerCase()} pour ${topic}.`,
        category: getCategoryFromTitle(section.title)
      })
    }
  })

  // Compléter avec des termes génériques si moins de 10
  const genericTerms = [
    { term: "Symptômes", definition: "Manifestations cliniques observées", category: "symptome" },
    { term: "Traitement", definition: "Approche thérapeutique recommandée", category: "medicament" },
    { term: "Surveillance", definition: "Modalités de suivi médical", category: "surveillance" },
    { term: "Prévention", definition: "Mesures préventives à adopter", category: "hygiene" },
    { term: "Orientation", definition: "Critères de référence médicale", category: "procedure" },
    { term: "Posologie", definition: "Dosage et fréquence d'administration", category: "medicament" },
    { term: "Efficacité", definition: "Mesure de l'amélioration clinique", category: "technique" },
    { term: "Contre-indications", definition: "Situations où le traitement est déconseillé", category: "medicament" }
  ]

  genericTerms.forEach((term, index) => {
    if (glossary.length < 10) {
      glossary.push({
        id: `generic_term${index + 1}`,
        term: term.term,
        definition: term.definition,
        category: term.category
      })
    }
  })

  return glossary.slice(0, 10) // S'assurer qu'on a exactement 10 termes max
}

// Fonction pour déterminer la catégorie d'un terme basé sur le titre de section
function getCategoryFromTitle(title: string): string {
  if (/cas|comptoir|patient/i.test(title)) return "procedure"
  if (/question|interrogatoire/i.test(title)) return "technique"
  if (/pathologie|maladie|infection/i.test(title)) return "pathologie"
  if (/orientation|médecin/i.test(title)) return "procedure"
  if (/traitement|médicament|thérapie/i.test(title)) return "medicament"
  if (/hygiène|alimentaire|prévention/i.test(title)) return "hygiene"
  if (/surveillance|suivi/i.test(title)) return "surveillance"
  if (/référence|bibliographie/i.test(title)) return "reference"
  return "technique"
}

// Fonction pour contenu par défaut
function generateDefaultContent(topic: string, targetLevel: string, generatedText: string) {
  return {
    memo: [
      {
        id: "default_content",
        title: topic,
        content: generatedText || `Contenu généré par Together AI pour ${topic} au niveau ${targetLevel}.`,
        icon: "book"
      }
    ],
    flashcards: [],
    quiz: [],
    glossary: [],
    key_points: [],
    practical_tips: []
  }
}
