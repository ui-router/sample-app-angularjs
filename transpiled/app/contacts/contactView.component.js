/**
 * This component renders details for a single contact
 *
 * A button messages the contact by linking to `mymessages.compose` state passing the email as a state parameter.
 * Another button edits the contact by linking to `contacts.contact.edit` state.
 */
"use strict";
exports.contactView = {
    bindings: { contact: '<' },
    template: "\n    <div class=\"contact\">\n    \n      <contact-detail contact=\"$ctrl.contact\"></contact-detail>\n      \n      <!-- This button has an ui-sref to the mymessages.compose state. The ui-sref provides the mymessages.compose\n           state with an non-url parameter, which is used as the initial message model -->\n      <button class=\"btn btn-primary\" ui-sref=\"mymessages.compose({ message: { to: $ctrl.contact.email } })\">\n        <i class=\"fa fa-envelope\"></i><span>Message</span>\n      </button>\n    \n      <!-- This button has a relative ui-sref to the contacts.contact.edit state. -->\n      <button class=\"btn btn-primary\" ui-sref=\".edit\">\n        <i class=\"fa fa-pencil\"></i><span>Edit Contact</span>\n      </button>\n      \n    </div>\n" };
//# sourceMappingURL=contactView.component.js.map