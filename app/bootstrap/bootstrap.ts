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
 * 
 * Then this module creates the ng-upgrade adapter 
 * and bootstraps the hybrid application
 */

// Import the angular1 module
import "./ngmodule";

// Import CSS (SystemJS will inject it into the document)
import "font-awesome/css/font-awesome.css!"
import "bootstrap/css/bootstrap.css!"

// Import the service that manages the user's application preferences, and the Authentication service
import '../services/appConfig';
import '../services/auth';

// Import the fake REST APIs (for Contacts, Folders, Messages)
// These register themselves as angular services
import "../services/dataSources"

// Import the submodules that make up the main subsections of the application
// Each submodule registers its own states/services/components
import '../app.module';
import '../mymessages/mymessages.module';
import '../contacts/contacts.module';
import '../prefs/prefs.module';

// Import any global transition hooks
import '../routerhooks/redirectTo';
import '../routerhooks/requiresAuth';

import '../util/ga';

// ============================================================
// Create upgrade adapter and bootstrap the hybrid ng1/ng2 app
// ============================================================
import {UpgradeAdapter} from 'angular2/upgrade';
export const upgradeAdapter = new UpgradeAdapter();

// Supply the ui-router with the upgrade adapter
import {uiRouterNgUpgrade} from "ui-router-ng1-to-ng2";
uiRouterNgUpgrade.setUpgradeAdapter(upgradeAdapter);

// Register some ng1 services as ng2 providers
upgradeAdapter.upgradeNg1Provider('$state');
upgradeAdapter.upgradeNg1Provider('dialogService');
upgradeAdapter.upgradeNg1Provider('Contacts');

// Manually bootstrap the app with the Upgrade Adapter (instead of ng-app)
upgradeAdapter.bootstrap(document.body, ['demo']);
