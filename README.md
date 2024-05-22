## Bon Service

lien: <a href="https://bonService.app" title="Hobbit lifestyles">Bon Service</a>

## Présentation

Bon Service est une application dédiée à la gestion et au partage de recettes au sein d'une équipe de cuisine. Elle permet aux Chefs de centraliser et d'organiser leurs recettes, facilitant ainsi la collaboration et l'innovation culinaire.

## Installation

**Ouvrir un terminal à la racine du projet et entrer chacune des prochaines commandes :**

1. Déplacement vers le répertoire du projet :

   ```sh
   cd KitchenCompanion/dev/kitchencompanion
   ```

2. Installation des dépendances :

   ```sh
   npm install
   ```

3. Configuration du fichier `.env` :

   - Demander le fichier `.env` à un administrateur du projet et le placer à l'emplacement actuel du terminal.

4. Configuration du client Prisma :

   ```sh
   npx prisma generate
   ```

5. Démarrer le projet :

   ```sh
   npm run dev
   ```

6. Ouvrir un navigateur web et aller à l'adresse suivante :
   ```
   localhost:3000
   ```

## Utilisation

- **Gestion du Marché** : Ajouter et modifier vos ingredients manuellement ou déposer votre reçu pdf
- **Gestion des Recettes** : Créer, modifier et supprimer des recettes.
- **Partage en Équipe** : Collaborer avec d'autres membres de l'équipe en partageant des recettes et contacts.
- **Catégorisation** : Organiser les recettes par livres de recettes pour une recherche facile.
- **Exporter** : Télécharger vos recettes, ingredients ou contacts en pdf pour une lecture papier.

## Références

- [TypeScript](https://www.typescriptlang.org/docs/)

  Language utilisé dans le projet permettant de typer notre code.

- [Next.js](https://nextjs.org/docs)

  Framework React nous permettant de faire une application web full-stack.

- [React](https://reactjs.org/docs/getting-started.html)

  Librairie JavaScript pour construire nos interfaces visuels.

- [Prisma](https://www.prisma.io/docs/)

  ORM nous aidant à la connection, visualisation et migration de notre base de donnée PostgreSQL.

- [ShadCN](https://ui.shadcn.com/)

  Bibliothèque de composants React, basée sur Tailwind CSS, conçue pour simplifier le développement d'interfaces utilisateur élégantes et réactives.

- [Zod](https://zod.dev/)

  Bibliothèque TypeScript pour la validation de schémas, permettant de définir et valider les structures de données de manière intuitive et sécurisée.

- [Tailwind CSS](https://tailwindcss.com/docs)

  Framework CSS utilitaire qui permet de créer rapidement des interfaces personnalisées en utilisant des classes pré-définies directement dans le HTML.

- [Jest](https://jestjs.io/docs/getting-started)

  Framework de test JavaScript conçu pour tester des applications JavaScript et React, offrant des fonctionnalités comme les tests unitaires, les tests d'intégration utilisés dans notre projet.

- [Bcrypt](https://www.npmjs.com/package/bcrypt)

  Bibliothèque pour le hachage de mots de passe, utilisée pour sécuriser les mots de passe en les transformant en une chaîne cryptée avant de les stocker dans une base de données.

- [Resend](https://resend.com/docs)

  API web d'envoi d'e-mails qui simplifie l'intégration de fonctionnalités de messagerie dans les applications, offrant des options de personnalisation et une gestion fiable des envois d'e-mails.

- [JsPDF](https://www.npmjs.com/package/jspdf)

  Bibliothèque JavaScript permettant de générer des fichiers PDF directement depuis le navigateur, utilisée pour créer et télécharger des documents PDF de manière dynamique.

## Ressources

- [NextJs, bonnes pratiques](https://www.youtube.com/watch?v=1MTyCvS05V4&t=16706s)

  Vidéo YouTube visualisé pour la compréhension globale du fonctionnement de NextJs.

## Contact

Pour toute question ou demande d'information, vous pouvez contacter les membres de notre équipe de développement :

| Nom                         | Rôle                    | Contact                                                         |
| --------------------------- | ----------------------- | --------------------------------------------------------------- |
| **Rémi Chuet**              | Développeur, Concepteur | [remschuet@gmail.com](mailto:remschuet@gmail.com)               |
| **Julien Coulombe-Morency** | Développeur, Concepteur | [jcoulombemorency@gmail.com](mailto:jcoulombemorency@gmail.com) |

## Remerciements

Pierre-Paul Monty

- Discussion sur les algorythmes: In-Order Traversal

Frederic Theriault

- Discussion sécurité web

Martine Coulombe

- Relecture documents techniques

David Chuet

- Relecture documents techniques
