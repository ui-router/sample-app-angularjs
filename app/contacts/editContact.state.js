import "../services/dialog";
import {template, EditContactController} from "./editContact.component";
import {RevertableModel} from "../util/revertableModel";

/**
 * This state allows a user to edit a contact
 *
 * The contact data to edit is injected from the parent state's resolve.
 *
 * This state uses view targeting to replace the parent ui-view (which would normally be filled
 * by 'contacts.contact') with the edit contact template/controller
 */
export let editContactState = {
  name: 'contacts.contact.edit',
  url: '/edit',
  resolve: {
    // Override parent "contact" resolve with a RevertableModel wrapper
    // This provides a fresh copy to edit, and modification detection
    contact: (contact) => new RevertableModel(contact)
  },
  onExit: (dialogService, contact) => {
    if (contact.isDirty())
      return dialogService.confirm('You have unsaved changes to this contact.', 'Navigate away and lose changes?', "Yes", "No");
  },
  views: {
    // Relatively target the parent-state's parent-state's $default (unnamed) ui-view
    // This could also have been written using ui-view@state addressing: $default@contacts
    // Or, this could also have been written using absolute ui-view addressing: !$default.$default.$default
    '^.^.$default': {
      template: template,
      controller: EditContactController,
      controllerAs: 'vm'
    }
  }
};
