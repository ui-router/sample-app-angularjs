/**
 * This file is the main entry point for the entire app.
 *
 * If the application is being bundled, this is where the bundling process
 * starts.  If the application is being loaded by an es6 module loader, this
 * is the entry point.
 *
 * Point Webpack or SystemJS to this file.
 *
 * This module imports all the different parts of the application:
 * - 3rd party Libraries and angular1 module
 * - Services
 * - Components
 * - Submodules
 * - Top-level states
 * - UI-Router Transition Hooks
 */
"use strict";
// Import the angular1 module
require("./ngmodule");
// Import CSS (SystemJS will inject it into the document)
require("font-awesome/css/font-awesome.css!");
require("bootstrap/css/bootstrap.css!");
// Import the service that manages the user's application preferences, and the Authentication service
require('../services/appConfig');
require('../services/auth');
// Import the fake REST APIs (for Contacts, Folders, Messages)
// These register themselves as angular services
require("../services/dataSources");
// Import the submodules that make up the main subsections of the application
// Each submodule registers its own states/services/components
require('../app.module');
require('../mymessages/mymessages.module');
require('../contacts/contacts.module');
require('../prefs/prefs.module');
// Import any global transition hooks
require('../routerhooks/redirectTo');
require('../routerhooks/requiresAuth');
require('../util/ga');
//# sourceMappingURL=bootstrap.js.map