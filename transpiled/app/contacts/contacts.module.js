"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
// Import all the state definitions for this submodule...
var contacts_state_1 = require("./contacts.state");
var editContact_state_1 = require("./editContact.state");
var newContact_state_1 = require("./newContact.state");
var contact_state_1 = require("./contact.state");
// ...and register them with the $stateProvider
ngmodule_1.ngmodule.config(function ($stateProvider) {
    var contactsStates = [contacts_state_1.contactsState, newContact_state_1.newContactState, contact_state_1.viewContactState, editContact_state_1.editContactState];
    contactsStates.forEach(function (state) { return $stateProvider.state(state); });
});
//# sourceMappingURL=contacts.module.js.map