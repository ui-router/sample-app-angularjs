import {contactDetail} from "./contactDetail.component";
import {contactList} from "./contactList.component";
import {contacts} from "./contacts.component";
import {contactView} from "./contactView.component";
import {editContact} from "./editContact.component";

import {contactsState, editContactState, newContactState, viewContactState} from "./contacts.states";

export const CONTACTS_MODULE = angular.module('contacts', []);

CONTACTS_MODULE.component('contactView', contactView);
CONTACTS_MODULE.component('contacts', contacts);
CONTACTS_MODULE.component('editContact', editContact);
CONTACTS_MODULE.component('contactDetail', contactDetail);
CONTACTS_MODULE.component('contactList', contactList);

CONTACTS_MODULE.config(['$stateRegistryProvider', function($stateRegistry) {
  $stateRegistry.register(contactsState);
  $stateRegistry.register(newContactState);
  $stateRegistry.register(viewContactState);
  $stateRegistry.register(editContactState);
}]);
