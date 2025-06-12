// Exemple pour démontrer l'usage de Qwen Coder avec PharmIA
import React, { useState } from 'react'

// TODO: Demander à Qwen Coder d'améliorer ce composant
interface MemoficheProps {
  title: string
  content: any
  level: string
}

// Composant basique à optimiser avec Qwen Coder
function MemoficheViewer(props: MemoficheProps) {
  const [expanded, setExpanded] = useState(false)
  
  // TODO: Ajouter la gestion d'erreurs
  // TODO: Optimiser les performances
  // TODO: Améliorer l'accessibilité
  
  return (
    <div>
      <h2>{props.title}</h2>
      <p>Niveau: {props.level}</p>
      
      {expanded && (
        <div>
          {/* TODO: Affichage du contenu à améliorer */}
          <pre>{JSON.stringify(props.content, null, 2)}</pre>
        </div>
      )}
      
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Réduire' : 'Développer'}
      </button>
    </div>
  )
}

// Fonction à optimiser avec Qwen Coder
async function fetchMemofiche(id: string) {
  // TODO: Gestion d'erreurs
  // TODO: Cache
  // TODO: Types TypeScript
  
  const response = await fetch(`/api/memofiches/${id}`)
  return response.json()
}

export default MemoficheViewer
