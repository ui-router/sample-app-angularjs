import {UIROUTER_DIRECTIVES} from "ui-router-ng2";
import {Component, Input} from "@angular/core";

const contactsTemplate = `
<div class="my-contacts flex-h">
  <ul class="selectlist list-unstyled flex nogrow">
    <li>
      <!-- This link is a relative ui-sref to the contacts.new state. -->
      <a uiSref=".new">
        <button class="btn btn-primary">
          <i class="fa fa-pencil"></i><span>New Contact</span>
        </button>
      </a>
    </li>

    <li>&nbsp;</li>

    <!-- Highlight the selected contact:
        When the current state matches the ui-sref's state (and its parameters)
        ui-sref-active applies the 'selected' class to the li element -->
    <li *ngFor="#contact of contacts" >
      <a uiSref=".contact" [uiParams]="{contactId: contact._id}" uiSrefActive="selected">
        {{contact.name.first}} {{contact.name.last}}
      </a>
    </li>
  </ul>

  <div ui-view>
    <!-- This default content is displayed when the ui-view is not filled in by a child state -->
    <h4 style="margin: 1em 2em;">Select a contact</h4>
  </div>
</div>`;

@Component({
  selector: 'contacts',
  template: contactsTemplate,
  directives: [UIROUTER_DIRECTIVES]
})
export class ContactsComponent {
  @Input() contacts;
}

