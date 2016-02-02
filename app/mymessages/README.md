## Contents

### The MyMessages submodule states
- mymessages.state.js: The main 'mymessages' parent state.
- myessages.component.js: A template/controller to display a list of folders.

- folder.state.js: The 'mymessages.folder' child state for a folder of messages.
- folder.component.js: A template/controller to show the list of messages in a folder.

- message.state.js: The 'mymessages.folder.message' child state for a single message.
- message.component.js: A template/controller to show the contents of a message.

- compose.state.js: The 'mymessages.compose' child state for composing a message.
- compose.component.js: A template/controller allowing a new message to be composed.

### The MyMessages submodule bootstrap
- mymessages.module.js

### Filters
- filters/messageBodyFilter.js: Converts plain text formatting to something that html can display nicer.

### Directives
- directives/messageTable.js: A directive that displays a folder of messages
- directives/sortMessages.js: A directive used in messageTable to toggle the currently sorted column
