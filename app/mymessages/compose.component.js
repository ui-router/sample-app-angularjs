/**
 * The controller for the Compose component
 */
class ComposeController {
  constructor($state, DialogService, AppConfig, Messages) {
    this.$state = $state;
    this.DialogService = DialogService;
    this.AppConfig = AppConfig;
    this.Messages = Messages;
  }

  /**
   * Create our message's model using the current user's email address as 'message.from'
   * Then extend it with all the properties from (non-url) state parameter 'message'.
   * Keep two copies: the editable one and the original one.
   * These copies are used to check if the message is dirty.
   */
  $onInit() {
    this.pristineMessage = angular.extend({from: this.AppConfig.emailAddress}, this.$stateParams.message);
    this.message = angular.copy(this.pristineMessage);
  }

  /**
   * Checks if the edited copy and the pristine copy are identical when the state is changing.
   * If they are not identical, the allows the user to confirm navigating away without saving.
   */
  uiCanExit() {
    if (this.canExit || angular.equals(this.pristineMessage, this.message)) {
        return true;
    }

    var message = 'You have not saved this message.';
    var question = 'Navigate away and lose changes?';
    return this.DialogService.confirm(message, question, "Yes", "No");
  }

  /**
   * Navigates back to the previous state.
   *
   * - Checks the $transition$ which activated this controller for a 'from state' that isn't the implicit root state.
   * - If there is no previous state (because the user deep-linked in, etc), then go to 'mymessages.messagelist'
   */
  gotoPreviousState() {
    let $transition$ = this.$transition$;
    let hasPrevious = !!$transition$.from().name;
    let state = hasPrevious ? $transition$.from() : "mymessages.messagelist";
    let params = hasPrevious ? $transition$.params("from") : {};
    this.$state.go(state, params);
  };

  /** "Send" the message (save to the 'sent' folder), and then go to the previous state */
  send(message) {
    this.Messages.save(angular.extend(message, {date: new Date(), read: true, folder: 'sent'}))
        .then(() => this.canExit = true)
        .then(() => this.gotoPreviousState());
  };

  /** Save the message to the 'drafts' folder, and then go to the previous state */
  save(message) {
    this.Messages.save(angular.extend(message, {date: new Date(), read: true, folder: 'drafts'}))
        .then(() => this.canExit = true)
        .then(() => this.gotoPreviousState());
  }
}
ComposeController.$inject = ['$state', 'DialogService', 'AppConfig', 'Messages'];

/**
 * This component composes a message
 *
 * The message might be new, a saved draft, or a reply/forward.
 * A Cancel button discards the new message and returns to the previous state.
 * A Save As Draft button saves the message to the "drafts" folder.
 * A Send button sends the message
 */
export const compose = {
  bindings: { $stateParams: '<', $transition$: '<' },

  controller: ComposeController,

  template: `
    <div class="compose">
      <div class="header">
        <div class="flex-h"> <label>Recipient</label> <input type="text" id="to" name="to" ng-model="$ctrl.message.to"> </div>
        <div class="flex-h"> <label>Subject</label> <input type="text" id="subject" name="subject" ng-model="$ctrl.message.subject"> </div>
      </div>
    
      <div class="body">
        <textarea name="body" id="body" ng-model="$ctrl.message.body" cols="30" rows="20"></textarea>
        
        <div class="buttons">
          <!-- Clicking this button brings the user back to the state they came from (previous state) -->
          <button class="btn btn-primary" ng-click="$ctrl.gotoPreviousState()"><i class="fa fa-times-circle-o"></i><span>Cancel</span></button>
          <button class="btn btn-primary" ng-click="$ctrl.save($ctrl.message)"><i class="fa fa-save"></i><span>Save as Draft</span></button>
          <button class="btn btn-primary" ng-click="$ctrl.send($ctrl.message)"><i class="fa fa-paper-plane-o"></i><span>Send</span></button>
        </div>
      </div>
    </div>
`
};