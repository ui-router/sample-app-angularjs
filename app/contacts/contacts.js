/**
 * This state displays the contact list.
 * It also provides a nested ui-view (viewport) for child states to fill in.
 *
 * The contacts are fetched using a resolve.
 */
var template = `
<div class="my-contacts flex-h">
  <ul class="selectlist list-unstyled flex nogrow">
    <!-- Highlight the selected contact:
        When the current state matches the ui-sref's state (and its parameters)
        ui-sref-active applies the 'selected' class to the li element -->
    <li ui-sref-active="selected" ng-repeat="contact in vm.contacts" >
      <a ui-sref=".contact({contactId: contact._id})">
        {{contact.name.first}} {{contact.name.last}}
      </a>
    </li>
  </ul>

  <div ui-view>
    <!-- This default content is displayed when the ui-view is not filled in by a child state -->
    <h4 style="margin: 1em 2em;">Select a contact</h4>
  </div>
</div>
`;

function ContactsController(contacts) {
  this.contacts = contacts;
}

let contactsState = {
  parent: 'app', // declares that 'contacts' is a child of 'app'
  name: "contacts",
  url: "/contacts",
  resolve: {
    // Resolve all the contacts.  The resolved contacts are injected into the controller.
    contacts: (Contacts) => Contacts.all()
  },
  template: template,
  controller: ContactsController,
  controllerAs: "vm",
  data: { requiresAuth: true }
};

export {contactsState}