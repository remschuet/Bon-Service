## Convention actions

- Camel case
- directory: _action
- file name: *-action.ts
- Doc string
    ```
    /*
    * Create a new kitchen
    * 
    * params userId: the user id
    * returns message error or success with the https code
    */
    ```
### Fonction starting with

`add`<br>
Call something to create on the database

`Nothing` <br>
Nothing before the description action<br>
Example: Register, Login

`get`<br>
Call database to get data or get data from a form

`actions_`<br>
Fonctionne dans les routes `/test/`<br>
Non teste dans le flow normal du projet


### Fonction ending with

`s`
For multiple actions<br>
example: getIngredients (return n ingredients)

### Examples

`actions_getIngredients`<br>
return tous les ingredients mais pas teste dans le deploiement 
