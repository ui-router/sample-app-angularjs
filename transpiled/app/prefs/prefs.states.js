"use strict";
var prefs_component_1 = require("./prefs.component");
/**
 * This state allows the user to set their application preferences
 */
var prefsState = {
    parent: 'app',
    name: 'prefs',
    url: '/prefs',
    component: prefs_component_1.prefsComponent,
    // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
    data: { requiresAuth: true }
};
exports.PREFS_STATES = [prefsState];
//# sourceMappingURL=prefs.states.js.map