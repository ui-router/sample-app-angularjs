"use strict";
var mymessages_component_1 = require("./mymessages.component");
/**
 * The mymessages state. This is the main state for the mymessages submodule.
 *
 * This state shows the list of folders for the current user. It retrieves the folders from the
 * Folders service.  If a user navigates directly to this state, the state redirects to the 'mymessages.folder'.
 *
 */
exports.mymessagesState = {
    parent: 'app',
    name: "mymessages",
    url: "/mymessages",
    resolve: {
        // All the folders are fetched from the Folders service
        folders: function (Folders) { return Folders.all(); }
    },
    // If mymessages state is directly activated, redirect the transition to the child state 'mymessages.folder'
    redirectTo: 'mymessages.folder',
    template: mymessages_component_1.mymessagesTemplate,
    controller: mymessages_component_1.mymessagesController,
    controllerAs: "vm",
    // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
    data: { requiresAuth: true }
};
//# sourceMappingURL=mymessages.state.js.map