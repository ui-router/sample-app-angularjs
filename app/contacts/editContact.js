import angular from "angular";
import "../util/dialog"

let template = `
<div class="contact">
  <div class="details">
    <div><label>First</label><input type="text" ng-model="vm.contact.name.first"></div>
    <div><label>Last</label><input type="text" ng-model="vm.contact.name.last"></div>
    <div><label>Company</label><input type="text" ng-model="vm.contact.company"></div>
    <div><label>Age</label><input type="text" ng-model="vm.contact.age"></div>
    <div><label>Phone</label><input type="text" ng-model="vm.contact.phone"></div>
    <div><label>Email</label><input type="text" ng-model="vm.contact.email"></div>
    <div><label>Street</label><input type="text" ng-model="vm.contact.address.street"></div>
    <div><label>City</label><input type="text" ng-model="vm.contact.address.city"> </div>
    <div><label>State</label><input type="text" ng-model="vm.contact.address.state"></div>
    <div><label>Zip</label><input type="text" ng-model="vm.contact.address.zip"></div>
    <div><label>Image</label><input type="text" ng-model="vm.contact.picture"></div>
  </div>

  <hr>

  <div>
    <button class="btn btn-primary" ui-sref="^"><i class="fa fa-close"></i><span>Cancel</span></button>
    <button class="btn btn-primary" ng-click="vm.save(vm.contact)"><i class="fa fa-save"></i><span>Save</span></button>
    <button class="btn btn-primary" ng-click="vm.remove(vm.contact)"><i class="fa fa-close"></i><span>Delete</span></button>
  </div>
</div>

`;

function EditContactController($state, dialogService, Contacts, contact, statusApi) {
  statusApi.isDirty = () => !angular.equals(this.contact, contact);
  let resetPristine = () => contact = this.contact;

  this.contact = angular.copy(contact);

  this.remove = function (contact) {
    dialogService.confirm(`Delete contact: ${contact.name.first} ${contact.name.last}`)
        .then(() => Contacts.remove(contact))
        .then(resetPristine)
        .then(() => $state.go("^.^"));
  };

  this.save = function (contact) {
    Contacts.save(contact)
        .then(resetPristine)
        .then(() => $state.go("^", null, { reload: true }));
  };
}

let editContactState = {
  name: 'contacts.contact.edit',
  url: '/edit',
  resolve: {
    statusApi: () => ({
      isDirty: () => false
    })
  },
  onExit: (dialogService, statusApi) => {
    if (statusApi.isDirty())
      return dialogService.confirm('You have unsaved changes to this contact.', 'Navigate away and lose changes?', "Yes", "No");
  },
  views: {
    '^.^.$default': {
      template: template,
      controller: EditContactController,
      controllerAs: 'vm'
    }
  }
};

export {editContactState};