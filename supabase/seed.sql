-- Insert sample memofiches
INSERT INTO public.memofiches (id, title, subtitle, description, content, is_published) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Candidose vulvo-vaginale',
    'Conseils à l''officine',
    'Prise en charge et conseils pour la candidose vulvo-vaginale',
    '{
        "memo": [
            {
                "id": "section1",
                "type": "section",
                "title": "Définition et épidémiologie",
                "content": "La candidose vulvo-vaginale est une infection fongique très fréquente chez la femme. Elle touche 75% des femmes au moins une fois dans leur vie.",
                "children": [
                    {
                        "id": "subsection1",
                        "type": "section",
                        "title": "Agent pathogène",
                        "content": "Candida albicans est responsable de 85-90% des cas. Candida glabrata, C. tropicalis et C. krusei peuvent également être impliqués."
                    }
                ]
            },
            {
                "id": "section2",
                "type": "section",
                "title": "Symptômes",
                "content": "Prurit vulvaire intense, leucorrhées blanches épaisses (aspect cottage cheese), dyspareunie, brûlures mictionnelles.",
                "children": []
            }
        ],
        "flashcards": [
            {
                "id": "card1",
                "question": "Quel est l''agent pathogène principal de la candidose vulvo-vaginale ?",
                "answer": "Candida albicans (85-90% des cas)"
            },
            {
                "id": "card2",
                "question": "Quels sont les symptômes principaux ?",
                "answer": "Prurit vulvaire intense, leucorrhées blanches épaisses, dyspareunie, brûlures mictionnelles"
            }
        ],
        "quiz": [
            {
                "id": "q1",
                "question": "Quelle est la prévalence de la candidose vulvo-vaginale chez la femme ?",
                "options": ["25% des femmes", "50% des femmes", "75% des femmes", "90% des femmes"],
                "correct_answer": 2,
                "explanation": "75% des femmes sont touchées au moins une fois dans leur vie par une candidose vulvo-vaginale."
            }
        ],
        "glossary": [
            {
                "id": "term1",
                "term": "Dyspareunie",
                "definition": "Douleur ressentie lors des rapports sexuels"
            },
            {
                "id": "term2",
                "term": "Leucorrhées",
                "definition": "Écoulements vaginaux anormaux"
            }
        ],
        "youtube_videos": [
            {
                "id": "video1",
                "title": "Candidose vulvo-vaginale : diagnostic et traitement",
                "url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
            }
        ]
    }',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Cystite aiguë simple',
    'Infection urinaire basse',
    'Prise en charge de la cystite aiguë simple chez la femme',
    '{
        "memo": [
            {
                "id": "section1",
                "type": "section",
                "title": "Définition",
                "content": "Infection urinaire basse touchant la vessie, très fréquente chez la femme jeune sexuellement active.",
                "children": []
            },
            {
                "id": "section2",
                "type": "section",
                "title": "Symptômes",
                "content": "Brûlures mictionnelles, pollakiurie, urgences mictionnelles, douleurs sus-pubiennes.",
                "children": []
            }
        ],
        "flashcards": [
            {
                "id": "card1",
                "question": "Quels sont les symptômes de la cystite ?",
                "answer": "Brûlures mictionnelles, pollakiurie, urgences mictionnelles, douleurs sus-pubiennes"
            }
        ],
        "quiz": [
            {
                "id": "q1",
                "question": "Quel est le principal agent pathogène de la cystite ?",
                "options": ["Staphylococcus aureus", "Escherichia coli", "Candida albicans", "Streptococcus"],
                "correct_answer": 1,
                "explanation": "Escherichia coli est responsable de 80-85% des cystites aiguës simples."
            }
        ],
        "glossary": [
            {
                "id": "term1",
                "term": "Pollakiurie",
                "definition": "Augmentation de la fréquence des mictions"
            }
        ]
    }',
    true
);

-- Insert glossary terms
INSERT INTO public.glossary_terms (term, definition, memofiche_id) VALUES
('Candidose', 'Infection fongique causée par des levures du genre Candida', '550e8400-e29b-41d4-a716-446655440001'),
('Prurit', 'Sensation de démangeaison', '550e8400-e29b-41d4-a716-446655440001'),
('Cystite', 'Inflammation de la vessie', '550e8400-e29b-41d4-a716-446655440002'),
('Miction', 'Action d''uriner', '550e8400-e29b-41d4-a716-446655440002');
