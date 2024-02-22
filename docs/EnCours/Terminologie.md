## definitions roles
- Chef
    - (**UTILISATEUR**)
    - Administrateur de n cuisine

- Cuisinier
    - (**UTILISATEUR**)
    - Possede un role au sein de la cuisine
    - Visualiser les recettes et menus
    - Fait partie d une cuisine

- Cuisine
    - Gerer par un chef
    - Possede n cuisinier

- Fournisseur
    - Permet d'inserer des ingredients dans la listes d items
    - Ajouter par un chef cuisinier
    - En lien avec une cuisine  

## terminologie projet
- Marché de base

recette
- Nom unique, au moins 2 ingredients
- Les recettes peuvent avoir des versions ainsi qu'une courte description pour chacun d'entre elles
- Elles possede un cout a la quantité (Littre, kilo)

Menu


Ingrédient 
- Nom unique, un code, prix, unité mesure (Millilitre / kilogramme pour garder des int)
- Pourrait etre une recette

ingredient prepare
- Ingredients qui a déjà eu une action
- Possède seulement 1 ingredients (n'est donc pas une recette)
- Exemple : tartare saumon

standardisation recette
- Découpage minutieux entre les ingredients, les etapes ainsi que la possibilité d'infiltré des alergènes ou action minimum de la MAPAQ

## Jargon professionnel
brigade
- Ensemble du personnel constituant une équipe dans un même service. Synonyme : cuisine, équipe, section
- Au sein du projet, une cuisine et une brigade sont des synonymes

Chef cuisine vs Chef rang vs Chef partie 
https://projetrestaurant.com/lexique-restauration-vocabulaire/

MAPAQ
- Ministère de l'Agriculture, des Pecheries et de l'Alimentation. Il ont le role de serveiller la lasubrité des cuisines quebecoise.

Planche (Couleur) 
- https://www.toutequip.com/547-planches-a-decouper-a-code-couleur.html
- Blanc - Planche à pain & produit laitier.
- Vert - Planche à salade & fruits.
- Jaune - Planche à Viande cuite.
- Rouge - Planche à Viande crue.
- Marron - Planche à légumes.
- Bleu - Planche à poisson cru.

code temperature frigo/congelo
- -18, -32
- 0, 4
