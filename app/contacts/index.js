import {contactDetail} from "./contactDetail.component";
import {contactList} from "./contactList.component";
import {contacts} from "./contacts.component";
import {contactView} from "./contactView.component";
import {editContact} from "./editContact.component";

import {contactsState, editContactState, newContactState, viewContactState} from "./contacts.states";

export const CONTACTS_MODULE = {
  components: {contactView, contacts, editContact, contactDetail, contactList},
  states: [contactsState, newContactState, viewContactState, editContactState]
};