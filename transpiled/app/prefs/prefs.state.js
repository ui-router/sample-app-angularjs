"use strict";
var prefs_component_1 = require("./prefs.component");
/**
 * This state allows the user to set their application preferences
 */
exports.prefsState = {
    parent: 'app',
    name: 'prefs',
    url: '/prefs',
    template: prefs_component_1.prefsTemplate,
    controller: prefs_component_1.prefsController,
    controllerAs: 'vm',
    // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
    data: { requiresAuth: true }
};
//# sourceMappingURL=prefs.state.js.map