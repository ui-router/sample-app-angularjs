import {Component, Input} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {UIROUTER_DIRECTIVES} from "ui-router-ng2";

const contactTemplate = `
<div class="contact">
  <div class="flex-h">
    <div class="details">
      <h3>{{contact.name.first}} {{contact.name.last}}</h3>
      <div><label>Company</label><div>{{contact.company}}</div></div>
      <div><label>Age</label><div>{{contact.age}}</div></div>
      <div><label>Phone</label><div>{{contact.phone}}</div></div>
      <div><label>Email</label><div>{{contact.email}}</div></div>
      <div class="flex-h">
        <label>Address</label>
        <div>{{contact.address.street}}<br>
              {{contact.address.city}}, {{contact.address.state}} {{contact.address.zip}}
        </div>
      </div>
    </div>

    <div class="flex nogrow">
      <img [src]="contact.picture"/>
    </div>
  </div>

  <!-- This button has an ui-sref to the mymessages.compose state. The ui-sref provides the mymessages.compose
       state with an non-url parameter, which is used as the initial message model -->
  <button class="btn btn-primary" uiSref="mymessages.compose" [uiParams]="{ message: { to: contact.email } }">
    <i class="fa fa-envelope"></i><span>Message</span>
  </button>

  <!-- This button has a relative ui-sref to the contacts.contact.edit state. -->
  <button class="btn btn-primary" uiSref=".edit">
    <i class="fa fa-pencil"></i><span>Edit Contact</span>
  </button>
  <ui-view></ui-view>
</div>
`;

@Component({
  selector: 'contact',
  template: contactTemplate,
  directives: [CORE_DIRECTIVES, UIROUTER_DIRECTIVES]
})
export class ContactComponent {
  @Input() contact;
}
