export let editContactTemplate = `
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
    <!-- This button's ui-sref relatively targets the parent state, i.e., contacts.contact -->
    <button class="btn btn-primary" ui-sref="^"><i class="fa fa-close"></i><span>Cancel</span></button>
    <button class="btn btn-primary" ng-click="vm.save(vm.contact)"><i class="fa fa-save"></i><span>Save</span></button>
    <button class="btn btn-primary" ng-click="vm.remove(vm.contact)"><i class="fa fa-close"></i><span>Delete</span></button>
  </div>
</div>

`;

// contact is a RevertableModel object injected from the state's resolve data.
export class EditContactController {
  constructor($state, dialogService, Contacts, contact) {
    this.$state = $state;
    this.dialogService = dialogService;
    this.Contacts = Contacts;

    // Take the editable part of the RevertableModel and put it on the controller for the view to use
    this.contact = contact.editableModel;
    this.clearDirty = () => contact.clearDirty();
  }

  /** Ask for confirmation, then delete the contact, then go to the grandparent state ('contacts') */
  remove(contact) {
    this.dialogService.confirm(`Delete contact: ${contact.name.first} ${contact.name.last}`)
        .then(() => this.Contacts.remove(contact))
        .then(this.clearDirty)
        .then(() => this.$state.go("^.^"));
  }

  /** Save the contact, then go to the grandparent state ('contacts') */
  save(contact) {
    this.Contacts.save(contact)
        .then(this.clearDirty)
        .then(() => this.$state.go("^", null, { reload: true }));
  }
}
