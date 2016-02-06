import "../services/dialog";
import {template, EditContactController} from "./editContact.component";
import {RevertableModel} from "../util/revertableModel";

/**
 * This state allows a user to create a new contact
 *
 * The contact data to edit is injected from the parent state's resolve.
 */
export let newContactState = {
  name: 'contacts.new',
  url: '/new',
  resolve: {
    // provide the view with a RevertableModel wrapped around a blank contact object
    contact: () => new RevertableModel({})
  },
  onExit: (dialogService, contact) => {
    if (contact.isDirty())
      return dialogService.confirm('You have unsaved changes to this contact.', 'Navigate away and lose changes?', "Yes", "No");
  },
  template: template,
  controller: EditContactController,
  controllerAs: 'vm'
};
