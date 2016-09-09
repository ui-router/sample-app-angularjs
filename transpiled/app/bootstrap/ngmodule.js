/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */
"use strict";
// External dependencies
var angular = require("angular");
var angular_ui_router_1 = require("angular-ui-router");
var ui_router_visualizer_1 = require("ui-router-visualizer");
// Create the angular module "demo".
//
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// In bootstrap.js, the module is imported, and the components, services, and states are registered.
exports.ngmodule = angular.module("demo", [angular_ui_router_1.default]);
// Show ui-router-visualizer
exports.ngmodule.run(function ($uiRouter) { return ui_router_visualizer_1.visualizer($uiRouter); });
var BLANK_MODULE = {
    states: [],
    components: {},
    directives: {},
    services: {},
    filters: {},
    configBlocks: [],
    runBlocks: []
};
/**
 * Register each app module's states, directives, components, filters, services,
 * and config/run blocks with the `ngmodule`
 *
 * @param ngModule the `angular.module()` object
 * @param appModule the feature module consisting of components, states, services, etc
 */
function loadNg1Module(ngModule, appModule) {
    var module = Object.assign({}, BLANK_MODULE, appModule);
    ngModule.config(['$stateProvider', function ($stateProvider) { return module.states.forEach(function (state) { return $stateProvider.state(state); }); }]);
    Object.keys(module.components).forEach(function (name) { return ngModule.component(name, module.components[name]); });
    Object.keys(module.directives).forEach(function (name) { return ngModule.directive(name, module.directives[name]); });
    Object.keys(module.services).forEach(function (name) { return ngModule.service(name, module.services[name]); });
    Object.keys(module.filters).forEach(function (name) { return ngModule.filter(name, module.filters[name]); });
    module.configBlocks.forEach(function (configBlock) { return ngModule.config(configBlock); });
    module.runBlocks.forEach(function (runBlock) { return ngModule.run(runBlock); });
    return ngModule;
}
exports.loadNg1Module = loadNg1Module;
//# sourceMappingURL=ngmodule.js.map