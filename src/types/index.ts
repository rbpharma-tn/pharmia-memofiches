// Types pour les utilisateurs
export type UserRole = 'pharmacien' | 'preparateur' | 'etudiant'

export interface User {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

// Types pour les mémofiches
export interface Memofiche {
  id: string
  title: string
  subtitle?: string | null
  description?: string | null
  image_url?: string | null
  content: MemoFicheContent
  created_at: string
  updated_at: string
  created_by: string
  is_published: boolean
}

export interface MemoFicheContent {
  memo: MemoSection[]
  flashcards: Flashcard[]
  quiz: QuizQuestion[]
  glossary: GlossaryTerm[]
  kahoot_url?: string
  podcast_url?: string
  youtube_videos?: YouTubeVideo[]
}

export interface MemoSection {
  id: string
  type: 'section'
  title: string
  content: string
  children?: MemoSection[]
}

export interface Flashcard {
  id: string
  question: string
  answer: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number
  explanation: string
}

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
}

export interface YouTubeVideo {
  id: string
  title: string
  url: string
}

// Types pour le suivi de progression
export interface UserProgress {
  id: string
  user_id: string
  memofiche_id: string
  progress_percentage: number
  completed_sections: string[]
  quiz_scores: QuizScore[] | null
  last_accessed: string
  created_at: string
  updated_at: string
}

export interface QuizScore {
  quiz_id: string
  score: number
  total_questions: number
  completed_at: string
}

// Types pour le chatbot
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// Types pour les composants UI
export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

export interface ProgressBarProps {
  progress: number
  className?: string
}

// Types pour les API
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

export interface GeminiResponse {
  text: string
  error?: string
}
