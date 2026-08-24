# Brief PostHog — StatsGym, sondage v2

Ce document est la référence analytique du questionnaire publié dans la démo StatsGym. Le contrat actif est identifié par `survey: new-sondage` et `survey_schema_version: 2`. Les anciens événements restent conservés, mais les graphiques du questionnaire actif filtrent la version 2.

## Confidentialité

PostHog analyse le produit et les réponses structurées, sans créer de profil utilisateur (`person_profiles: never`, `$process_person_profile: false`). L’autocapture et l’enregistrement de session restent désactivés.

Ne jamais envoyer à PostHog : prénom, nom, e-mail, idée ou texte libre, inscription à la liste d’attente, `submission_id`, adresse IP ou terme de recherche brut. Le nom du club est autorisé dans l’événement de réponse, mais ne doit être utilisé dans aucun graphique, filtre ou ventilation.

## Événements actifs

| Événement | Origine | Propriétés principales |
| --- | --- | --- |
| `survey_step_viewed` | navigateur | version, numéro et nom d’étape, profil et libellé si connus |
| `survey_step_completed` | navigateur | mêmes propriétés |
| `survey_response_submitted` | fonction Supabase, après insertion | réponses structurées et libellés français ; `source: supabase_edge` |
| `survey_submission_failed` | navigateur | étape, profil et `error_code` contrôlé, jamais le message d’erreur brut |
| `survey_share_prompt_viewed` | navigateur | profil, méthode `prompt`, identifiant de partage aléatoire si disponible |
| `survey_share_started` | navigateur | méthode `instagram_story` ou `native_share` |
| `survey_share_handoff` | navigateur | ouverture réussie de la feuille de partage ; ne prouve pas la publication |
| `shared_demo_opened` | navigateur | campagne, canal et identifiant de partage aléatoire |

La soumission est émise côté Supabase une seule fois pour une nouvelle insertion. Un échec ou un délai PostHog ne transforme jamais une réponse stockée en échec utilisateur. Le navigateur transmet les identifiants anonymes PostHog (`distinct_id` et session) pour rattacher l’événement serveur au parcours, sans employer `submission_id`.

## Réponses et libellés

Tous les graphiques utilisent les propriétés `*_label` ; les valeurs techniques restent disponibles uniquement pour la compatibilité.

- Profils : Gymnaste, Parent, Entraîneur, Club.
- Contexte : niveau de pratique pour gymnaste/parent, nombre de gymnastes encadrés pour entraîneur, nombre de licenciés pour club.
- Fonctionnalités : Historique des compétitions, Repères par agrès, Palmarès, Progression dans le temps, Comparer deux gymnastes. Chaque note utilise `1 — Pas du tout utile`, `2`, `3`, `4`, `5 — Indispensable`.
- Compréhension : absente pour les clubs ; `1 — Pas du tout` à `5 — Tout à fait` pour les autres profils.
- Préférence : absente pour les clubs ; Une vue plus simple, L’équilibre actuel me convient, Des graphiques et analyses plus poussés.

### Étape « Attentes »

Les libellés complets du formulaire sont la source de vérité et sont envoyés dans `access_model_label`.

- Gymnaste : version actuelle, gymnastes internationaux, progression à l’entraînement, vidéo associée aux notes.
- Parent : version actuelle pour son enfant, gymnastes internationaux, progrès à l’entraînement, vidéo associée aux notes.
- Entraîneur : version actuelle, options avancées payantes, application pour coachs, financement par le club.
- Club : version actuelle, analyse payante des performances du club, outil de suivi pour les coachs, aucune utilité.

Les budgets ne sont demandés que pour `premium_options` (1–10 €/mois), `coach_app` (5–20 €/mois), `club_analytics` et `coach_tools` (50 € à 200 € et plus/an). Les graphiques utilisent `price_range_label` et `price_period_label`.

## Dashboards

- **StatsGym — Audience** : visiteurs, disciplines et usage global de la démo.
- **StatsGym — Gymnastes & onglets** : fiches, onglets et engagement.
- **StatsGym — Sondage** : funnel depuis la vue de l’étape 1 jusqu’à la réponse serveur, réponses v2 et erreurs. Tous les insights de réponse filtrent `survey_schema_version = 2` et peuvent être filtrés par `profile_label` sans comparer par défaut les petits groupes.
- **StatsGym — Partage** : invitation, démarrage, feuille de partage et arrivées attribuées. Aucun événement de copie ou téléchargement n’est attendu tant que l’interface ne propose pas ces actions.

Le nom du club n’apparaît dans aucun dashboard. Les événements historiques ne sont pas supprimés.

## Validation après déploiement

1. Vérifier la migration et le déploiement de la fonction Supabase.
2. Vérifier que le client n’émet plus `survey_response_submitted`.
3. Sur la première réponse organique v2, vérifier les libellés français, `source: supabase_edge`, le rattachement de session et l’absence des propriétés interdites.
4. Exécuter tous les insights des dashboards Sondage et Partage et contrôler leurs filtres, titres et descriptions.
