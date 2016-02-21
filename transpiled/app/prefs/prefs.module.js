"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
// Import the prefs state definition...
var prefs_state_1 = require("./prefs.state");
// ... and register with the $stateProvider
ngmodule_1.ngmodule.config(function ($stateProvider) {
    var prefsStates = [prefs_state_1.prefsState];
    prefsStates.forEach(function (state) { return $stateProvider.state(state); });
});
//# sourceMappingURL=prefs.module.js.map