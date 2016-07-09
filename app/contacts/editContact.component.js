/**
 * The controller for the editContact component
 *
 * The component makes a copy of the contqct data for editing.
 * The new copy and original (pristine) copy are used to determine if the contact is "dirty" or not.
 * If the user navigates to some other state while the contact is "dirty", the `uiCanExit` component
 * hook asks the user to confirm navigation away, losing any edits.
 *
 * The Delete Contact button is wired to the `remove` method, which:
 * - asks for confirmation from the user
 * - deletes the resource from REST API
 * - navigates back to the contacts grandparent state using relative addressing `^.^`
 *   the `reload: true` option re-fetches the contacts list from the server
 *
 * The Save Contact button is wired to the `save` method which:
 * - saves the REST resource (PUT or POST, depending)
 * - navigates back to the read-only view of the contact using relative addressing `^`
 *   the `reload: true` option re-fetches the contacts resolve data from the server
 */
class EditContactController {
  constructor($state, DialogService, Contacts) {
    this.$state = $state;
    this.DialogService = DialogService;
    this.Contacts = Contacts;
  }

  $onInit() {
    // Make an editable copy of the pristineContact
    this.contact = angular.copy(this.pristineContact);
  }

  uiCanExit() {
    if (this.canExit || angular.equals(this.contact, this.pristineContact)) {
      return true;
    }

    let message = 'You have unsaved changes to this contact.';
    let question = 'Navigate away and lose changes?';
    return this.DialogService.confirm(message, question);
  }

  /** Ask for confirmation, then delete the contact, then go to the grandparent state ('contacts') */
  remove(contact) {
    this.DialogService.confirm(`Delete contact: ${contact.name.first} ${contact.name.last}`)
        .then(() => this.Contacts.remove(contact))
        .then(() => this.canExit = true)
        .then(() => this.$state.go("^.^", null, { reload: true }));
  }

  /** Save the contact, then go to the grandparent state ('contacts') */
  save(contact) {
    this.Contacts.save(contact)
        .then(() => this.canExit = true)
        .then(() => this.$state.go("^", null, { reload: true }));
  }
}

/**
 * This component edits a single contact.
 *
 * Editable fields are bound to the contact.
 * A button cancels editing and returns to the contact view by linking to the parent state using `^` relative addressing.
 * Another button saves the contact.
 * A third button deletes the bcontact.
 */
export const editContact =  {
  bindings: { pristineContact: '<' },

  controller: EditContactController,

  template: `
    <div class="contact">
      <div class="details">
        <div><label>First</label>   <input type="text" ng-model="$ctrl.contact.name.first"></div>
        <div><label>Last</label>    <input type="text" ng-model="$ctrl.contact.name.last"></div>
        <div><label>Company</label> <input type="text" ng-model="$ctrl.contact.company"></div>
        <div><label>Age</label>     <input type="text" ng-model="$ctrl.contact.age"></div>
        <div><label>Phone</label>   <input type="text" ng-model="$ctrl.contact.phone"></div>
        <div><label>Email</label>   <input type="text" ng-model="$ctrl.contact.email"></div>
        <div><label>Street</label>  <input type="text" ng-model="$ctrl.contact.address.street"></div>
        <div><label>City</label>    <input type="text" ng-model="$ctrl.contact.address.city"> </div>
        <div><label>State</label>   <input type="text" ng-model="$ctrl.contact.address.state"></div>
        <div><label>Zip</label>     <input type="text" ng-model="$ctrl.contact.address.zip"></div>
        <div><label>Image</label>   <input type="text" ng-model="$ctrl.contact.picture"></div>
      </div>
    
      <hr>
    
      <div>
        <!-- This button's ui-sref relatively targets the parent state, i.e., contacts.contact -->
        <button class="btn btn-primary" ui-sref="^"><i class="fa fa-close"></i><span>Cancel</span></button>
        <button class="btn btn-primary" ng-click="$ctrl.save($ctrl.contact)"><i class="fa fa-save"></i><span>Save</span></button>
        <button class="btn btn-primary" ng-click="$ctrl.remove($ctrl.contact)"><i class="fa fa-close"></i><span>Delete</span></button>
      </div>
    </div>
`};
