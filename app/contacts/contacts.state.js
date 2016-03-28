import {contactsTemplate, contactsController} from "./contacts.component";
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
  template: contactsTemplate,
  controller: contactsController,
  controllerAs: "vm",
  data: { requiresAuth: true }
};

export {contactsState}