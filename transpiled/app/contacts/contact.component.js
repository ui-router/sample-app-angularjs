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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ui_router_ng2_1 = require("ui-router-ng2");
var contactTemplate = "\n<div class=\"contact\">\n  <div class=\"flex-h\">\n    <div class=\"details\">\n      <h3>{{contact.name.first}} {{contact.name.last}}</h3>\n      <div><label>Company</label><div>{{contact.company}}</div></div>\n      <div><label>Age</label><div>{{contact.age}}</div></div>\n      <div><label>Phone</label><div>{{contact.phone}}</div></div>\n      <div><label>Email</label><div>{{contact.email}}</div></div>\n      <div class=\"flex-h\">\n        <label>Address</label>\n        <div>{{contact.address.street}}<br>\n              {{contact.address.city}}, {{contact.address.state}} {{contact.address.zip}}\n        </div>\n      </div>\n    </div>\n\n    <div class=\"flex nogrow\">\n      <img [src]=\"contact.picture\"/>\n    </div>\n  </div>\n\n  <!-- This button has an ui-sref to the mymessages.compose state. The ui-sref provides the mymessages.compose\n       state with an non-url parameter, which is used as the initial message model -->\n  <button class=\"btn btn-primary\" uiSref=\"mymessages.compose\" [uiParams]=\"{ message: { to: contact.email } }\">\n    <i class=\"fa fa-envelope\"></i><span>Message</span>\n  </button>\n\n  <!-- This button has a relative ui-sref to the contacts.contact.edit state. -->\n  <button class=\"btn btn-primary\" uiSref=\".edit\">\n    <i class=\"fa fa-pencil\"></i><span>Edit Contact</span>\n  </button>\n  <ui-view></ui-view>\n</div>\n";
var ContactComponent = (function () {
    function ContactComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContactComponent.prototype, "contact", void 0);
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'contact',
            template: contactTemplate,
            directives: [common_1.CORE_DIRECTIVES, ui_router_ng2_1.UIROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map