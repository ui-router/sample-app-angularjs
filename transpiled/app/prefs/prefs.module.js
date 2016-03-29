"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
var prefs_component_1 = require("./prefs.component");
/**
 * This state allows the user to set their application preferences
 */
var prefsState = {
    parent: 'app',
    name: 'prefs',
    url: '/prefs',
    template: prefs_component_1.prefsTemplate,
    controller: prefs_component_1.prefsController,
    controllerAs: '$ctrl',
    // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
    data: { requiresAuth: true }
};
// ... and register with the $stateProvider
ngmodule_1.ngmodule.config(function ($stateProvider) {
    var prefsStates = [prefsState];
    prefsStates.forEach(function (state) { return $stateProvider.state(state); });
});
//# sourceMappingURL=prefs.module.js.map