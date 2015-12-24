import {angular} from "angular";

let template = `
<div class="contact">
  <div class="flex-h">
    <div class="details">
      <h3>{{vm.contact.name.first}} {{vm.contact.name.last}}</h3>
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
  <button class="btn btn-primary" ui-sref="mymessages.compose({ message: { to: vm.contact.email } })"><i class="fa fa-envelope"></i><span>Message</span></button>
  <button class="btn btn-primary" ui-sref=".edit"><i class="fa fa-pencil"></i><span>Edit Contact</span></button>
</div>
`;

function ContactController(contact) {
  this.contact = contact;
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