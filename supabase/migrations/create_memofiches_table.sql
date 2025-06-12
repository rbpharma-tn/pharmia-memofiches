-- Création de la table memofiches pour stocker les mémofiches générées par IA
CREATE TABLE IF NOT EXISTS memofiches (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  theme TEXT NOT NULL DEFAULT 'general',
  level TEXT NOT NULL DEFAULT 'Débutant',
  content JSONB NOT NULL,
  learning_objectives TEXT[],
  estimated_duration TEXT DEFAULT '15 minutes',
  youtube_url TEXT,
  kahoot_url TEXT,
  audio_files TEXT[],
  metadata JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_memofiches_theme ON memofiches(theme);
CREATE INDEX IF NOT EXISTS idx_memofiches_level ON memofiches(level);
CREATE INDEX IF NOT EXISTS idx_memofiches_published ON memofiches(is_published);
CREATE INDEX IF NOT EXISTS idx_memofiches_created_at ON memofiches(created_at);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_memofiches_updated_at 
    BEFORE UPDATE ON memofiches 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE memofiches ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture des mémofiches publiées
CREATE POLICY "Allow read published memofiches" ON memofiches
    FOR SELECT USING (is_published = true);

-- Politique pour permettre toutes les opérations aux administrateurs
CREATE POLICY "Allow all operations for admins" ON memofiches
    FOR ALL USING (auth.role() = 'admin' OR created_by = auth.uid()::text);

-- Création du bucket de stockage pour les fichiers audio
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audio-files', 'audio-files', true)
ON CONFLICT (id) DO NOTHING;

-- Politique de stockage pour les fichiers audio
CREATE POLICY "Allow audio upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'audio-files');

CREATE POLICY "Allow audio read" ON storage.objects
    FOR SELECT USING (bucket_id = 'audio-files');

CREATE POLICY "Allow audio delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'audio-files');

-- Commentaires pour la documentation
COMMENT ON TABLE memofiches IS 'Table pour stocker les mémofiches éducatives générées par IA';
COMMENT ON COLUMN memofiches.id IS 'Identifiant unique de la mémofiche';
COMMENT ON COLUMN memofiches.title IS 'Titre principal de la mémofiche';
COMMENT ON COLUMN memofiches.subtitle IS 'Sous-titre ou contexte';
COMMENT ON COLUMN memofiches.description IS 'Description courte de la mémofiche';
COMMENT ON COLUMN memofiches.theme IS 'Thème de la mémofiche (maladies-courantes, ordonnances, etc.)';
COMMENT ON COLUMN memofiches.level IS 'Niveau d''apprentissage (Débutant, Intermédiaire, Avancé)';
COMMENT ON COLUMN memofiches.content IS 'Contenu structuré de la mémofiche en JSON';
COMMENT ON COLUMN memofiches.learning_objectives IS 'Objectifs d''apprentissage';
COMMENT ON COLUMN memofiches.estimated_duration IS 'Durée estimée d''apprentissage';
COMMENT ON COLUMN memofiches.youtube_url IS 'Lien vers une vidéo YouTube associée';
COMMENT ON COLUMN memofiches.kahoot_url IS 'Lien vers un quiz Kahoot associé';
COMMENT ON COLUMN memofiches.audio_files IS 'URLs des fichiers audio/podcast associés';
COMMENT ON COLUMN memofiches.metadata IS 'Métadonnées additionnelles (provider IA, tokens, etc.)';
COMMENT ON COLUMN memofiches.is_published IS 'Indique si la mémofiche est publiée et visible';
COMMENT ON COLUMN memofiches.created_by IS 'ID de l''utilisateur qui a créé la mémofiche';
