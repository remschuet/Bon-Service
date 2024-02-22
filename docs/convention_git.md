# Convention Git
## Messages
Correct format : 
```<type>[scope]: <subject>```<br>
Example: "docs: update README to add developer tips"

## Type
**feat**<br>
A new feature

**fix**<br>
A bug fix

**docs**<br>
Documentation only changes

**style**<br>
Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).

**refactor**<br>
A code change that neither fixes a big nor adds a feature

**test**<br>
Adding missing tests or correcting existing ones

**chore**<br>
Changes to your CI configuration files and scripts

**pref**<br>
A code change that improves performance

**ci**<br>
Changes to your CI configuration files and scripts

**build**<br>
Changes that affect the build system or external dependencies (example scopes : gulp, broccoli, npm)

**temp**<br>
Temporary commit that won't be included in your CHANGELOG

## scope
Optional, can be anything specifying the scope of the commit change<br>
In App Development, scope can be a page, a module or a component<br>

## subject
Brief summary of the change in present tense <br>
No period at the end