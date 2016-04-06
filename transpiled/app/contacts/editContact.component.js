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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ui_router_ng2_1 = require("ui-router-ng2");
var core_1 = require("angular2/core");
var editContactTemplate = "\n<div class=\"contact\">\n  <div class=\"details\">\n    <div><label>First</label><input type=\"text\" [(ngModel)]=\"contact.name.first\"></div>\n    <div><label>Last</label><input type=\"text\" [(ngModel)]=\"contact.name.last\"></div>\n    <div><label>Company</label><input type=\"text\" [(ngModel)]=\"contact.company\"></div>\n    <div><label>Age</label><input type=\"text\" [(ngModel)]=\"contact.age\"></div>\n    <div><label>Phone</label><input type=\"text\" [(ngModel)]=\"contact.phone\"></div>\n    <div><label>Email</label><input type=\"text\" [(ngModel)]=\"contact.email\"></div>\n    <div><label>Street</label><input type=\"text\" [(ngModel)]=\"contact.address.street\"></div>\n    <div><label>City</label><input type=\"text\" [(ngModel)]=\"contact.address.city\"> </div>\n    <div><label>State</label><input type=\"text\" [(ngModel)]=\"contact.address.state\"></div>\n    <div><label>Zip</label><input type=\"text\" [(ngModel)]=\"contact.address.zip\"></div>\n    <div><label>Image</label><input type=\"text\" [(ngModel)]=\"contact.picture\"></div>\n  </div>\n\n  <hr>\n\n  <div>\n    <!-- This button's ui-sref relatively targets the parent state, i.e., contacts.contact -->\n    <button class=\"btn btn-primary\" uiSref=\"^\"><i class=\"fa fa-close\"></i><span>Cancel</span></button>\n    <button class=\"btn btn-primary\" (click)=\"save(contact)\"><i class=\"fa fa-save\"></i><span>Save</span></button>\n    <button class=\"btn btn-primary\" (click)=\"remove(contact)\"><i class=\"fa fa-close\"></i><span>Delete</span></button>\n  </div>\n</div>";
var EditContactComponent = (function () {
    function EditContactComponent($state, dialogService, Contacts) {
        this.$state = $state;
        this.dialogService = dialogService;
        this.Contacts = Contacts;
    }
    EditContactComponent.prototype.ngOnInit = function () {
        // Make an editable copy of the pristineContact
        this.contact = angular.copy(this.pristineContact);
    };
    EditContactComponent.prototype.uiCanExit = function ($transition$) {
        if (this.canExit || angular.equals(this.contact, this.pristineContact)) {
            return true;
        }
        var message = 'You have unsaved changes to this contact.';
        var question = 'Navigate away and lose changes?';
        return this.dialogService.confirm(message, question);
    };
    /** Ask for confirmation, then delete the contact, then go to the grandparent state ('contacts') */
    EditContactComponent.prototype.remove = function (contact) {
        var _this = this;
        this.dialogService.confirm("Delete contact: " + contact.name.first + " " + contact.name.last)
            .then(function () { return _this.Contacts.remove(contact); })
            .then(function () { return _this.canExit = true; })
            .then(function () { return _this.$state.go("^.^"); });
    };
    /** Save the contact, then go to the grandparent state ('contacts') */
    EditContactComponent.prototype.save = function (contact) {
        var _this = this;
        this.Contacts.save(contact)
            .then(function () { return _this.canExit = true; })
            .then(function () { return _this.$state.go("^", null, { reload: true }); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditContactComponent.prototype, "pristineContact", void 0);
    EditContactComponent = __decorate([
        core_1.Component({
            selector: 'edit-contact',
            template: editContactTemplate,
            directives: [ui_router_ng2_1.UIROUTER_DIRECTIVES]
        }),
        __param(0, core_1.Inject('$state')),
        __param(1, core_1.Inject('dialogService')),
        __param(2, core_1.Inject('Contacts')), 
        __metadata('design:paramtypes', [Object, Object, Object])
    ], EditContactComponent);
    return EditContactComponent;
}());
exports.EditContactComponent = EditContactComponent;
//# sourceMappingURL=editContact.component.js.map