"use strict";
/**
 * This component renders a list of contacts.
 *
 * At the top is a "new contact" button.
 * Each list item is a clickable link to the `contacts.contact` details substate
 */
exports.contactList = {
    bindings: { contacts: '<' },
    template: "\n    <ul class=\"selectlist list-unstyled flex nogrow\">\n      <li>\n        <!-- This link is a relative ui-sref to the contacts.new state. -->\n        <a ui-sref=\".new\">\n          <button class=\"btn btn-primary\">\n            <i class=\"fa fa-pencil\"></i><span>New Contact</span>\n          </button>\n        </a>\n      </li>\n  \n      <li>&nbsp;</li>\n  \n      <!-- Highlight the selected contact:\n          When the current state matches the ui-sref's state (and its parameters)\n          ui-sref-active applies the 'selected' class to the li element -->\n      <li ng-repeat=\"contact in $ctrl.contacts\" ui-sref-active=\"selected\">\n        <a ui-sref=\".contact({contactId: contact._id})\">\n          {{contact.name.first}} {{contact.name.last}}\n        </a>\n      </li>\n    </ul>\n"
};
//# sourceMappingURL=contactList.component.js.map