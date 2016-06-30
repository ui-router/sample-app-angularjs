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
var ngmodule_1 = require("./ngmodule");
// Import CSS (SystemJS will inject it into the document)
require("font-awesome/css/font-awesome.css!");
require("bootstrap/css/bootstrap.css!");
// Import the service that manages the user's application preferences, and the Authentication service
require('../services/appConfig');
require('../services/auth');
// Import the fake REST APIs (for Contacts, Folders, Messages)
// These register themselves as angular services
require("../services/dataSources");
// Import any global transition hooks
require('../routerhooks/requiresAuth');
require('../util/ga');
// Import the states from the submodules that make up the main sections of the application
// Each submodule exports its states
var app_states_1 = require('../app.states');
var mymessages_states_1 = require('../mymessages/mymessages.states');
var contacts_states_1 = require('../contacts/contacts.states');
var prefs_states_1 = require('../prefs/prefs.states');
// Then register all the states with the $stateProvider
ngmodule_1.ngmodule.config(function ($stateProvider) {
    var ALL_STATES = [].concat(app_states_1.APP_STATES)
        .concat(mymessages_states_1.MYMESSAGES_STATES)
        .concat(contacts_states_1.CONTACTS_STATES)
        .concat(prefs_states_1.PREFS_STATES);
    ALL_STATES.forEach(function (state) { return $stateProvider.state(state); });
});
//# sourceMappingURL=bootstrap.js.map