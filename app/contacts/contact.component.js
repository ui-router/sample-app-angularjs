import {ngmodule} from "../bootstrap/ngmodule";

export const contactComponent = "contact";

const contactTemplate = `
<div class="contact">
  <div class="flex-h">
    <div class="details">
      <h3>{{$ctrl.contact.name.first}} {{$ctrl.contact.name.last}}</h3>
      <div><label>Company</label><div>{{$ctrl.contact.company}}</div></div>
      <div><label>Age</label><div>{{$ctrl.contact.age}}</div></div>
      <div><label>Phone</label><div>{{$ctrl.contact.phone}}</div></div>
      <div><label>Email</label><div>{{$ctrl.contact.email}}</div></div>
      <div class="flex-h">
        <label>Address</label>
        <div>{{$ctrl.contact.address.street}}<br>
              {{$ctrl.contact.address.city}}, {{$ctrl.contact.address.state}} {{$ctrl.contact.address.zip}}
        </div>
      </div>
    </div>

    <div class="flex nogrow">
      <img ng-src="{{$ctrl.contact.picture}}"/>
    </div>
  </div>

  <!-- This button has an ui-sref to the mymessages.compose state. The ui-sref provides the mymessages.compose
       state with an non-url parameter, which is used as the initial message model -->
  <button class="btn btn-primary" ui-sref="mymessages.compose({ message: { to: $ctrl.contact.email } })">
    <i class="fa fa-envelope"></i><span>Message</span>
  </button>

  <!-- This button has a relative ui-sref to the contacts.contact.edit state. -->
  <button class="btn btn-primary" ui-sref=".edit">
    <i class="fa fa-pencil"></i><span>Edit Contact</span>
  </button>
</div>`;


ngmodule.component(contactComponent, {
  bindings: { contact: '<' },
  template: contactTemplate
});

