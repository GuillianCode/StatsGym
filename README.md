# StatsGym

Nouvelle base indépendante de la démo publique StatsGym. La migration reprend
visuellement la version `new-sondage` sans dépendre de son générateur HTML.

## Structure

- `published-demo/` : copie adaptée du commit source `ecc4133` de `new-sondage`, publiée sur GitHub Pages.
- `demo/` : chantier React + TypeScript indépendant, conservé pour la suite.
- `demo/src/data/athletes.snapshot.json` : snapshot autonome de trois profils
  et de leurs trois partenaires de comparaison.
- `packages/contracts/` : contrat partagé du questionnaire.
- `supabase/` : migration SQL et Edge Function d’enregistrement.

Les scores sont entièrement locaux. Seuls le questionnaire et les événements
PostHog produisent des appels réseau.

## Développement

```bash
npm install
cp demo/.env.example demo/.env.local
npm run dev
```

Sans variables Supabase, le questionnaire fonctionne en mode simulé et ne
persiste aucune réponse.

## Vérification

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Déploiement

GitHub Actions publie directement `published-demo/` sur GitHub Pages. Au
déploiement, il y injecte dans `runtime-config.js` l’URL publique de l’Edge
Function Supabase et la configuration publique PostHog ; aucune clé Supabase
sensible n’est embarquée dans le navigateur.
Le chantier React reste vérifié par le workflow, mais n’est pas publié.

Le workflow Supabase est volontairement manuel. Il applique les migrations et
déploie l’Edge Function après configuration de `SUPABASE_ACCESS_TOKEN`,
`SUPABASE_DB_PASSWORD` et `SUPABASE_PROJECT_REF` dans les secrets GitHub.

La clé `service_role` ne doit jamais être placée dans GitHub ou dans le front.
