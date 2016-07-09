## Contents

### The MyMessages submodule states

- *myessages.component*.js: A template/controller to display a list of folders.
- *folder.component*.js: A template/controller to show the list of messages in a folder.
- *message.component*.js: A template/controller to show the contents of a message.
- *compose.component*.js: A template/controller allowing a new message to be composed.

### The MyMessages submodule bootstrap

- *mymessages.module*.js: Defines and registers MyMessages states

### Filters

- *filters/messageBodyFilter*.js: Converts plain text formatting to something that html can display nicer.

### Directives

- *directives/messageTable*.js: A directive that displays a folder of messages as a table
- *directives/sortMessages*.js: A directive used in messageTable to toggle the currently sorted column
