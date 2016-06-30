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

// Import the angular1 module
import {ngmodule} from "./ngmodule";

// Import CSS (SystemJS will inject it into the document)
import "font-awesome/css/font-awesome.css!"
import "bootstrap/css/bootstrap.css!"

// Import the service that manages the user's application preferences, and the Authentication service
import '../services/appConfig';
import '../services/auth';

// Import the fake REST APIs (for Contacts, Folders, Messages)
// These register themselves as angular services
import "../services/dataSources"

// Import any global transition hooks
import '../routerhooks/requiresAuth';

import '../util/ga';

// Import the states from the submodules that make up the main sections of the application
// Each submodule exports its states
import {APP_STATES} from '../app.states';
import {MYMESSAGES_STATES} from '../mymessages/mymessages.states';
import {CONTACTS_STATES} from '../contacts/contacts.states';
import {PREFS_STATES} from '../prefs/prefs.states';

// Then register all the states with the $stateProvider
ngmodule.config(function($stateProvider) {
  let ALL_STATES = [].concat(APP_STATES)
      .concat(MYMESSAGES_STATES)
      .concat(CONTACTS_STATES)
      .concat(PREFS_STATES);
  ALL_STATES.forEach(state => $stateProvider.state(state));
});