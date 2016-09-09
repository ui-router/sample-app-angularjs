import {loadNg1Module, ngmodule} from "../bootstrap/ngmodule";

import {contactDetail} from "./contactDetail.component";
import {contactList} from "./contactList.component";
import {contacts} from "./contacts.component";
import {contactView} from "./contactView.component";
import {editContact} from "./editContact.component";

import {contactsState, editContactState, newContactState, viewContactState} from "./contacts.states";

const contactsAppModule = {
  components: {contactView, contacts, editContact, contactDetail, contactList},
  states: [contactsState, newContactState, viewContactState, editContactState]
};

loadNg1Module(ngmodule, contactsAppModule);
