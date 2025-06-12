// Exemple de composant PharmIA à améliorer avec Qwen Coder
import React, { useState } from 'react'

// Composant simple pour afficher une mémofiche
function MemoficheCard(props) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      
      {isExpanded && (
        <div>
          <h4>Contenu:</h4>
          {props.content.memo.map((section, index) => (
            <div key={index}>
              <h5>{section.title}</h5>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Réduire' : 'Développer'}
      </button>
    </div>
  )
}

// Fonction pour générer une mémofiche (à améliorer)
async function generateMemofiche(topic, knowledgeBase) {
  try {
    const response = await fetch('/api/generate/together', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topic,
        knowledgeBase: knowledgeBase,
        targetLevel: 'Débutant',
        theme: 'Ordonnances',
        therapeutic_area: 'Gynécologie'
      })
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur:', error)
    return null
  }
}

export default MemoficheCard
