"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
exports.editContactComponent = 'editContact';
var editContactTemplate = "\n<div class=\"contact\">\n  <div class=\"details\">\n    <div><label>First</label><input type=\"text\" ng-model=\"$ctrl.contact.name.first\"></div>\n    <div><label>Last</label><input type=\"text\" ng-model=\"$ctrl.contact.name.last\"></div>\n    <div><label>Company</label><input type=\"text\" ng-model=\"$ctrl.contact.company\"></div>\n    <div><label>Age</label><input type=\"text\" ng-model=\"$ctrl.contact.age\"></div>\n    <div><label>Phone</label><input type=\"text\" ng-model=\"$ctrl.contact.phone\"></div>\n    <div><label>Email</label><input type=\"text\" ng-model=\"$ctrl.contact.email\"></div>\n    <div><label>Street</label><input type=\"text\" ng-model=\"$ctrl.contact.address.street\"></div>\n    <div><label>City</label><input type=\"text\" ng-model=\"$ctrl.contact.address.city\"> </div>\n    <div><label>State</label><input type=\"text\" ng-model=\"$ctrl.contact.address.state\"></div>\n    <div><label>Zip</label><input type=\"text\" ng-model=\"$ctrl.contact.address.zip\"></div>\n    <div><label>Image</label><input type=\"text\" ng-model=\"$ctrl.contact.picture\"></div>\n  </div>\n\n  <hr>\n\n  <div>\n    <!-- This button's ui-sref relatively targets the parent state, i.e., contacts.contact -->\n    <button class=\"btn btn-primary\" ui-sref=\"^\"><i class=\"fa fa-close\"></i><span>Cancel</span></button>\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.save($ctrl.contact)\"><i class=\"fa fa-save\"></i><span>Save</span></button>\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.remove($ctrl.contact)\"><i class=\"fa fa-close\"></i><span>Delete</span></button>\n  </div>\n</div>";
var EditContactController = (function () {
    function EditContactController($state, dialogService, Contacts) {
        this.$state = $state;
        this.dialogService = dialogService;
        this.Contacts = Contacts;
    }
    EditContactController.prototype.$onInit = function () {
        // Make an editable copy of the pristineContact
        this.contact = angular.copy(this.pristineContact);
    };
    EditContactController.prototype.uiCanExit = function ($transition$) {
        if (this.canExit || angular.equals(this.contact, this.pristineContact)) {
            return true;
        }
        var message = 'You have unsaved changes to this contact.';
        var question = 'Navigate away and lose changes?';
        return this.dialogService.confirm(message, question);
    };
    /** Ask for confirmation, then delete the contact, then go to the grandparent state ('contacts') */
    EditContactController.prototype.remove = function (contact) {
        var _this = this;
        this.dialogService.confirm("Delete contact: " + contact.name.first + " " + contact.name.last)
            .then(function () { return _this.Contacts.remove(contact); })
            .then(function () { return _this.canExit = true; })
            .then(function () { return _this.$state.go("^.^"); });
    };
    /** Save the contact, then go to the grandparent state ('contacts') */
    EditContactController.prototype.save = function (contact) {
        var _this = this;
        this.Contacts.save(contact)
            .then(function () { return _this.canExit = true; })
            .then(function () { return _this.$state.go("^", null, { reload: true }); });
    };
    return EditContactController;
}());
EditContactController.prototype.uiCanExit.$inject = ['$transition$'];
ngmodule_1.ngmodule.component(exports.editContactComponent, {
    bindings: { pristineContact: '<' },
    controller: EditContactController,
    template: editContactTemplate
});
//# sourceMappingURL=editContact.component.js.map