"use strict";
var home_component_1 = require("./home.component");
/**
 * This is a home screen for authenticated users.
 *
 * It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
 */
exports.homeState = {
    parent: 'app',
    name: 'home',
    url: '/home',
    template: home_component_1.homeTemplate
};
//# sourceMappingURL=home.state.js.map