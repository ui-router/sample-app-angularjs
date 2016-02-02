/**
 * This state allows the user to compose a new message, edit a drafted message, send a message,
 * or save an unsent message as a draft.
 *
 * This state uses view-targeting to take over the ui-view that would normally be filled by the 'mymessages' state.
 */
let template = `
<div class="compose">
  <div class="header">
    <div class="flex-h"> <label>Recipient</label> <input type="text" id="to" name="to" ng-model="vm.message.to"> </div>
    <div class="flex-h"> <label>Subject</label> <input type="text" id="subject" name="subject" ng-model="vm.message.subject"> </div>
  </div>

  <div class="body">
    <textarea name="body" id="body" ng-model="vm.message.body" cols="30" rows="20"></textarea>
    <div class="buttons">
      <!-- Clicking this button brings the user back to the state they came from (previous state) -->
      <button class="btn btn-primary" ng-click="vm.gotoPreviousState()"><i class="fa fa-times-circle-o"></i><span>Cancel</span></button>
      <button class="btn btn-primary" ng-click="vm.save(vm.message)"><i class="fa fa-save"></i><span>Save as Draft</span></button>
      <button class="btn btn-primary" ng-click="vm.send(vm.message)"><i class="fa fa-paper-plane-o"></i><span>Send</span></button>
    </div>
  </div>
</div>
`;

function ComposeController(AppConfig, $stateParams, $state, $transition$, statusApi, Messages) {
  /**
   * Navigates back to the previous state.
   *
   * - Checks the $transition$ which activated this controller for a 'from state' that isn't the implicit root state.
   * - If there is no previous state (because the user deep-linked in, etc), then go to 'mymessages.folder'
   */
  this.gotoPreviousState = function() {
    let hasPrevious = !!$transition$.from().name;
    let state = hasPrevious ? $transition$.from() : "mymessages.folder";
    let params = hasPrevious ? $transition$.params("from") : {};
    $state.go(state, params);
  };

  // Create our message's model using the current user's email address as 'message.from'
  // Then extend it with all the properties from non-url state parameter 'message'.
  this.message = angular.extend({ from: AppConfig.emailAddress }, $stateParams.message);

  // Dirty checking code; checks if the message is still pristine, or has changed
  this.pristine = angular.copy(this.message);
  statusApi.isDirty = () => !angular.equals(this.pristine, this.message);
  resetPristine = () => this.pristine = this.message;

  /** "Send" the message (save to the 'sent' folder), and then go to the previous state */
  this.send = function (message) {
    Messages.save(angular.extend(message, {date: new Date(), read: true, folder: 'sent'}))
        .then(resetPristine)
        .then(this.gotoPreviousState);
  };

  /** Save the message to the 'drafts' folder, and then go to the previous state */
  this.save = function(message) {
    Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'drafts' }))
        .then(resetPristine)
        .then(this.gotoPreviousState);
  };
}

let composeState = {
  name: 'mymessages.compose',
  url: '/compose',
  // Declares that this state has a 'message' parameter, that defaults to an empty object.
  // Note the parameter does not appear in the URL.
  params: {
    message: {}
  },
  resolve: {
    // Dirty checking API (TODO: simplify this)
    statusApi: () => ({
      isDirty: () => false
    })
  },
  onExit: (dialogService, statusApi) => {
    // This hook asks the user to confirm deactivating this state, if the message has been edited (is dirty)
    if (statusApi.isDirty())
      return dialogService.confirm('You have not saved this message.', 'Navigate away and lose changes?', "Yes", "No");
  },
  controller: ComposeController,
  controllerAs: 'vm',
  views: {
    // Absolutely targets the $default (unnamed) ui-view, two nesting levels down.
    "!$default.$default": {
      template: template
    }
  }
};

export {composeState};