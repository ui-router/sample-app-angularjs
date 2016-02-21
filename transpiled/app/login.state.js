"use strict";
var login_component_1 = require("./login.component");
/**
 * This is the login state.  It is activated when the user navigates to /login, or if a unauthenticated
 * user attempts to access a protected state (or substate) which requires authentication. (see routerhooks/requiresAuth.js)
 *
 * It shows a fake login dialog and prompts the user to authenticate.  Once the user authenticates, it then
 * reactivates the state that the user originally came from.
 */
exports.loginState = {
    parent: 'app',
    name: 'login',
    url: '/login',
    template: login_component_1.template,
    controller: login_component_1.controller,
    controllerAs: 'vm',
    resolve: { returnTo: returnTo }
};
/**
 * A resolve function which figures out what state we should return to after a successful login.
 *
 * If the user was redirected to this state (due to the requiresAuth redirect), then return the toState/params
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
//# sourceMappingURL=login.state.js.map