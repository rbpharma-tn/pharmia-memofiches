import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { term } = await request.json()

    if (!term || typeof term !== 'string') {
      return NextResponse.json(
        { error: 'Terme requis' },
        { status: 400 }
      )
    }

    const apiKey = process.env.TOGETHER_API_KEY

    // Mode démo si pas de clé API
    if (!apiKey || apiKey === 'your_together_api_key') {
      return NextResponse.json({
        success: true,
        definition: `Définition de démonstration pour "${term}". Cette explication serait générée par l'IA Together AI en mode réel.`,
        provider: "Together AI (Mode Démo)",
        demo_mode: true
      })
    }

    // Prompt pour l'explication de terme médical
    const prompt = `Tu es un expert pharmacien. Explique le terme médical "${term}" de manière claire et précise.

CONSIGNES :
- Donne une définition complète mais accessible
- Inclus le contexte pharmaceutique si pertinent
- Mentionne les usages cliniques si applicable
- Adapte le niveau à un professionnel de santé
- Reste factuel et précis
- Maximum 200 mots

Réponds uniquement avec la définition, sans introduction ni conclusion.`

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
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 300,
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
        definition: `Définition générée pour "${term}". En raison d'une erreur temporaire de l'API, cette définition est en mode démo.`,
        provider: "Together AI (Fallback Démo)",
        demo_mode: true,
        error_details: errorText
      })
    }

    const result = await response.json()
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error('Format de réponse inattendu de Together AI')
    }

    const definition = result.choices[0].message.content.trim()

    return NextResponse.json({
      success: true,
      definition: definition,
      term: term,
      provider: "Together AI",
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      tokens_used: result.usage?.total_tokens,
      demo_mode: false
    })

  } catch (error) {
    console.error('Erreur explication terme:', error)
    
    // Fallback vers le mode démo en cas d'erreur
    const { term } = await request.json().catch(() => ({ term: 'terme inconnu' }))
    
    return NextResponse.json({
      success: true,
      definition: `Définition de secours pour "${term}". Une erreur s'est produite lors de la génération de la définition par l'IA.`,
      provider: "Mode Démo (Erreur)",
      demo_mode: true,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    })
  }
}
