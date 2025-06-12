# Configuration n8n pour PharmIA

## 🚀 Installation et Configuration

### 1. Installation de n8n

```bash
# Installation globale
npm install n8n -g

# Ou avec Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. Configuration des Variables d'Environnement

Créer un fichier `.env` dans le dossier n8n :

```env
# Configuration de base
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=pharmia_admin_2024

# Base de données
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=pharmia_n8n
DB_POSTGRESDB_USER=postgres
DB_POSTGRESDB_PASSWORD=your_password

# Webhooks
WEBHOOK_URL=https://your-domain.com/webhook/

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Import des Workflows

1. Accéder à l'interface n8n : `http://localhost:5678`
2. Aller dans **Workflows** > **Import from file**
3. Importer les fichiers JSON depuis `/n8n-workflows/`

## 🤖 Workflows Disponibles

### 1. Générateur de Mémofiches (`memofiche-generator.json`)

**Déclencheur :** Webhook POST `/generate-memofiche`

**Paramètres d'entrée :**
```json
{
  "topic": "Candidose vulvo-vaginale",
  "theme": "maladies-courantes", 
  "level": "Débutant",
  "therapeutic_area": "Gynécologie"
}
```

**Fonctionnalités :**
- Génération automatique de contenu avec OpenAI
- Structuration en sections pédagogiques
- Sauvegarde en base de données
- Évaluation automatique du niveau

### 2. Évaluation Niveau Apprenant (`learner-assessment.json`)

**Déclencheur :** Webhook POST `/assess-learner`

**Paramètres d'entrée :**
```json
{
  "user_id": "user_123"
}
```

**Fonctionnalités :**
- Analyse des données de progression
- Calcul du niveau suggéré
- Recommandations personnalisées IA
- Génération de parcours d'apprentissage

### 3. Moteur de Gamification (`gamification-engine.json`)

**Déclencheur :** Webhook POST `/gamification-event`

**Paramètres d'entrée :**
```json
{
  "user_id": "user_123",
  "event_type": "memofiche_completed",
  "data": {
    "memofiche_id": "1",
    "score": 95,
    "completion_time": 240,
    "theme": "maladies-courantes"
  }
}
```

**Fonctionnalités :**
- Calcul automatique des points
- Gestion des badges et achievements
- Suivi des streaks
- Notifications en temps réel

## 🔧 Configuration des Nœuds

### OpenAI Node

1. **Credentials :** Ajouter votre clé API OpenAI
2. **Model :** gpt-4 ou gpt-3.5-turbo
3. **Temperature :** 0.7 pour la créativité, 0.3 pour la précision

### Supabase Node

1. **URL :** Votre URL de projet Supabase
2. **Service Role Key :** Pour les opérations d'écriture
3. **Tables :** memofiches, user_progress, learner_assessments, user_gamification

### Webhook Nodes

1. **Path :** Définir les chemins d'API
2. **HTTP Method :** POST pour la plupart des workflows
3. **Response Mode :** responseNode pour les réponses personnalisées

## 📊 Schéma de Base de Données

### Table `memofiches`
```sql
CREATE TABLE memofiches (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  theme TEXT,
  level TEXT,
  content JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by TEXT,
  is_published BOOLEAN DEFAULT FALSE
);
```

### Table `user_progress`
```sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  memofiche_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  time_spent INTEGER,
  theme TEXT,
  completed_at TIMESTAMP,
  FOREIGN KEY (memofiche_id) REFERENCES memofiches(id)
);
```

### Table `learner_assessments`
```sql
CREATE TABLE learner_assessments (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  current_level TEXT,
  confidence_score DECIMAL,
  assessment_data JSONB,
  assessed_at TIMESTAMP DEFAULT NOW()
);
```

### Table `user_gamification`
```sql
CREATE TABLE user_gamification (
  user_id TEXT PRIMARY KEY,
  total_points INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  badges TEXT[],
  achievements JSONB,
  streak_count INTEGER DEFAULT 0,
  last_activity TIMESTAMP
);
```

## 🔄 Intégration avec l'Application

### Appels API depuis Next.js

```typescript
// Générer une mémofiche
const generateMemofiche = async (data: any) => {
  const response = await fetch('http://localhost:5678/webhook/generate-memofiche', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

// Évaluer un apprenant
const assessLearner = async (userId: string) => {
  const response = await fetch('http://localhost:5678/webhook/assess-learner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId })
  });
  return response.json();
};

// Événement de gamification
const triggerGamification = async (event: any) => {
  const response = await fetch('http://localhost:5678/webhook/gamification-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });
  return response.json();
};
```

## 🚀 Déploiement en Production

### 1. Configuration Docker Compose

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - WEBHOOK_URL=https://your-domain.com/
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres

  postgres:
    image: postgres:13
    restart: always
    environment:
      - POSTGRES_DB=pharmia_n8n
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  n8n_data:
  postgres_data:
```

### 2. Sécurité

- Utiliser HTTPS en production
- Configurer l'authentification forte
- Limiter l'accès aux webhooks
- Chiffrer les données sensibles
- Sauvegarder régulièrement les workflows

## 📈 Monitoring et Maintenance

### Métriques à Surveiller

1. **Taux de succès des workflows**
2. **Temps d'exécution moyen**
3. **Utilisation des ressources**
4. **Erreurs et exceptions**

### Logs Importants

```bash
# Logs n8n
docker logs n8n_container

# Monitoring des webhooks
tail -f /var/log/n8n/webhooks.log
```

## 🔧 Dépannage

### Problèmes Courants

1. **Webhook non accessible :** Vérifier la configuration réseau
2. **Erreurs OpenAI :** Contrôler les quotas et la clé API
3. **Base de données :** Vérifier les connexions Supabase
4. **Timeouts :** Ajuster les délais d'attente

### Support

- Documentation n8n : https://docs.n8n.io/
- Community : https://community.n8n.io/
- GitHub : https://github.com/n8n-io/n8n
