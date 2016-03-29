"use strict";
exports.editContactTemplate = "\n<div class=\"contact\">\n  <div class=\"details\">\n    <div><label>First</label><input type=\"text\" ng-model=\"$ctrl.contact.name.first\"></div>\n    <div><label>Last</label><input type=\"text\" ng-model=\"$ctrl.contact.name.last\"></div>\n    <div><label>Company</label><input type=\"text\" ng-model=\"$ctrl.contact.company\"></div>\n    <div><label>Age</label><input type=\"text\" ng-model=\"$ctrl.contact.age\"></div>\n    <div><label>Phone</label><input type=\"text\" ng-model=\"$ctrl.contact.phone\"></div>\n    <div><label>Email</label><input type=\"text\" ng-model=\"$ctrl.contact.email\"></div>\n    <div><label>Street</label><input type=\"text\" ng-model=\"$ctrl.contact.address.street\"></div>\n    <div><label>City</label><input type=\"text\" ng-model=\"$ctrl.contact.address.city\"> </div>\n    <div><label>State</label><input type=\"text\" ng-model=\"$ctrl.contact.address.state\"></div>\n    <div><label>Zip</label><input type=\"text\" ng-model=\"$ctrl.contact.address.zip\"></div>\n    <div><label>Image</label><input type=\"text\" ng-model=\"$ctrl.contact.picture\"></div>\n  </div>\n\n  <hr>\n\n  <div>\n    <!-- This button's ui-sref relatively targets the parent state, i.e., contacts.contact -->\n    <button class=\"btn btn-primary\" ui-sref=\"^\"><i class=\"fa fa-close\"></i><span>Cancel</span></button>\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.save($ctrl.contact)\"><i class=\"fa fa-save\"></i><span>Save</span></button>\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.remove($ctrl.contact)\"><i class=\"fa fa-close\"></i><span>Delete</span></button>\n  </div>\n</div>\n\n";
// contact is a RevertableModel object injected from the state's resolve data.
var EditContactController = (function () {
    function EditContactController($state, dialogService, Contacts, contact) {
        this.$state = $state;
        this.dialogService = dialogService;
        this.Contacts = Contacts;
        // Take the editable part of the RevertableModel and put it on the controller for the view to use
        this.contact = contact.editableModel;
        this.clearDirty = function () { return contact.clearDirty(); };
    }
    /** Ask for confirmation, then delete the contact, then go to the grandparent state ('contacts') */
    EditContactController.prototype.remove = function (contact) {
        var _this = this;
        this.dialogService.confirm("Delete contact: " + contact.name.first + " " + contact.name.last)
            .then(function () { return _this.Contacts.remove(contact); })
            .then(this.clearDirty)
            .then(function () { return _this.$state.go("^.^"); });
    };
    /** Save the contact, then go to the grandparent state ('contacts') */
    EditContactController.prototype.save = function (contact) {
        var _this = this;
        this.Contacts.save(contact)
            .then(this.clearDirty)
            .then(function () { return _this.$state.go("^", null, { reload: true }); });
    };
    return EditContactController;
}());
exports.EditContactController = EditContactController;
//# sourceMappingURL=editContact.component.js.map