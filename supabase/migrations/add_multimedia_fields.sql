-- Migration pour ajouter les champs multimédia aux mémofiches
-- Date: 2024-01-XX
-- Description: Ajout des champs image_url, audio_url et champs multimédia pour les sections

-- Ajouter les champs multimédia principaux à la table memofiches
ALTER TABLE memofiches 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS audio_url TEXT;

-- Ajouter des commentaires pour documenter les nouveaux champs
COMMENT ON COLUMN memofiches.image_url IS 'URL Google Drive de l''image principale de la mémofiche';
COMMENT ON COLUMN memofiches.audio_url IS 'URL Google Drive du fichier audio principal (podcast)';

-- Supprimer l'ancien champ audio_files s'il existe (remplacé par audio_url)
ALTER TABLE memofiches DROP COLUMN IF EXISTS audio_files;

-- Mise à jour des contraintes et index si nécessaire
-- (Les URLs peuvent être NULL, donc pas de contrainte NOT NULL)

-- Exemple de mise à jour des données existantes si nécessaire
-- UPDATE memofiches SET image_url = NULL WHERE image_url = '';
-- UPDATE memofiches SET audio_url = NULL WHERE audio_url = '';

-- Vérification de la structure finale
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'memofiches' 
-- ORDER BY ordinal_position;
