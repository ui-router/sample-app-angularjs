"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
var prefs_component_1 = require("./prefs.component");
var prefs_states_1 = require("./prefs.states");
var prefsAppModule = {
    components: { prefs: prefs_component_1.prefs },
    states: [prefs_states_1.prefsState]
};
ngmodule_1.loadNg1Module(ngmodule_1.ngmodule, prefsAppModule);
//# sourceMappingURL=index.js.map