#!/bin/bash

# Script de test des APIs PharmIA
echo "🧪 Test des APIs PharmIA..."

BASE_URL="http://localhost:3003"

echo ""
echo "📋 1. Test de génération OpenAI..."
curl -X POST "$BASE_URL/api/generate/openai" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Test Candidose",
    "knowledgeBase": "Documentation de test pour candidose vulvo-vaginale...",
    "targetLevel": "Débutant",
    "theme": "maladies-courantes",
    "therapeutic_area": "Gynécologie"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.success, .provider, .demo_mode' 2>/dev/null || echo "Réponse reçue"

echo ""
echo "📋 2. Test de génération Gemini..."
curl -X POST "$BASE_URL/api/generate/gemini" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Test Hypertension",
    "knowledgeBase": "Documentation de test pour hypertension artérielle...",
    "targetLevel": "Intermédiaire",
    "theme": "maladies-courantes",
    "therapeutic_area": "Cardiologie"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.success, .provider, .demo_mode' 2>/dev/null || echo "Réponse reçue"

echo ""
echo "📋 3. Test de génération n8n..."
curl -X POST "$BASE_URL/api/generate/n8n" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Test Workflow n8n",
    "knowledgeBase": "Documentation de test pour workflow n8n...",
    "targetLevel": "Avancé",
    "theme": "maladies-courantes",
    "therapeutic_area": "Pharmacologie",
    "provider": "openai"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.success, .workflow, .demo_mode' 2>/dev/null || echo "Réponse reçue"

echo ""
echo "📋 4. Test de sauvegarde..."
curl -X POST "$BASE_URL/api/memofiches" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_memofiche_'$(date +%s)'",
    "title": "Test Sauvegarde",
    "subtitle": "Test - Formation Test",
    "description": "Mémofiche de test pour vérifier la sauvegarde",
    "theme": "test",
    "level": "Débutant",
    "content": {
      "memo": [{"id": "test", "title": "Test", "content": "Contenu de test"}],
      "flashcards": [],
      "quiz": [],
      "glossary": [],
      "key_points": [],
      "practical_tips": []
    },
    "learning_objectives": ["Tester la sauvegarde"],
    "estimated_duration": "5 minutes"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.success, .message, .demo_mode' 2>/dev/null || echo "Réponse reçue"

echo ""
echo "📋 5. Test de récupération..."
curl -X GET "$BASE_URL/api/memofiches?limit=5" \
  -w "\nStatus: %{http_code}\n" \
  -s | jq '.success, .count, .demo_mode' 2>/dev/null || echo "Réponse reçue"

echo ""
echo "✅ Tests terminés !"
echo ""
echo "🔗 URLs de test :"
echo "   - Interface admin: $BASE_URL/admin"
echo "   - Mémofiches: $BASE_URL/memofiches"
echo "   - Page d'accueil: $BASE_URL"
