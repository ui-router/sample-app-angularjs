import {ngmodule} from "../bootstrap/ngmodule";

export const editContactComponent = 'editContact';

const editContactTemplate = `
<div class="contact">
  <div class="details">
    <div><label>First</label><input type="text" ng-model="$ctrl.contact.name.first"></div>
    <div><label>Last</label><input type="text" ng-model="$ctrl.contact.name.last"></div>
    <div><label>Company</label><input type="text" ng-model="$ctrl.contact.company"></div>
    <div><label>Age</label><input type="text" ng-model="$ctrl.contact.age"></div>
    <div><label>Phone</label><input type="text" ng-model="$ctrl.contact.phone"></div>
    <div><label>Email</label><input type="text" ng-model="$ctrl.contact.email"></div>
    <div><label>Street</label><input type="text" ng-model="$ctrl.contact.address.street"></div>
    <div><label>City</label><input type="text" ng-model="$ctrl.contact.address.city"> </div>
    <div><label>State</label><input type="text" ng-model="$ctrl.contact.address.state"></div>
    <div><label>Zip</label><input type="text" ng-model="$ctrl.contact.address.zip"></div>
    <div><label>Image</label><input type="text" ng-model="$ctrl.contact.picture"></div>
  </div>

  <hr>

  <div>
    <!-- This button's ui-sref relatively targets the parent state, i.e., contacts.contact -->
    <button class="btn btn-primary" ui-sref="^"><i class="fa fa-close"></i><span>Cancel</span></button>
    <button class="btn btn-primary" ng-click="$ctrl.save($ctrl.contact)"><i class="fa fa-save"></i><span>Save</span></button>
    <button class="btn btn-primary" ng-click="$ctrl.remove($ctrl.contact)"><i class="fa fa-close"></i><span>Delete</span></button>
  </div>
</div>`;


class EditContactController {
  constructor($state, dialogService, Contacts) {
    this.$state = $state;
    this.dialogService = dialogService;
    this.Contacts = Contacts;
  }

  $onInit() {
    // Make an editable copy of the pristineContact
    this.contact = angular.copy(this.pristineContact);
  }

  uiCanExit($transition$) {
    if (this.canExit || angular.equals(this.contact, this.pristineContact)) {
      return true;
    }

    let message = 'You have unsaved changes to this contact.';
    let question = 'Navigate away and lose changes?';
    return this.dialogService.confirm(message, question);
  }

  /** Ask for confirmation, then delete the contact, then go to the grandparent state ('contacts') */
  remove(contact) {
    this.dialogService.confirm(`Delete contact: ${contact.name.first} ${contact.name.last}`)
        .then(() => this.Contacts.remove(contact))
        .then(() => this.canExit = true)
        .then(() => this.$state.go("^.^"));
  }

  /** Save the contact, then go to the grandparent state ('contacts') */
  save(contact) {
    this.Contacts.save(contact)
        .then(() => this.canExit = true)
        .then(() => this.$state.go("^", null, { reload: true }));
  }
}

EditContactController.prototype.uiCanExit.$inject = ['$transition$'];

ngmodule.component(editContactComponent, {
  bindings: { pristineContact: '<' },
  controller: EditContactController,
  template: editContactTemplate
});
