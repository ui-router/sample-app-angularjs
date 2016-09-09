"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
var contactDetail_component_1 = require("./contactDetail.component");
var contactList_component_1 = require("./contactList.component");
var contacts_component_1 = require("./contacts.component");
var contactView_component_1 = require("./contactView.component");
var editContact_component_1 = require("./editContact.component");
var contacts_states_1 = require("./contacts.states");
var contactsAppModule = {
    components: { contactView: contactView_component_1.contactView, contacts: contacts_component_1.contacts, editContact: editContact_component_1.editContact, contactDetail: contactDetail_component_1.contactDetail, contactList: contactList_component_1.contactList },
    states: [contacts_states_1.contactsState, contacts_states_1.newContactState, contacts_states_1.viewContactState, contacts_states_1.editContactState]
};
ngmodule_1.loadNg1Module(ngmodule_1.ngmodule, contactsAppModule);
//# sourceMappingURL=index.js.map