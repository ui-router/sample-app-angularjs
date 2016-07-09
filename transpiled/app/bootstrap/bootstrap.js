/**
 * This file is the main entry point for the entire app.
 *
 * If the application is being bundled, this is where the bundling process
 * starts.  If the application is being loaded by an es6 module loader, this
 * is the entry point.
 *
 * Point Webpack or SystemJS to this file.
 *
 * This module imports all the different parts of the application and registers them with angular.
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
"use strict";
// Import the angular1 module
var ngmodule_1 = require("./ngmodule");
//////////////////// MODULES ///////////////
// import all the sub module definitions
var index_1 = require("../global/index");
var index_2 = require("../main/index");
var index_3 = require("../contacts/index");
var index_4 = require("../mymessages/index");
var index_5 = require("../prefs/index");
var BLANK_MODULE = {
    states: [], components: {}, directives: {}, services: {}, filters: {}, configBlocks: [], runBlocks: []
};
// make sure all modules have all the keys from BLANK_MODULE.
var MODULES = [index_1.GLOBAL_MODULE, index_2.MAIN_MODULE, index_3.CONTACTS_MODULE, index_4.MYMESSAGES_MODULE, index_5.PREFS_MODULE]
    .map(function (module) { return Object.assign({}, BLANK_MODULE, module); });
// Register each module's states, directives, components, filters, services, and config/run blocks
MODULES.forEach(function (module) {
    ngmodule_1.ngmodule.config(function ($stateProvider) { return module.states.forEach(function (state) { return $stateProvider.state(state); }); });
    Object.keys(module.components).forEach(function (name) { return ngmodule_1.ngmodule.component(name, module.components[name]); });
    Object.keys(module.directives).forEach(function (name) { return ngmodule_1.ngmodule.directive(name, module.directives[name]); });
    Object.keys(module.services).forEach(function (name) { return ngmodule_1.ngmodule.service(name, module.services[name]); });
    Object.keys(module.filters).forEach(function (name) { return ngmodule_1.ngmodule.filter(name, module.filters[name]); });
    module.configBlocks.forEach(function (configBlock) { return ngmodule_1.ngmodule.config(configBlock); });
    module.runBlocks.forEach(function (runBlock) { return ngmodule_1.ngmodule.run(runBlock); });
});
// Import CSS (SystemJS will inject it into the document)
require("font-awesome/css/font-awesome.css!");
require("bootstrap/css/bootstrap.css!");
// Google analytics
require('../util/ga');
//# sourceMappingURL=bootstrap.js.map