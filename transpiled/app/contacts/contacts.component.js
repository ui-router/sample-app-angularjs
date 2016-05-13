"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ui_router_ng2_1 = require("ui-router-ng2");
var core_1 = require("@angular/core");
var contactsTemplate = "\n<div class=\"my-contacts flex-h\">\n  <ul class=\"selectlist list-unstyled flex nogrow\">\n    <li>\n      <!-- This link is a relative ui-sref to the contacts.new state. -->\n      <a uiSref=\".new\">\n        <button class=\"btn btn-primary\">\n          <i class=\"fa fa-pencil\"></i><span>New Contact</span>\n        </button>\n      </a>\n    </li>\n\n    <li>&nbsp;</li>\n\n    <!-- Highlight the selected contact:\n        When the current state matches the ui-sref's state (and its parameters)\n        ui-sref-active applies the 'selected' class to the li element -->\n    <li *ngFor=\"#contact of contacts\" >\n      <a uiSref=\".contact\" [uiParams]=\"{contactId: contact._id}\" uiSrefActive=\"selected\">\n        {{contact.name.first}} {{contact.name.last}}\n      </a>\n    </li>\n  </ul>\n\n  <div ui-view>\n    <!-- This default content is displayed when the ui-view is not filled in by a child state -->\n    <h4 style=\"margin: 1em 2em;\">Select a contact</h4>\n  </div>\n</div>";
var ContactsComponent = (function () {
    function ContactsComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContactsComponent.prototype, "contacts", void 0);
    ContactsComponent = __decorate([
        core_1.Component({
            selector: 'contacts',
            template: contactsTemplate,
            directives: [ui_router_ng2_1.UIROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
//# sourceMappingURL=contacts.component.js.map