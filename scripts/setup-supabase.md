# Configuration Supabase - Guide étape par étape

## 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Cliquer sur "Start your project"
3. Se connecter avec GitHub (recommandé)
4. Cliquer sur "New project"
5. Choisir une organisation
6. Remplir les informations :
   - **Name**: `pharmia-memofiches`
   - **Database Password**: Générer un mot de passe fort (le noter !)
   - **Region**: Europe West (Ireland) ou la plus proche
   - **Pricing Plan**: Free tier (suffisant pour commencer)
7. Cliquer sur "Create new project"

## 2. Récupérer les clés API

Une fois le projet créé :

1. Aller dans **Settings** > **API**
2. Noter les informations suivantes :
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon public key**: `eyJ...` (clé publique)
   - **service_role key**: `eyJ...` (clé privée - à garder secrète !)

## 3. Configurer les variables d'environnement

1. Dans le projet, copier `.env.example` vers `.env.local` :
```bash
cp .env.example .env.local
```

2. Remplir `.env.local` avec vos vraies valeurs :
```env
# Remplacer par vos vraies valeurs Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optionnel pour l'instant (on configurera plus tard)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 4. Initialiser la base de données

1. Dans le dashboard Supabase, aller dans **SQL Editor**
2. Cliquer sur "New query"
3. Copier-coller le contenu de `supabase/migrations/001_initial_schema.sql`
4. Cliquer sur "Run" pour exécuter
5. Répéter avec `supabase/migrations/002_rls_policies.sql`
6. (Optionnel) Exécuter `supabase/seed.sql` pour les données de test

## 5. Vérifier la configuration

1. Dans **Table Editor**, vous devriez voir les tables :
   - `users`
   - `memofiches`
   - `user_progress`
   - `glossary_terms`

2. Dans **Authentication** > **Settings**, vérifier que :
   - "Enable email confirmations" est activé
   - "Enable email change confirmations" est activé

## 6. Configurer l'authentification

1. Dans **Authentication** > **URL Configuration** :
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: `http://localhost:3000/auth/callback`

2. Dans **Authentication** > **Email Templates**, personnaliser si nécessaire

## 7. Tester la configuration

1. Redémarrer le serveur de développement :
```bash
npm run dev
```

2. Aller sur `http://localhost:3000/memofiches`
3. Vérifier qu'il n'y a plus d'erreurs dans la console

## 8. Activer les vraies données

Une fois Supabase configuré, dans `src/app/memofiches/page.tsx` :

```typescript
// Remplacer cette ligne :
import { getMockMemofiches } from '@/lib/mock-data'

// Par celle-ci :
import { getMemofiches } from '@/lib/database'

// Et dans la fonction :
const memofiches = await getMemofiches() // au lieu de getMockMemofiches()
```

## Troubleshooting

### Erreur "Invalid URL"
- Vérifier que `NEXT_PUBLIC_SUPABASE_URL` est correct
- S'assurer qu'il n'y a pas d'espace ou de caractère en trop

### Erreur "Invalid API key"
- Vérifier que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correct
- S'assurer d'utiliser la clé `anon` et non `service_role` pour le client

### Tables non créées
- Vérifier que les scripts SQL ont été exécutés sans erreur
- Regarder les logs dans l'éditeur SQL de Supabase

### Problèmes RLS
- Vérifier que les politiques RLS ont été créées
- Tester avec un utilisateur authentifié
