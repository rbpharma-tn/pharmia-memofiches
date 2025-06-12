import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Stockage temporaire en mémoire pour le mode démo
let demoMemofiches: any[] = []

// Fonction pour créer le client Supabase seulement si configuré
function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url' ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY === 'your_supabase_service_role_key') {
    return null
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function POST(request: NextRequest) {
  try {
    const memofiche = await request.json()

    // Validation des champs requis
    if (!memofiche.title || !memofiche.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Mode démo si Supabase pas configuré
    const supabase = getSupabaseClient()
    if (!supabase) {
      return await saveDemoMemofiche(memofiche)
    }

    // Préparation des données pour Supabase
    const memoficheData = {
      // Laisser Supabase générer l'UUID automatiquement
      title: memofiche.title,
      subtitle: memofiche.subtitle || '',
      description: memofiche.description || '',
      theme: memofiche.theme || 'general',
      level: memofiche.level || 'Débutant',
      content: memofiche.content,
      learning_objectives: memofiche.learning_objectives || [],
      estimated_duration: memofiche.estimated_duration || '15 minutes',
      image_url: memofiche.image_url || null,
      youtube_url: memofiche.youtube_url || null,
      kahoot_url: memofiche.kahoot_url || null,
      metadata: memofiche.metadata || {},
      is_published: true
    }

    // Insertion en base de données
    const { data, error } = await supabase
      .from('memofiches')
      .insert([memoficheData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save memofiche', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: 'Mémofiche sauvegardée avec succès'
    })

  } catch (error) {
    console.error('Save memofiche error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to save memofiche',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const theme = searchParams.get('theme')
    const level = searchParams.get('level')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Mode démo si Supabase pas configuré
    const supabase = getSupabaseClient()
    if (!supabase) {
      return getDemoMemofiches(theme, level, limit)
    }

    let query = supabase
      .from('memofiches')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (theme) {
      query = query.eq('theme', theme)
    }

    if (level) {
      query = query.eq('level', level)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch memofiches', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    })

  } catch (error) {
    console.error('Fetch memofiches error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch memofiches',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Memofiche ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured (demo mode)' },
        { status: 503 }
      )
    }

    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('memofiches')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update memofiche', details: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Memofiche not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: 'Mémofiche mise à jour avec succès'
    })

  } catch (error) {
    console.error('Update memofiche error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update memofiche',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Memofiche ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured (demo mode)' },
        { status: 503 }
      )
    }

    const { error } = await supabase
      .from('memofiches')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete memofiche', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Mémofiche supprimée avec succès'
    })

  } catch (error) {
    console.error('Delete memofiche error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete memofiche',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Fonction de sauvegarde démo (simulation)
async function saveDemoMemofiche(memofiche: any) {
  // Simulation d'une sauvegarde réussie
  const savedMemofiche = {
    ...memofiche,
    id: memofiche.id || `memofiche_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_published: true,
    demo_mode: true
  }

  // Ajouter à la liste en mémoire
  demoMemofiches.unshift(savedMemofiche) // Ajouter au début pour avoir les plus récentes en premier

  // Simulation d'un délai de sauvegarde
  await new Promise(resolve => setTimeout(resolve, 1000))

  return NextResponse.json({
    success: true,
    data: savedMemofiche,
    message: 'Mémofiche sauvegardée avec succès (Mode Démo)',
    demo_mode: true
  })
}

// Fonction de récupération démo (simulation)
function getDemoMemofiches(theme?: string | null, level?: string | null, limit: number = 10) {
  // Données de démonstration statiques + mémofiches sauvegardées
  const staticDemoMemofiches = [
    {
      id: 'demo_memofiche_1',
      title: 'Candidose vulvo-vaginale',
      subtitle: 'Gynécologie - Formation Débutant',
      description: 'Mémofiche éducative sur la candidose vulvo-vaginale adaptée au niveau débutant.',
      theme: 'maladies-courantes',
      level: 'Débutant',
      estimated_duration: '15-20 minutes',
      learning_objectives: [
        'Identifier les symptômes de candidose vulvo-vaginale',
        'Poser les bonnes questions au comptoir',
        'Orienter le patient selon les critères appropriés'
      ],
      content: {
        memo: [
          {
            id: 'cas_comptoir',
            title: 'Cas comptoir',
            content: 'Situation clinique réaliste...',
            icon: 'user'
          }
        ],
        flashcards: [],
        quiz: [],
        glossary: [],
        key_points: [],
        practical_tips: []
      },
      metadata: {
        created_by: 'Mode Démo',
        demo_mode: true
      },
      is_published: true,
      created_at: new Date(Date.now() - 86400000).toISOString(), // Hier
      updated_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'demo_memofiche_2',
      title: 'Hypertension artérielle',
      subtitle: 'Cardiologie - Formation Intermédiaire',
      description: 'Mémofiche sur la prise en charge de l\'hypertension artérielle.',
      theme: 'maladies-courantes',
      level: 'Intermédiaire',
      estimated_duration: '20-25 minutes',
      learning_objectives: [
        'Comprendre les mécanismes de l\'hypertension',
        'Conseiller les traitements appropriés',
        'Éduquer le patient sur l\'observance'
      ],
      content: {
        memo: [],
        flashcards: [],
        quiz: [],
        glossary: [],
        key_points: [],
        practical_tips: []
      },
      metadata: {
        created_by: 'Mode Démo',
        demo_mode: true
      },
      is_published: true,
      created_at: new Date(Date.now() - 172800000).toISOString(), // Avant-hier
      updated_at: new Date(Date.now() - 172800000).toISOString()
    }
  ]

  // Combiner les mémofiches sauvegardées et les données statiques
  const allMemofiches = [...demoMemofiches, ...staticDemoMemofiches]

  // Filtrage selon les paramètres
  let filteredMemofiches = allMemofiches

  if (theme) {
    filteredMemofiches = filteredMemofiches.filter(m => m.theme === theme)
  }

  if (level) {
    filteredMemofiches = filteredMemofiches.filter(m => m.level === level)
  }

  // Limitation du nombre de résultats
  filteredMemofiches = filteredMemofiches.slice(0, limit)

  return NextResponse.json({
    success: true,
    data: filteredMemofiches,
    count: filteredMemofiches.length,
    demo_mode: true,
    message: 'Mémofiches récupérées (Mode Démo)'
  })
}
