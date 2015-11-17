import {app} from "../index";

import { contactsState } from "./contacts";
import { editContactState } from "./editContact";
import { viewContactState } from "./contact";

app.config(($stateProvider) => {
  let contactsStates = [contactsState, viewContactState, editContactState];
  contactsStates.forEach(state => $stateProvider.state(state));
});