/**
 * This component renders a list of contacts.
 * 
 * At the top is a "new contact" button.
 * Each list item is a clickable link to the `contacts.contact` details substate
 */
export const contactList = {
  bindings: { contacts: '<' },

  template: `
    <ul class="selectlist list-unstyled flex nogrow">
      <li>
        <!-- This link is a relative ui-sref to the contacts.new state. -->
        <a ui-sref=".new">
          <button class="btn btn-primary">
            <i class="fa fa-pencil"></i><span>New Contact</span>
          </button>
        </a>
      </li>
  
      <li>&nbsp;</li>
  
      <!-- Highlight the selected contact:
          When the current state matches the ui-sref's state (and its parameters)
          ui-sref-active applies the 'selected' class to the li element -->
      <li ng-repeat="contact in $ctrl.contacts" ui-sref-active="selected">
        <a ui-sref=".contact({contactId: contact._id})">
          {{contact.name.first}} {{contact.name.last}}
        </a>
      </li>
    </ul>
`
};