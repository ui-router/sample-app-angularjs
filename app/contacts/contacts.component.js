export var template = `
<div class="my-contacts flex-h">
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

export let controller = function ContactsController(contacts) {
  this.contacts = contacts;
};

