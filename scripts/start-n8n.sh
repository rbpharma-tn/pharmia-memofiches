#!/bin/bash

# Script de démarrage n8n pour PharmIA
echo "🤖 Démarrage de n8n pour PharmIA..."

# Vérifier si n8n est installé
if ! command -v n8n &> /dev/null; then
    echo "❌ n8n n'est pas installé. Installation en cours..."
    npm install -g n8n
fi

# Configuration des variables d'environnement pour n8n
export N8N_HOST=localhost
export N8N_PORT=5678
export N8N_PROTOCOL=http
export WEBHOOK_URL=http://localhost:5678/webhook

# Créer le dossier de configuration n8n s'il n'existe pas
mkdir -p ~/.n8n

echo "✅ Configuration n8n :"
echo "   - Host: $N8N_HOST"
echo "   - Port: $N8N_PORT"
echo "   - Webhook URL: $WEBHOOK_URL"
echo ""

echo "🚀 Démarrage de n8n..."
echo "   Interface accessible sur: http://localhost:5678"
echo ""
echo "📋 Instructions :"
echo "   1. Ouvrez http://localhost:5678 dans votre navigateur"
echo "   2. Créez un compte administrateur"
echo "   3. Importez le workflow depuis: pharmia-memofiches/n8n-workflows/complete-memofiche-generator.json"
echo "   4. Configurez vos clés API OpenAI et Gemini"
echo "   5. Activez le workflow"
echo ""

# Démarrer n8n
n8n start
