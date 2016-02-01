This directory contains:

### The MyMessages submodule states
- mymessages.js: The main 'mymessages' parent state; Shows the list of folders
- folder.js: The 'mymessages.folder' child state; Shows the list of messages in a folder.
- message.js: The 'mymessages.folder.message' child state; Shows the contents of a message.
- compose.js: The 'mymessages.compose' child state; Allows a new message to be sent.

### The MyMessages submodule bootstrap
- mymessages.module.js

### Filters
- filters/messageBodyFilter.js: Converts plain text formatting to something that html can display nicer.

### Directives
- directives/messageTable.js: A directive that displays a folder of messages
- directives/sortMessages.js: A directive used in messageTable to toggle the currently sorted column
