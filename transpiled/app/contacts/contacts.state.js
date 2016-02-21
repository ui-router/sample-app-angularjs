"use strict";
var contacts_component_1 = require("./contacts.component");
/**
 * This state displays the contact list.
 * It also provides a nested ui-view (viewport) for child states to fill in.
 *
 * The contacts are fetched using a resolve.
 */
var contactsState = {
    parent: 'app',
    name: "contacts",
    url: "/contacts",
    resolve: {
        // Resolve all the contacts.  The resolved contacts are injected into the controller.
        contacts: function (Contacts) { return Contacts.all(); }
    },
    template: contacts_component_1.template,
    controller: contacts_component_1.controller,
    controllerAs: "vm",
    data: { requiresAuth: true }
};
exports.contactsState = contactsState;
//# sourceMappingURL=contacts.state.js.map