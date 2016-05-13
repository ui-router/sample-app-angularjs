import {UIROUTER_DIRECTIVES, TransitionService, UiView} from "ui-router-ng2";
import {Component, Input, Inject, Optional} from "@angular/core";

const editContactTemplate = `
<div class="contact">
  <div class="details">
    <div><label>First</label><input type="text" [(ngModel)]="contact.name.first"></div>
    <div><label>Last</label><input type="text" [(ngModel)]="contact.name.last"></div>
    <div><label>Company</label><input type="text" [(ngModel)]="contact.company"></div>
    <div><label>Age</label><input type="text" [(ngModel)]="contact.age"></div>
    <div><label>Phone</label><input type="text" [(ngModel)]="contact.phone"></div>
    <div><label>Email</label><input type="text" [(ngModel)]="contact.email"></div>
    <div><label>Street</label><input type="text" [(ngModel)]="contact.address.street"></div>
    <div><label>City</label><input type="text" [(ngModel)]="contact.address.city"> </div>
    <div><label>State</label><input type="text" [(ngModel)]="contact.address.state"></div>
    <div><label>Zip</label><input type="text" [(ngModel)]="contact.address.zip"></div>
    <div><label>Image</label><input type="text" [(ngModel)]="contact.picture"></div>
  </div>

  <hr>

  <div>
    <!-- This button's ui-sref relatively targets the parent state, i.e., contacts.contact -->
    <button class="btn btn-primary" uiSref="^"><i class="fa fa-close"></i><span>Cancel</span></button>
    <button class="btn btn-primary" (click)="save(contact)"><i class="fa fa-save"></i><span>Save</span></button>
    <button class="btn btn-primary" (click)="remove(contact)"><i class="fa fa-close"></i><span>Delete</span></button>
  </div>
</div>`;


@Component({
  selector: 'edit-contact',
  template: editContactTemplate,
  directives: [UIROUTER_DIRECTIVES]
})
export class EditContactComponent {
  @Input() pristineContact;
  contact;
  state;
  deregister;
  canExit: boolean;

  constructor(@Inject('$state') public $state,
              @Inject('dialogService') public dialogService,
              @Inject('Contacts') public Contacts,
              @Optional() @Inject(UiView.PARENT_INJECT) view,
              public $trans: TransitionService) {
    this.state = view && view.context && view.context.name;
  }

  ngOnInit() {
    // Make an editable copy of the pristineContact
    this.contact = angular.copy(this.pristineContact);
    this.deregister = this.$trans.onBefore({ exiting: this.state }, ($transition$) => this.uiCanExit($transition$));
  }

  ngOnDestroy() {
    if (this.deregister) this.deregister();
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
