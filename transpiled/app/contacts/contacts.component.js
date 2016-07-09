"use strict";
/**
 * This component renders the contacts submodule.
 *
 * On the left is the list of contacts.
 * On the right is the ui-view viewport where contact details appear.
 */
exports.contacts = {
    bindings: { contacts: '<' },
    template: "\n    <div class=\"my-contacts flex-h\">\n    \n      <contact-list contacts=\"$ctrl.contacts\" class=\"flex nogrow\"></contact-list>\n    \n      <div ui-view>\n        <!-- This default content is displayed when the ui-view is not filled in by a child state -->\n        <h4 style=\"margin: 1em 2em;\">Select a contact</h4>\n      </div>\n      \n    </div>"
};
//# sourceMappingURL=contacts.component.js.map