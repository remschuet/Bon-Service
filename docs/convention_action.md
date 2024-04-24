## Convention actions

- Camel case
- Répertoire : \_action
- Nom de fichier : \*-action.ts
- Documentation :
  ```
  /*
  * Crée une nouvelle cuisine
  *
  * params userId : l'identifiant de l'utilisateur
  * returns message erreur ou succès avec le code https
  */
  ```

### Fonction commençant par

`add`<br>
Appelle quelque chose pour créer dans la base de données

`Nothing`<br>
Rien avant la description de l'action<br>
Exemple : Enregistrement, Connexion

`get`<br>
Appelle la base de données pour obtenir des données ou obtiens des données à partir d'un formulaire

`actions_`<br>
Fonctionne dans les routes `/test/`<br>
Non testé dans le flux normal du projet

### Fonction se terminant par

`s`
Pour des actions multiples<br>
Exemple : getIngredients (retourne n ingrédients)

### Exemples

`actions_getIngredients`<br>
retourne tous les ingrédients mais n'est pas testé dans le déploiement
