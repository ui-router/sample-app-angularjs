var template = `
<div class="my-contacts flex-h">
  <ul class="selectlist list-unstyled flex nogrow">
    <li ui-sref-active="selected" ng-repeat="contact in vm.contacts" >
      <a ui-sref=".contact({contactId: contact._id})">
        {{contact.name.first}} {{contact.name.last}}
      </a>
    </li>
  </ul>

  <div ui-view></div>
</div>
`;

function ContactsController(contacts) {
  this.contacts = contacts;
}

let contactsState = {
  parent: 'authedStates',
  name: "contacts",
  url: "/contacts",
  resolve: {
    contacts: (Contacts) => Contacts.all()
  },
  template: template,
  controller: ContactsController,
  controllerAs: "vm"
};

export {contactsState}