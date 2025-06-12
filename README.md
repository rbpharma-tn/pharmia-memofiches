# 💊 PharmIA - Mémofiches Cas Comptoir à l'Officine

**Micro-apprentissage adaptatif et personnalisé du personnel de la pharmacie à travers des cas comptoir 100% pratiques**

Plateforme interactive et éducative pour les professionnels de la pharmacie permettant de réviser et d'approfondir leurs connaissances sur des sujets clés rencontrés au comptoir de l'officine.

## 🚀 Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Supabase** - Base de données PostgreSQL et authentification
- **Lucide React** - Icônes
- **Together AI** - Intelligence artificielle pour la génération de mémofiches
- **n8n** - Automatisation des workflows (optionnel)

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd pharmia-memofiches
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Supabase**

### Créer un projet Supabase
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter l'URL du projet et la clé API anonyme

### Configurer les variables d'environnement
1. Copier le fichier `.env.example` vers `.env.local`
```bash
cp .env.example .env.local
```

2. Remplir les variables dans `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Initialiser la base de données
1. Dans le dashboard Supabase, aller dans l'éditeur SQL
2. Exécuter le contenu du fichier `supabase/migrations/001_initial_schema.sql`
3. Exécuter le contenu du fichier `supabase/migrations/002_rls_policies.sql`
4. (Optionnel) Exécuter le contenu du fichier `supabase/seed.sql` pour les données de test

4. **Obtenir une clé API Google Gemini**
1. Aller sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créer une nouvelle clé API
3. L'ajouter dans `.env.local`

## 🏃‍♂️ Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)
