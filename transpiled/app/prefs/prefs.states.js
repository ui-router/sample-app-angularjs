"use strict";
/**
 * This state allows the user to set their application preferences
 */
exports.prefsState = {
    parent: 'app',
    name: 'prefs',
    url: '/prefs',
    component: 'prefs',
    // Mark this state as requiring authentication.  See ../global/requiresAuth.hook.js.
    data: { requiresAuth: true }
};
//# sourceMappingURL=prefs.states.js.map