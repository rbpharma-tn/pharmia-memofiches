import { createSupabaseClient, createSupabaseServerClient } from './supabase'
import type { Database } from './supabase'
import type { Memofiche, UserProgress, User, GlossaryTerm } from '@/types'

// Types pour les réponses de la base de données
type DbMemofiche = Database['public']['Tables']['memofiches']['Row']
type DbUserProgress = Database['public']['Tables']['user_progress']['Row']
type DbUser = Database['public']['Tables']['users']['Row']
type DbGlossaryTerm = Database['public']['Tables']['glossary_terms']['Row']

// Fonctions pour les mémofiches
export async function getMemofiches(): Promise<Memofiche[]> {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('memofiches')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching memofiches:', error)
    return []
  }

  return data.map(transformDbMemofiches)
}

export async function getMemofiche(id: string): Promise<Memofiche | null> {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('memofiches')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching memofiche:', error)
    return null
  }

  return transformDbMemofiches(data)
}

export async function createMemofiche(memofiche: Omit<Memofiche, 'id' | 'created_at' | 'updated_at'>): Promise<Memofiche | null> {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('memofiches')
    .insert({
      title: memofiche.title,
      subtitle: memofiche.subtitle,
      description: memofiche.description,
      image_url: memofiche.image_url,
      content: memofiche.content,
      created_by: memofiche.created_by,
      is_published: memofiche.is_published
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating memofiche:', error)
    return null
  }

  return transformDbMemofiches(data)
}

// Fonctions pour le suivi de progression
export async function getUserProgress(userId: string, memoFicheId: string): Promise<UserProgress | null> {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('memofiche_id', memoFicheId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Pas de progression trouvée, retourner null
      return null
    }
    console.error('Error fetching user progress:', error)
    return null
  }

  return transformDbUserProgress(data)
}

export async function updateUserProgress(progress: Partial<UserProgress> & { user_id: string; memofiche_id: string }): Promise<UserProgress | null> {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: progress.user_id,
      memofiche_id: progress.memofiche_id,
      progress_percentage: progress.progress_percentage || 0,
      completed_sections: progress.completed_sections || [],
      quiz_scores: progress.quiz_scores || [],
      last_accessed: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error updating user progress:', error)
    return null
  }

  return transformDbUserProgress(data)
}

// Fonctions pour les utilisateurs
export async function getUser(id: string): Promise<User | null> {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching user:', error)
    return null
  }

  return transformDbUser(data)
}

export async function createUser(user: Omit<User, 'created_at' | 'updated_at'>): Promise<User | null> {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    return null
  }

  return transformDbUser(data)
}

// Fonctions pour les termes du glossaire
export async function getGlossaryTerms(memoFicheId?: string): Promise<GlossaryTerm[]> {
  const supabase = createSupabaseClient()
  
  let query = supabase.from('glossary_terms').select('*')
  
  if (memoFicheId) {
    query = query.eq('memofiche_id', memoFicheId)
  }
  
  const { data, error } = await query.order('term')

  if (error) {
    console.error('Error fetching glossary terms:', error)
    return []
  }

  return data.map(transformDbGlossaryTerm)
}

// Fonctions de transformation des données
function transformDbMemofiches(dbMemofiche: DbMemofiche): Memofiche {
  return {
    id: dbMemofiche.id,
    title: dbMemofiche.title,
    subtitle: dbMemofiche.subtitle,
    description: dbMemofiche.description,
    image_url: dbMemofiche.image_url,
    content: dbMemofiche.content as any,
    created_at: dbMemofiche.created_at,
    updated_at: dbMemofiche.updated_at,
    created_by: dbMemofiche.created_by || '',
    is_published: dbMemofiche.is_published
  }
}

function transformDbUserProgress(dbProgress: DbUserProgress): UserProgress {
  return {
    id: dbProgress.id,
    user_id: dbProgress.user_id,
    memofiche_id: dbProgress.memofiche_id,
    progress_percentage: dbProgress.progress_percentage,
    completed_sections: dbProgress.completed_sections,
    quiz_scores: dbProgress.quiz_scores as any,
    last_accessed: dbProgress.last_accessed,
    created_at: dbProgress.created_at,
    updated_at: dbProgress.updated_at
  }
}

function transformDbUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    email: dbUser.email,
    full_name: dbUser.full_name,
    role: dbUser.role as any,
    created_at: dbUser.created_at,
    updated_at: dbUser.updated_at
  }
}

function transformDbGlossaryTerm(dbTerm: DbGlossaryTerm): GlossaryTerm {
  return {
    id: dbTerm.id,
    term: dbTerm.term,
    definition: dbTerm.definition
  }
}
