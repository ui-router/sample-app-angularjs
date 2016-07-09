## Contents

### Global services
- *appConfig*.service.js: Stores and retrieves the user's application preferences
- *auth*.service.js: Simulates an authentication service
- *dataSources*.service.js: Provides REST-like client API for Folders, Messages, and Contacts
- *dialog*.service.js: Provides a dialog confirmation service

### Directives
- *dialog*.directive.js: Provides a dialog directive used by the dialog service

### Router Hooks

- *requiresAuth*.hook.js: A transition hook which allows a state to declare that it requires an authenticated user