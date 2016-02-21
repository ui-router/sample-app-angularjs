"use strict";
require("../services/dialog");
var editContact_component_1 = require("./editContact.component");
var revertableModel_1 = require("../util/revertableModel");
/**
 * This state allows a user to create a new contact
 *
 * The contact data to edit is injected from the parent state's resolve.
 */
exports.newContactState = {
    name: 'contacts.new',
    url: '/new',
    resolve: {
        // provide the view with a RevertableModel wrapped around a blank contact object
        contact: function () { return new revertableModel_1.RevertableModel({}); }
    },
    onExit: function (dialogService, contact) {
        if (contact.isDirty())
            return dialogService.confirm('You have unsaved changes to this contact.', 'Navigate away and lose changes?', "Yes", "No");
    },
    template: editContact_component_1.template,
    controller: editContact_component_1.EditContactController,
    controllerAs: 'vm'
};
//# sourceMappingURL=newContact.state.js.map