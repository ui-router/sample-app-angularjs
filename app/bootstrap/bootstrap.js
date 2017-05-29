/**
 * This file is the main entry point for the entire app.
 *
 * If the application is being bundled, this is where the bundling process
 * starts.  If the application is being loaded by an es6 module loader, this
 * is the entry point.
 *
 * Point Webpack or SystemJS to this file.
 *
 * This module imports all the different parts of the application which registers them with angular.
 * - Submodules
 *   - States
 *   - Components
 *   - Directives
 *   - Services
 *   - Filters
 *   - Run and Config blocks
 *     - Transition Hooks
 * - 3rd party Libraries and angular1 module
 */


// import all the app sub modules
// Each module registers it states/services/components, with the `ngmodule`
import "../global/global.module";
import "../main/main.module";
import "../contacts/contacts.module";
import "../mymessages/mymessages.module";
import "../prefs/prefs.module";

// Google analytics
import '../util/ga';
