import type { Memofiche } from '@/types'

// Données de test pour le développement
export const mockMemofiches: Memofiche[] = [
  {
    id: '1',
    title: 'Candidose vulvo-vaginale',
    subtitle: 'Gynécologie',
    description: 'Prise en charge et conseils pour la candidose vulvo-vaginale. Apprenez à identifier les symptômes, comprendre les causes et proposer les traitements appropriés.',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Définition et épidémiologie',
          content: 'La candidose vulvo-vaginale est une infection fongique très fréquente chez la femme. Elle touche 75% des femmes au moins une fois dans leur vie.',
          children: [
            {
              id: 'subsection1',
              type: 'section',
              title: 'Agent pathogène',
              content: 'Candida albicans est responsable de 85-90% des cas. Candida glabrata, C. tropicalis et C. krusei peuvent également être impliqués.'
            }
          ]
        },
        {
          id: 'section2',
          type: 'section',
          title: 'Symptômes',
          content: 'Prurit vulvaire intense, leucorrhées blanches épaisses (aspect cottage cheese), dyspareunie, brûlures mictionnelles.',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Quel est l\'agent pathogène principal de la candidose vulvo-vaginale ?',
          answer: 'Candida albicans (85-90% des cas)'
        },
        {
          id: 'card2',
          question: 'Quels sont les symptômes principaux ?',
          answer: 'Prurit vulvaire intense, leucorrhées blanches épaisses, dyspareunie, brûlures mictionnelles'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Quelle est la prévalence de la candidose vulvo-vaginale chez la femme ?',
          options: ['25% des femmes', '50% des femmes', '75% des femmes', '90% des femmes'],
          correct_answer: 2,
          explanation: '75% des femmes sont touchées au moins une fois dans leur vie par une candidose vulvo-vaginale.'
        }
      ],
      glossary: [
        {
          id: 'term1',
          term: 'Dyspareunie',
          definition: 'Douleur ressentie lors des rapports sexuels'
        },
        {
          id: 'term2',
          term: 'Leucorrhées',
          definition: 'Écoulements vaginaux anormaux'
        }
      ],
      youtube_videos: [
        {
          id: 'video1',
          title: 'Candidose vulvo-vaginale : diagnostic et traitement',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
      ]
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    created_by: 'system',
    is_published: true
  },
  {
    id: '2',
    title: 'Cystite aiguë simple',
    subtitle: 'Urologie',
    description: 'Prise en charge de la cystite aiguë simple chez la femme. Diagnostic, traitement et conseils de prévention.',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Définition',
          content: 'Infection urinaire basse touchant la vessie, très fréquente chez la femme jeune sexuellement active.',
          children: []
        },
        {
          id: 'section2',
          type: 'section',
          title: 'Symptômes',
          content: 'Brûlures mictionnelles, pollakiurie, urgences mictionnelles, douleurs sus-pubiennes.',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Quels sont les symptômes de la cystite ?',
          answer: 'Brûlures mictionnelles, pollakiurie, urgences mictionnelles, douleurs sus-pubiennes'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Quel est le principal agent pathogène de la cystite ?',
          options: ['Staphylococcus aureus', 'Escherichia coli', 'Candida albicans', 'Streptococcus'],
          correct_answer: 1,
          explanation: 'Escherichia coli est responsable de 80-85% des cystites aiguës simples.'
        }
      ],
      glossary: [
        {
          id: 'term1',
          term: 'Pollakiurie',
          definition: 'Augmentation de la fréquence des mictions'
        }
      ]
    },
    created_at: '2024-01-16T14:30:00Z',
    updated_at: '2024-01-16T14:30:00Z',
    created_by: 'system',
    is_published: true
  },
  {
    id: '3',
    title: 'Dysménorrhées',
    subtitle: 'Gynécologie',
    description: 'Prise en charge des dysménorrhées primaires et secondaires. Conseils thérapeutiques et non médicamenteux.',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Classification',
          content: 'Les dysménorrhées se divisent en primaires (sans pathologie sous-jacente) et secondaires (liées à une pathologie).',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Quelle est la différence entre dysménorrhée primaire et secondaire ?',
          answer: 'Primaire : sans pathologie sous-jacente. Secondaire : liée à une pathologie (endométriose, fibromes...)'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Quel est le traitement de première intention des dysménorrhées primaires ?',
          options: ['Paracétamol', 'AINS', 'Antispasmodiques', 'Opiacés'],
          correct_answer: 1,
          explanation: 'Les AINS sont le traitement de première intention car ils inhibent la synthèse des prostaglandines.'
        }
      ],
      glossary: [
        {
          id: 'term1',
          term: 'Dysménorrhée',
          definition: 'Douleurs pelviennes survenant pendant les règles'
        }
      ]
    },
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z',
    created_by: 'system',
    is_published: true
  },
  {
    id: '4',
    title: 'Analyse d\'ordonnance antibiotique',
    subtitle: 'Infectiologie',
    description: 'Vérification et dispensation des antibiotiques',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Points de contrôle',
          content: 'Vérification de la posologie, durée de traitement, interactions médicamenteuses et contre-indications.',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Quels sont les points clés à vérifier sur une ordonnance d\'antibiotique ?',
          answer: 'Posologie, durée, interactions, contre-indications, allergie patient'
        }
      ],
      quiz: [],
      glossary: []
    },
    created_at: '2024-01-18T11:00:00Z',
    updated_at: '2024-01-18T11:00:00Z',
    created_by: 'system',
    is_published: true
  },
  {
    id: '5',
    title: 'Ordonnance pédiatrique',
    subtitle: 'Pédiatrie',
    description: 'Spécificités de la dispensation en pédiatrie',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Calculs de dose',
          content: 'Calculs basés sur le poids et l\'âge de l\'enfant. Vérification des formes galéniques adaptées.',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Comment calculer une dose pédiatrique ?',
          answer: 'Dose = poids (kg) × dose/kg/jour, répartie selon la fréquence prescrite'
        }
      ],
      quiz: [],
      glossary: []
    },
    created_at: '2024-01-19T15:30:00Z',
    updated_at: '2024-01-19T15:30:00Z',
    created_by: 'system',
    is_published: true
  },
  {
    id: '6',
    title: 'Compléments en fer',
    subtitle: 'Hématologie',
    description: 'Conseil et suivi des supplémentations en fer',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Indications',
          content: 'Anémie ferriprive, carence martiale, besoins accrus (grossesse, croissance).',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Quand prescrire une supplémentation en fer ?',
          answer: 'Anémie ferriprive confirmée, carence martiale, grossesse, croissance'
        }
      ],
      quiz: [],
      glossary: []
    },
    created_at: '2024-01-20T08:45:00Z',
    updated_at: '2024-01-20T08:45:00Z',
    created_by: 'system',
    is_published: true
  },
  {
    id: '7',
    title: 'Soins anti-âge',
    subtitle: 'Dermatologie',
    description: 'Conseils cosmétiques pour le vieillissement cutané',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Actifs anti-âge',
          content: 'Rétinol, acide hyaluronique, vitamine C, peptides. Conseils d\'utilisation et précautions.',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Quels sont les principaux actifs anti-âge ?',
          answer: 'Rétinol, acide hyaluronique, vitamine C, peptides, AHA/BHA'
        }
      ],
      quiz: [],
      glossary: []
    },
    created_at: '2024-01-21T16:20:00Z',
    updated_at: '2024-01-21T16:20:00Z',
    created_by: 'system',
    is_published: true
  },
  {
    id: '8',
    title: 'Antiparasitaires chien/chat',
    subtitle: 'Parasitologie vétérinaire',
    description: 'Prévention et traitement des parasites',
    image_url: null,
    content: {
      memo: [
        {
          id: 'section1',
          type: 'section',
          title: 'Types de parasites',
          content: 'Puces, tiques, vers intestinaux. Choix du traitement selon l\'animal et l\'environnement.',
          children: []
        }
      ],
      flashcards: [
        {
          id: 'card1',
          question: 'Quels sont les principaux parasites externes chez le chien et le chat ?',
          answer: 'Puces, tiques, acariens, poux'
        }
      ],
      quiz: [],
      glossary: []
    },
    created_at: '2024-01-22T10:10:00Z',
    updated_at: '2024-01-22T10:10:00Z',
    created_by: 'system',
    is_published: true
  }
]

// Fonction pour simuler un délai réseau
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Fonctions mock pour remplacer les appels à la base de données
export async function getMockMemofiches(): Promise<Memofiche[]> {
  await delay(500) // Simuler un délai réseau
  return mockMemofiches
}

export async function getMockMemofiche(id: string): Promise<Memofiche | null> {
  await delay(300)
  return mockMemofiches.find(m => m.id === id) || null
}
