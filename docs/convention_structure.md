# Convention structure des dossiers du projet

## Directory Name NEXT

**[ * ]**<br>
Route dinamique

**( \* )**<br>
Regroupement de routes qui n'affecte par le lien de la route principale

**\_\***<br>
Les enfants sont exclus de la route principale. Impossible de forcer la route à aller là-bas.

## Directory Name

**\_action**<br>
Possède les fichiers typescript des actions

**\_components**<br>
Possède les fichiers typescript des components

**components**<br>
Possède les fichiers typescript des components global au projet

**\_test**<br>
Possède les fichiers typescript des tests

**db**<br>
Possède la structure des DAO et des fichiers de connexions aux bases de données S3 et PostgreSQL

**data-access**<br>
Possède la structure des DAO

**lib**<br>
Possède la structure des librairies interne au projet développé par nous-mêmes

## File Name NEXT

**page**<br>
Le point d'entrée inital du visuel au sein de la route courante.

**midleware**<br>
Gérer les opérations pré-route comme authentification, validation, loggin.

## File Name

**.config.**<br>
Est un fichier de configuration qui définit les paramètres, les options et les comportements pour une application ou système.

**test**<br>
Est un fichier de test qui sera exécuté par Jest
