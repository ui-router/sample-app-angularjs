"use strict";
var app_component_1 = require("./app.component");
var welcome_component_1 = require("./welcome.component");
var login_component_1 = require("./login.component");
var home_component_1 = require("./home.component");
var app_states_1 = require("./app.states");
var app_config_1 = require("./app.config");
exports.MAIN_MODULE = {
    components: { app: app_component_1.app, welcome: welcome_component_1.welcome, login: login_component_1.login, home: home_component_1.home },
    states: [app_states_1.appState, app_states_1.homeState, app_states_1.loginState, app_states_1.welcomeState],
    configBlocks: [app_config_1.otherwiseConfigBlock],
    runBlocks: [app_config_1.traceRunBlock]
};
//# sourceMappingURL=index.js.map