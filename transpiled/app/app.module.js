"use strict";
var ngmodule_1 = require("./bootstrap/ngmodule");
var app_component_1 = require("./app.component");
var welcome_component_1 = require("./welcome.component");
var home_component_1 = require("./home.component");
var login_component_1 = require("./login.component");
/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost chrome (including the navigation and logout for authenticated users)
 * 2) Provide a viewport (ui-view) for a substate to plug into
 */
var appState = {
    name: 'app',
    redirectTo: 'welcome',
    template: app_component_1.appTemplate,
    controller: app_component_1.appController,
    controllerAs: '$ctrl'
};
/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
var welcomeState = {
    parent: 'app',
    name: 'welcome',
    url: '/welcome',
    template: welcome_component_1.welcomeTemplate,
    controller: welcome_component_1.welcomeController
};
/**
 * This is a home screen for authenticated users.
 *
 * It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
 */
var homeState = {
    parent: 'app',
    name: 'home',
    url: '/home',
    template: home_component_1.homeTemplate
};
/**
 * This is the login state.  It is activated when the user navigates to /login, or if a unauthenticated
 * user attempts to access a protected state (or substate) which requires authentication. (see routerhooks/requiresAuth.js)
 *
 * It shows a fake login dialog and prompts the user to authenticate.  Once the user authenticates, it then
 * reactivates the state that the user originally came from.
 */
var loginState = {
    parent: 'app',
    name: 'login',
    url: '/login',
    template: login_component_1.loginTemplate,
    controller: login_component_1.loginController,
    controllerAs: '$ctrl',
    resolve: { returnTo: returnTo }
};
/**
 * A resolve function for 'login' state which figures out what state to return to, after a successful login.
 *
 * If the user was initially redirected to login state (due to the requiresAuth redirect), then return the toState/params
 * they were redirected from.  Otherwise, if they transitioned directly, return the fromState/params.  Otherwise
 * return the main "app" state.
 */
function returnTo($transition$) {
    var redirectedFrom = $transition$.previous();
    // The user was redirected to the login state (via the requiresAuth hook)
    if (redirectedFrom != null) {
        // Follow the current transition's redirect chain all the way back to the original attempted transition
        while (redirectedFrom.previous()) {
            redirectedFrom = redirectedFrom.previous();
        }
        // return to the original attempted "to state"
        return { state: redirectedFrom.to(), params: redirectedFrom.params("to") };
    }
    // The user was not redirected to the login state; they directly activated the login state somehow.
    // Return them to the state they came from.
    var fromState = $transition$.from();
    var fromParams = $transition$.params("from");
    if (fromState.name !== '') {
        return { state: fromState, params: fromParams };
    }
    // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
    return { state: 'home' };
}
// ... register each one with the StateProvider
ngmodule_1.ngmodule.config(['$stateProvider', function ($stateProvider) {
        [appState, homeState, welcomeState, loginState].forEach(function (state) { return $stateProvider.state(state); });
    }]);
// Apply some global configuration...
// If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
ngmodule_1.ngmodule.config(['$urlRouterProvider', function ($urlRouterProvider) { $urlRouterProvider.otherwise("/welcome"); }]);
// Enable tracing of each TRANSITION... (check the javascript console)
// This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
// Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
ngmodule_1.ngmodule.run(['$trace', function ($trace) { $trace.enable(1); }]);
//# sourceMappingURL=app.module.js.map