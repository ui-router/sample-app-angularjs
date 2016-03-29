"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
exports.contactsComponent = "contacts";
var contactsTemplate = "\n<div class=\"my-contacts flex-h\">\n  <ul class=\"selectlist list-unstyled flex nogrow\">\n    <li>\n      <!-- This link is a relative ui-sref to the contacts.new state. -->\n      <a ui-sref=\".new\">\n        <button class=\"btn btn-primary\">\n          <i class=\"fa fa-pencil\"></i><span>New Contact</span>\n        </button>\n      </a>\n    </li>\n\n    <li>&nbsp;</li>\n\n    <!-- Highlight the selected contact:\n        When the current state matches the ui-sref's state (and its parameters)\n        ui-sref-active applies the 'selected' class to the li element -->\n    <li ui-sref-active=\"selected\" ng-repeat=\"contact in $ctrl.contacts\" >\n      <a ui-sref=\".contact({contactId: contact._id})\">\n        {{contact.name.first}} {{contact.name.last}}\n      </a>\n    </li>\n  </ul>\n\n  <div ui-view>\n    <!-- This default content is displayed when the ui-view is not filled in by a child state -->\n    <h4 style=\"margin: 1em 2em;\">Select a contact</h4>\n  </div>\n</div>\n";
ngmodule_1.ngmodule.component(exports.contactsComponent, {
    bindings: { contacts: '<' },
    template: contactsTemplate
});
//# sourceMappingURL=contacts.component.js.map