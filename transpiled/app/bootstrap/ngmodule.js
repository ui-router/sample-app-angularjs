/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */
"use strict";
// External dependencies
var angular = require("angular");
var angular_ui_router_1 = require("angular-ui-router");
require("d3");
require("ui-router-extras-core");
var ui_router_visualizer_1 = require("ui-router-visualizer");
// Create the angular module "demo".  It's empty now, but other parts of the app will register things on it.
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// For example, in mymessages.module.js:
//
// import {ngmodule} from "../bootstrap/ngmodule";
// ngmodule.config(($stateProvider) => { /* ... register states with $stateProvider */ }
exports.ngmodule = angular.module("demo", [angular_ui_router_1.default, 'ct.ui.router.extras.core', ui_router_visualizer_1.default]);
//# sourceMappingURL=ngmodule.js.map