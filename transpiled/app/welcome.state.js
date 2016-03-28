"use strict";
var welcome_component_1 = require("./welcome.component");
/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
exports.welcomeState = {
    parent: 'app',
    name: 'welcome',
    url: '/welcome',
    template: welcome_component_1.welcomeTemplate,
    controller: welcome_component_1.welcomeController
};
//# sourceMappingURL=welcome.state.js.map