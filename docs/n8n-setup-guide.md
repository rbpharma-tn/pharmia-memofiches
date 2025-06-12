# 🤖 Guide d'Installation et Configuration n8n pour PharmIA

## 📋 Vue d'ensemble

Ce guide vous explique comment installer et configurer n8n pour automatiser complètement la génération de mémofiches PharmIA.

## 🚀 Installation n8n

### Option 1 : Installation Globale (Recommandée)
```bash
# Installation n8n
npm install -g n8n

# Démarrage
n8n start
```

### Option 2 : Utilisation du Script
```bash
# Rendre le script exécutable
chmod +x pharmia-memofiches/scripts/start-n8n.sh

# Lancer n8n
./pharmia-memofiches/scripts/start-n8n.sh
```

## 🔧 Configuration Initiale

### 1. Premier Démarrage
1. Ouvrez http://localhost:5678
2. Créez un compte administrateur
3. Configurez votre workspace

### 2. Import du Workflow
1. Cliquez sur "+" pour créer un nouveau workflow
2. Cliquez sur "..." → "Import from file"
3. Sélectionnez `pharmia-memofiches/n8n-workflows/complete-memofiche-generator.json`
4. Le workflow sera importé avec tous les nœuds

## ⚙️ Configuration des Credentials

### 1. OpenAI API
1. Allez dans "Credentials" → "Add Credential"
2. Sélectionnez "OpenAI API"
3. Ajoutez votre clé API OpenAI
4. Testez la connexion

### 2. Google Gemini API
1. Ajoutez une nouvelle credential "Google Gemini"
2. Configurez votre clé API Gemini
3. Testez la connexion

### 3. Supabase (Optionnel)
1. Ajoutez credential "Supabase"
2. URL du projet : votre URL Supabase
3. Service Role Key : votre clé de service
4. Testez la connexion

## 🔗 Configuration du Webhook

### 1. Activation du Webhook
1. Dans le workflow, cliquez sur le nœud "Webhook Génération"
2. Copiez l'URL du webhook (ex: http://localhost:5678/webhook/generate-complete-memofiche)
3. Activez le workflow

### 2. Configuration PharmIA
Ajoutez dans votre `.env.local` :
```env
N8N_WEBHOOK_URL=http://localhost:5678/webhook
```

## 🎯 Test du Workflow

### 1. Test Direct via n8n
1. Cliquez sur "Execute Workflow" dans n8n
2. Ajoutez des données de test :
```json
{
  "topic": "Candidose vulvo-vaginale",
  "knowledgeBase": "Documentation test...",
  "targetLevel": "Débutant",
  "theme": "maladies-courantes",
  "therapeutic_area": "Gynécologie",
  "provider": "openai"
}
```

### 2. Test via PharmIA
1. Allez sur http://localhost:3002/admin
2. Sélectionnez "🤖 Workflow n8n (Complet)"
3. Générez une mémofiche
4. Vérifiez les logs dans n8n

## 📊 Monitoring et Logs

### 1. Exécutions
- Consultez l'onglet "Executions" dans n8n
- Analysez les logs de chaque nœud
- Identifiez les erreurs éventuelles

### 2. Debugging
- Activez le mode debug dans n8n
- Consultez les données entre chaque nœud
- Vérifiez les transformations JSON

## 🔄 Workflow Détaillé

### Nœuds du Pipeline :
1. **Webhook** → Réception des données
2. **Processeur** → Validation et préparation
3. **Sélecteur** → Choix OpenAI/Gemini
4. **Générateur IA** → Création du contenu
5. **Processeur Contenu** → Validation et enrichissement
6. **Sauvegarde** → Base de données
7. **Variantes** → Génération optionnelle
8. **Réponse** → Retour à PharmIA

### Avantages :
- ✅ **Traçabilité complète** de chaque génération
- ✅ **Reproductibilité** des processus
- ✅ **Monitoring** en temps réel
- ✅ **Scalabilité** automatique
- ✅ **Gestion d'erreurs** robuste
- ✅ **Logs détaillés** pour debugging

## 🚨 Dépannage

### Problèmes Courants :

#### 1. Webhook non accessible
```bash
# Vérifier que n8n écoute sur le bon port
netstat -tlnp | grep 5678

# Redémarrer n8n
n8n start
```

#### 2. Erreurs API
- Vérifiez vos clés API dans les credentials
- Testez les connexions individuellement
- Consultez les quotas API

#### 3. Erreurs de parsing JSON
- Vérifiez le format des données d'entrée
- Consultez les logs du nœud "Processeur de Contenu"
- Validez la structure JSON générée par l'IA

## 📈 Optimisations

### 1. Performance
- Configurez le cache n8n
- Optimisez les timeouts
- Parallélisez les variantes

### 2. Sécurité
- Utilisez HTTPS en production
- Configurez l'authentification webhook
- Chiffrez les credentials sensibles

## 🔮 Évolutions Futures

### Fonctionnalités Prévues :
- **Génération batch** de mémofiches
- **Intégration Slack** pour notifications
- **Analytics** avancées
- **A/B Testing** des prompts
- **Auto-amélioration** des contenus

## 📞 Support

En cas de problème :
1. Consultez les logs n8n
2. Vérifiez la configuration des credentials
3. Testez chaque nœud individuellement
4. Consultez la documentation n8n officielle

---

**Le workflow n8n transforme PharmIA en une plateforme de génération industrielle !** 🚀
