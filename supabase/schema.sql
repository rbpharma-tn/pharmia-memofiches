-- Schema SQL pour PharmIA Mémofiches
-- À exécuter dans Supabase SQL Editor

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des mémofiches
CREATE TABLE IF NOT EXISTS memofiches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    level TEXT NOT NULL CHECK (level IN ('Débutant', 'Intermédiaire', 'Avancé')),
    theme TEXT NOT NULL,
    estimated_duration TEXT,
    learning_objectives JSONB,
    content JSONB NOT NULL,
    metadata JSONB,
    youtube_url TEXT,
    audio_files JSONB DEFAULT '[]'::jsonb,
    kahoot_url TEXT,
    image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des utilisateurs (apprenants)
CREATE TABLE IF NOT EXISTS learners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    level TEXT DEFAULT 'Débutant' CHECK (level IN ('Débutant', 'Intermédiaire', 'Avancé')),
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table de progression des apprenants
CREATE TABLE IF NOT EXISTS learner_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    learner_id UUID REFERENCES learners(id) ON DELETE CASCADE,
    memofiche_id UUID REFERENCES memofiches(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    completed_sections JSONB DEFAULT '[]'::jsonb,
    quiz_scores JSONB DEFAULT '{}'::jsonb,
    time_spent INTEGER DEFAULT 0, -- en minutes
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(learner_id, memofiche_id)
);

-- Table des badges
CREATE TABLE IF NOT EXISTS badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    criteria JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des badges obtenus par les apprenants
CREATE TABLE IF NOT EXISTS learner_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    learner_id UUID REFERENCES learners(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(learner_id, badge_id)
);

-- Table des sessions d'apprentissage
CREATE TABLE IF NOT EXISTS learning_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    learner_id UUID REFERENCES learners(id) ON DELETE CASCADE,
    memofiche_id UUID REFERENCES memofiches(id) ON DELETE CASCADE,
    session_data JSONB DEFAULT '{}'::jsonb,
    duration INTEGER, -- en minutes
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_memofiches_updated_at BEFORE UPDATE ON memofiches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learners_updated_at BEFORE UPDATE ON learners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learner_progress_updated_at BEFORE UPDATE ON learner_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_memofiches_theme ON memofiches(theme);
CREATE INDEX IF NOT EXISTS idx_memofiches_level ON memofiches(level);
CREATE INDEX IF NOT EXISTS idx_memofiches_published ON memofiches(is_published);
CREATE INDEX IF NOT EXISTS idx_learner_progress_learner ON learner_progress(learner_id);
CREATE INDEX IF NOT EXISTS idx_learner_progress_memofiche ON learner_progress(memofiche_id);

-- RLS (Row Level Security) - Optionnel pour plus tard
-- ALTER TABLE memofiches ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE learners ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE learner_progress ENABLE ROW LEVEL SECURITY;

-- Insertion de données de test
INSERT INTO badges (name, description, icon, criteria) VALUES
('Premier Pas', 'Première mémofiche complétée', '🎯', '{"completed_memofiches": 1}'),
('Apprenant Assidu', '5 mémofiches complétées', '📚', '{"completed_memofiches": 5}'),
('Expert Débutant', 'Toutes les mémofiches niveau Débutant', '🌟', '{"level": "Débutant", "completion_rate": 100}'),
('Maître Pharmacien', '20 mémofiches complétées', '👨‍⚕️', '{"completed_memofiches": 20}');

-- Commentaires pour documentation
COMMENT ON TABLE memofiches IS 'Table principale des mémofiches éducatives';
COMMENT ON TABLE learners IS 'Table des apprenants/utilisateurs';
COMMENT ON TABLE learner_progress IS 'Suivi de progression des apprenants par mémofiche';
COMMENT ON TABLE badges IS 'Système de badges/récompenses';
COMMENT ON TABLE learner_badges IS 'Association apprenants-badges obtenus';
COMMENT ON TABLE learning_sessions IS 'Sessions d''apprentissage détaillées';
