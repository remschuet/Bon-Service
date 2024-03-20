## Convention data access

- Camel case

### Starting with

`create`<br>
create one ligne form the database

`get` <br>
return one ligne form the database

`getAll`<br>
return multiple ligne form the database

`delete`<br>
delete one ligne form the database

`deleteAll`<br>
delete multiple ligne form the database

`update`<br>
update one ligne form the database

`updateAll`<br>
update multiple ligne form the database

`link`<br>
midle table like n kitchen and n user

### Ending with

`ById`<br>
have id in params

`ByIdAndName`<br>
have id and name in params

### Midle

`User`<br>
get all params of the user table

`UserId`<br>
get the user id

### Examples

`getAllUserByName`<br>
return all users with specific name

`getUserByNameAndId`<br>
return one user with specific name and id
