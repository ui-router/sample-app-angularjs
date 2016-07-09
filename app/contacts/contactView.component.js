/**
 * This component renders details for a single contact
 * 
 * A button messages the contact by linking to `mymessages.compose` state passing the email as a state parameter.
 * Another button edits the contact by linking to `contacts.contact.edit` state.
 */

export const contactView = {
  bindings: {contact: '<'},

  template: `
    <div class="contact">
    
      <contact-detail contact="$ctrl.contact"></contact-detail>
      
      <!-- This button has an ui-sref to the mymessages.compose state. The ui-sref provides the mymessages.compose
           state with an non-url parameter, which is used as the initial message model -->
      <button class="btn btn-primary" ui-sref="mymessages.compose({ message: { to: $ctrl.contact.email } })">
        <i class="fa fa-envelope"></i><span>Message</span>
      </button>
    
      <!-- This button has a relative ui-sref to the contacts.contact.edit state. -->
      <button class="btn btn-primary" ui-sref=".edit">
        <i class="fa fa-pencil"></i><span>Edit Contact</span>
      </button>
      
    </div>
`};
