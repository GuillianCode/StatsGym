# Audit de parité visuelle — démo StatsGym

## Référence et règle d’acceptation

- Référence canonique : `statsgym-main/new-sondage/index.html`, servie localement sur `http://127.0.0.1:8766/`.
- La version Netlify historique ne diffère que par l’absence de l’autoplay de la vidéo de remerciement ; le local, plus récent, fait foi.
- Viewports de contrôle : mobile `390 × 844` et ordinateur `1440 × 1000`.
- Cible : même rendu et mêmes comportements perceptibles. Le socle React, les contrats typés et la soumission sécurisée restent internes.
- Tolérance : géométrie à ±1 px et moins de 0,5 % de pixels différents hors réseau animé, vidéo et menus natifs du système.

## Matrice des différences et corrections

| Zone | Écart constaté avant correction | Comportement de référence | Correction | État |
|---|---|---|---|---|
| Shell profil | Largeur 720–760 px, fond gris/violet | Colonne 536 px, dégradé bleu continu | Largeur et fond alignés sur la référence | Corrigé |
| Typographie | Inter, graisse et interlignage différents | Pile SF/Apple et réglages optiques compacts | Tokens typographiques remplacés | Corrigé |
| Verre | Dégradés opaques et bordures bleutées | Blanc 8/14 %, bordure 16 %, blur 24 px | Matériau global unifié | Corrigé |
| En-tête | Sticky, retour dans un carré, avatar carré | Bulle mobile, chevron nu 26 px, avatar rond | Structure et dimensions restaurées | Corrigé |
| Scroll en-tête | En-tête toujours visible | Remonte avec le scroll de l’onglet actif | Translation liée au scroll propre à chaque page | Corrigé |
| Pages | Un seul onglet monté, état perdu | Cinq pages montées avec scroll indépendant | Piste persistante et pages conservées | Corrigé |
| Dock | Noir, 720 px, sélection statique | Verre bleu, 512 px, pastille glissante | Dock et indicateur mobile restaurés | Corrigé |
| Navigation | Pas de retour haut, historique incomplet | Appui sur onglet actif = haut, Escape et historique | Comportements restaurés | Corrigé |
| Réseau accueil | 88–160 points lents, traits fins | 140 points, vitesse 2, distance 160, traits 1,2 px | Paramètres de la toile alignés | Corrigé |
| Halos accueil | Fond radial différent | Deux halos violet/rose animés et atténués | Pseudo-éléments restaurés | Corrigé |
| Titre accueil | Graisse 700, statique | Graisse 900, tracking serré, shimmer 7 s | Typographie et animation restaurées | Corrigé |
| Sélecteur discipline | Trois fonds indépendants | Pastille unique, courbe iOS 460 ms | Indicateur glissant ajouté | Corrigé |
| Cartes accueil | Géométrie, couleurs et press states différents | Dimensions, verre et appui à 0,985 | Styles et micro-interactions alignés | Corrigé |
| Appel d’accès | Pas de pulse/flèches vivantes | Pulse 5 s et indications 1,4 s | Animations restaurées | Corrigé |
| Aperçu | Radar et cartes trop grands | Grille compacte 2 colonnes, radar 320 px | Géométrie compacte restaurée | Corrigé |
| KPI | Calculs et vocabulaire partiellement simplifiés | FIG courant, ND fort/faible, centile complet, podiums | Calculs et libellés restaurés | Corrigé |
| Régularité | Référentiel par paliers grossiers | 101 quantiles par discipline | Tables complètes portées | Corrigé |
| Radar | Libellés longs et maximum dynamique | Libellés courts, échelle 0–10, couleurs exactes | Configuration Chart.js alignée | Corrigé |
| Compétitions | 96 lignes brutes, doublons, filtre saison ajouté | 55 compétitions groupées par identifiant/date | Adaptateur de regroupement utilisé | Corrigé |
| Cartes compétition | Peu de métadonnées, score à 3 décimales | Saison, niveau, type, catégorie, extras, score à 2 décimales | Contenu des bandeaux restauré | Corrigé |
| Podiums/équipes | Rangs texte, aucun résultat de duel | Médailles et résultat gagné/perdu | États visuels restaurés | Corrigé |
| Détail compétition | Quatre champs simplifiés | Tableau NF/ND/NE/A/pénalité/bonus/rang, finales distinctes | Tableau complet et sections extras | Corrigé |
| Statistiques | Deux graphiques génériques | Trois panneaux repliables | Structure complète restaurée | Corrigé |
| Filtres statistiques | Un menu programme natif | Puces note/saison/programme dépendantes | Contrôles par panneau restaurés | Corrigé |
| Évolution | Moyenne NF par saison | Séries par agrès et date, légende interactive | Données et graphique multi-séries portés | Corrigé |
| Moyennes | Barres toutes bleues | Couleurs d’agrès, métrique sélectionnable | Palette et filtres restaurés | Corrigé |
| Saisons | Panneau absent | Tableau NE/E saison par saison | Tableau ajouté | Corrigé |
| Comparer initial | Partenaire présélectionné et radar visible | Carte partenaire seule avant sélection | Sélection explicite restaurée | Corrigé |
| Filtres comparer | Programme uniquement | Saison, programme, agrès/engin et type | Quatre filtres ajoutés | Corrigé |
| Duel | Absent | Huit KPI comparatifs bleu/orange | Grille de duel restaurée | Corrigé |
| Comparer par agrès | Radar seulement, second violet | Radar, barres, tableau, bleu/orange | Vues et couleurs restaurées | Corrigé |
| Comparer évolution | Absente | Deux courbes sur axe temporel commun | Panneau ajouté | Corrigé |
| Comparer saisons | Absent | Tableau saison par saison quand toutes sont choisies | Tableau ajouté | Corrigé |
| Sondage progression | Texte “Votre avis”, aucune étape cliquable | Cinq points, barre, retour aux étapes terminées | Progression restaurée | Corrigé |
| Sondage mise en page | Carte trop courte et footer incomplet | Stage 380 px et compteur à gauche | Dimensions et footer restaurés | Corrigé |
| Sondage textes | Descriptions et branches raccourcies | Copie complète par profil | Textes de référence rétablis | Corrigé |
| Sélecteurs sondage | Menus natifs | Menus verre animés avec focus et sélection | Composant personnalisé accessible | Corrigé |
| Validation | Erreur générique uniquement | Blocage par étape et retour visuel | Validation conservée, contrôles exposés | Corrigé |
| Rechargement sondage | État restauré par sessionStorage | Nouvelle visite sur l’étape 1 | Persistance visible supprimée | Corrigé |
| Remerciement | Erreurs de partage avalées | Préparation, disponibilité et statut annoncés | États de partage restaurés | Corrigé |
| Vidéo | Lecture potentiellement différée | Autoplay local après soumission | Autoplay conservé | Corrigé |
| Mouvement réduit | Partiel | Retour statique/crossfade, réseau masqué | Media queries complétées | Corrigé |

## Scénarios de non-régression

1. Ouvrir GAM, GAF et GR depuis l’accueil ; vérifier les noms, clubs, halos, pastille et absence de scroll.
2. Parcourir les cinq onglets, faire défiler chaque page, revenir en arrière et toucher l’onglet actif.
3. Vérifier les nombres de compétitions groupées et ouvrir une carte contenant une finale supplémentaire.
4. Manipuler chaque métrique, saison, programme et légende des statistiques.
5. Sélectionner le partenaire, parcourir tous les filtres et vérifier les états sans données ou programmes incompatibles.
6. Parcourir les cinq étapes du questionnaire pour les profils gymnaste, parent, entraîneur et club ; tester champs manquants et retour arrière.
7. Soumettre en local, vérifier l’autoplay, la préparation de la story et les deux menus de partage natifs.
8. Répéter en mode mouvement réduit, au clavier, en mobile et en ordinateur.

## Éléments exclus des diffs pixel à pixel

- Position instantanée des particules, image courante de la vidéo et chrome des menus de partage du système.
- Antialiasing des polices entre macOS, Windows et Linux.
- Changements internes sans effet perceptible : composants React, typage, idempotence et transport sécurisé du sondage.
