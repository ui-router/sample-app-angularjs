/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */
"use strict";
// External dependencies
var angular = require("angular");
var angular_ui_router_1 = require("angular-ui-router");
require("d3");
var ui_router_visualizer_1 = require("ui-router-visualizer");
// Create the angular module "demo".
//
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// In bootstrap.js, the module is imported, and the components, services, and states are registered.
exports.ngmodule = angular.module("demo", [angular_ui_router_1.default, ui_router_visualizer_1.default]);
//# sourceMappingURL=ngmodule.js.map