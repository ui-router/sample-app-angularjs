import {ngmodule} from "../bootstrap/ngmodule";

// Import all the state definitions for this submodule...
import { contactsState } from "./contacts.state";
import { editContactState } from "./editContact.state";
import { newContactState } from "./newContact.state";
import { viewContactState } from "./contact.state";

// ...and register them with the $stateProvider
ngmodule.config(($stateProvider) => {
  let contactsStates = [contactsState, newContactState, viewContactState, editContactState];
  contactsStates.forEach(state => $stateProvider.state(state));
});