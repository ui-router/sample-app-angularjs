import {ngmodule} from "../ngmodule";

// Import all the state definitions for this submodule...
import { contactsState } from "./contacts";
import { editContactState } from "./editContact";
import { viewContactState } from "./contact";

// ...and register them with the $stateProvider
ngmodule.config(($stateProvider) => {
  let contactsStates = [contactsState, viewContactState, editContactState];
  contactsStates.forEach(state => $stateProvider.state(state));
});