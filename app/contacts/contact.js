import {angular} from "angular";

let template = `
<div class="contact flex-h">
  <div class="details">
    <div><label>First</label><div>{{vm.contact.name.first}}</div></div>
    <div><label>Last</label><div>{{vm.contact.name.last}}</div></div>
    <div><label>Company</label><div>{{vm.contact.company}}</div></div>
    <div><label>Age</label><div>{{vm.contact.age}}</div></div>
    <div><label>Phone</label><div>{{vm.contact.phone}}</div></div>
    <div><label>Email</label><div>{{vm.contact.email}}</div></div>
    <div class="flex-h">
      <label>Address</label>
      <div>{{vm.contact.address.street}}<br>
            {{vm.contact.address.city}}, {{vm.contact.address.state}} {{vm.contact.address.zip}}
      </div>
    </div>
  </div>

  <div class="flex nogrow">
    <img ng-src="{{vm.contact.picture}}"/>
  </div>
</div>
`;

function ContactController(contact) {
  this.contact = contact;
  this.remove = function (contact) {
    //let nextContactId = MessageListUi.proximalMessageId(message._id);
    //let nextState = nextContactId ? 'mymessages.folder.message' : 'mymessages.folder';
    //let params = {messageId: nextContactId};
    //Messages.remove(message).then(() => $state.go(nextState, params, {reload: 'mymessages.folder'}));
    Contacts.remove(contact).then(() => $state.go("^"));
  };
}

let viewContactState = {
  name: 'contacts.contact',
  url: '/:contactId',
  resolve: {
    contact: (Contacts, $stateParams) => Contacts.get($stateParams.contactId)
  },
  template: template,
  controller: ContactController,
  controllerAs: 'vm'
};

export {viewContactState};