"use strict";
var ngmodule_1 = require("./bootstrap/ngmodule");
// Import the top-level state definitions for app, welcome, home, and login
var app_state_1 = require("./app.state");
var welcome_state_1 = require('./welcome.state');
var home_state_1 = require('./home.state');
var login_state_1 = require('./login.state');
// and register each one with the StateProvider
ngmodule_1.ngmodule.config(['$stateProvider', function ($stateProvider) {
        [app_state_1.appState, home_state_1.homeState, welcome_state_1.welcomeState, login_state_1.loginState].forEach(function (state) { return $stateProvider.state(state); });
    }]);
// Apply some global configuration...
// If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
ngmodule_1.ngmodule.config(['$urlRouterProvider', function ($urlRouterProvider) { $urlRouterProvider.otherwise("/welcome"); }]);
// Enable tracing of each TRANSITION... (check the javascript console)
// This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
// Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
ngmodule_1.ngmodule.run(['$trace', function ($trace) { $trace.enable(1); }]);
//# sourceMappingURL=app.module.js.map