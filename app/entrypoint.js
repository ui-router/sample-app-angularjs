/**
 * This file is the main entry point for the entire app.
 *
 * Point Webpack or SystemJS to this file.
 *
 * It imports all the different parts of the application:
 * - Services
 * - Components
 * - Submodules
 */


// This file starts by importing the angular module "demo" from app.module.js
import {app} from './app.module';

// Import the service that manages the user's application preferences, and the Authentication service
import './services/appConfig';
import './services/auth';

// Import any global transition hooks
import './routerhooks/redirectTo';
import './routerhooks/requiresAuth';

// Import the fake REST APIs (for Contacts, Folders, Messages)
// These register themselves as angular services
import "./services/dataSources"

// Import the submodules that make up the main subsections of the application
// Each submodule registers its own states/services/components
import './mymessages/mymessages.module';
import './contacts/contacts.module';
import './prefs/prefs.module';



// Import the top-level state definitions for app, welcome, home, and login
import {appState} from "./app";
import {welcomeState} from './welcome';
import {homeState} from './home';
import {loginState} from './login';
// and register each one with the StateProvider
app.config(['$stateProvider', $stateProvider => {
  [appState, homeState, welcomeState, loginState].forEach(state => $stateProvider.state(state));
}]);



// Apply some global configuration...

// If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
app.config(['$urlRouterProvider', $urlRouterProvider => { $urlRouterProvider.otherwise("/welcome"); }]);

// Trace each TRANSITION... see the javascript console.
// This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
app.run(['$trace', $trace => { $trace.enable(1); }]);
// Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"

