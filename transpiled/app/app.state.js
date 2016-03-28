"use strict";
var app_component_1 = require("./app.component");
/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost chrome (including the navigation and logout for authenticated users)
 * 2) Provide a viewport (ui-view) for a substate to plug into
 */
exports.appState = {
    name: 'app',
    redirectTo: 'welcome',
    template: app_component_1.appTemplate,
    controller: app_component_1.appController,
    controllerAs: 'vm'
};
//# sourceMappingURL=app.state.js.map