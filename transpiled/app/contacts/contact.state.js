"use strict";
var contact_component_1 = require("./contact.component");
/**
 * This state displays a single contact.
 * The contact to display is fetched using a resolve, based on the `contactId` parameter.
 */
exports.viewContactState = {
    name: 'contacts.contact',
    url: '/:contactId',
    resolve: {
        // Resolve the contact, based on the contactId parameter value.
        // The resolved contact is then injected into the controller.
        contact: function (Contacts, $stateParams) { return Contacts.get($stateParams.contactId); }
    },
    template: contact_component_1.template,
    controller: contact_component_1.controller,
    controllerAs: 'vm'
};
//# sourceMappingURL=contact.state.js.map