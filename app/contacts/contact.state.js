import {template, controller} from "./contact.component";
/**
 * This state displays a single contact.
 * The contact to display is fetched using a resolve, based on the `contactId` parameter.
 */
export let viewContactState = {
  name: 'contacts.contact',
  url: '/:contactId',
  resolve: {
    // Resolve the contact, based on the contactId parameter value.
    // The resolved contact is then injected into the controller.
    contact: (Contacts, $stateParams) => Contacts.get($stateParams.contactId)
  },
  template: template,
  controller: controller,
  controllerAs: 'vm'
};
