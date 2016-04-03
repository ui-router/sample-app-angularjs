import {ngmodule} from "../bootstrap/ngmodule";
import "../services/dialog";

import {contactComponent} from "./contact.component";
import {contactsComponent} from "./contacts.component";
import {editContactComponent} from "./editContact.component";
import {RevertableModel} from "../util/revertableModel";

/**
 * This state displays the contact list.
 * It also provides a nested ui-view (viewport) for child states to fill in.
 *
 * The contacts are fetched using a resolve.
 */
let contactsState = {
  parent: 'app', // declares that 'contacts' is a child of 'app'
  name: "contacts",
  url: "/contacts",
  resolve: {
    // Resolve all the contacts.  The resolved contacts are injected into the controller.
    contacts: (Contacts) => Contacts.all()
  },
  data: { requiresAuth: true },
  component: contactsComponent
};

/**
 * This state displays a single contact.
 * The contact to display is fetched using a resolve, based on the `contactId` parameter.
 */
let viewContactState = {
  name: 'contacts.contact',
  url: '/:contactId',
  resolve: {
    // Resolve the contact, based on the contactId parameter value.
    // The resolved contact is provided to the contactComponent's contact binding
    contact: (Contacts, $stateParams) => Contacts.get($stateParams.contactId)
  },
  component: contactComponent
};


/**
 * This state allows a user to edit a contact
 *
 * The contact data to edit is injected from the parent state's resolve.
 *
 * This state uses view targeting to replace the parent ui-view (which would normally be filled
 * by 'contacts.contact') with the edit contact template/controller
 */
let editContactState = {
  name: 'contacts.contact.edit',
  url: '/edit',
  views: {
    // Relatively target the grand-parent-state's $default (unnamed) ui-view
    // This could also have been written using ui-view@state addressing: $default@contacts
    // Or, this could also have been written using absolute ui-view addressing: !$default.$default.$default
    '^.^.$default': {
      bindings: { pristineContact: "contact" },
      component: editContactComponent
    }
  }
};

/**
 * This state allows a user to create a new contact
 *
 * The contact data to edit is injected into the component from the parent state's resolve.
 */
let newContactState = {
  name: 'contacts.new',
  url: '/new',
  component: editContactComponent
};

// ...and register them with the $stateProvider
ngmodule.config(($stateProvider) => {
  let contactsStates = [contactsState, newContactState, viewContactState, editContactState];
  contactsStates.forEach(state => $stateProvider.state(state));
});