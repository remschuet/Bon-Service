Qui compose l'équipe?
- Julien
- Remi

Quel est le titre provisoire du projet?
- KitchenCompanion

Quel est l'objectif principal du projet?
- Application de type SaaS qui permet de gerer au jour le jour les operations d'une cuisine profesionnelle par le biais de modules utilitaires.
- Objectif de manager une cuisine plus efficace, par le gain de temps et minimiser les couts

Comment le logiciel sera utilisé? Quelles sont les interactions importantes?
- Le Chef/ Patron >
    - Gestion inventaires / visualisation de la variation du coût des ingrédients
    - Gestion des coûts de reviens
    - Gestion des recettes, standardisation, exportation de fichier / rend disponible a l'équipe
    - Gestion des employé, quart de travail, roles, droits de lectures des recettes, droit modification des taches, etc.
    - Visualisation graphique des données pertinentes. 
    - Optimisation du workflow, création de liste de préparation organisé en fonction de filtre / critère, temps de préparation, etc.
    - Intégration des réglements sanitaire de la MAPAQ (module de registre des température de frigo, procédure sanitaires, etc)
    - Paramétrage des inventaires de produits préparé (ex. min toujours 1L de mayo, max 3L) afin de facilité la génération de liste

- L'employé / utilisateur >
    - Visualisation des livres de recettes publié par le Chef
    - Visualisation des horaires de travails
    - Système d'alerte pour les retards, manque d'ingrédients, demande de conger, etc. 
    - Visualisation des listes de préparations / priorité / images des ingrédients
    - Calculateur de quantité de recettes

Le logiciel est destiné à quelle plateforme : Web, Android ou Windows?
- Web / mobile

Quels langages de programmations utiliserez-vous?
- TypeScript, PLPGSQL

Quel EDI (IDE) sera utilisé?
- VSCode

Pour l’interface graphique, quelle bibliothèque ou outil utiliserez-vous?
- React, React-Native, Tailwind

Pour l'échange de données, avez-vous l'intention d'utiliser une base de données ou des fichiers?
- Base de donnee relationnel (PostgreSQL)
- Base de donnée type document (MongoDB ? a voir si on ne fait pas qu'insérer du JSON dans la db Postgres)
- Base de donnée type graph (Neo4j ? a voir si on ne fait pas juste un algo pour calculer les quelques relations)

- ORM Typescript : Prisma
- Architecture style microservices, ou les clients sont essentiellement des interfaces graphique et le serveur s'occupera de tout le reste.  

Quelles sont les parties du projet que chaque étudiant prendra en charge individuellement?
- Remi 
    - Gestion GIT (workflow, test unitaire)
    - DB ?
- Julien
    - UX / UI, frontend
    - Problematique du projet

