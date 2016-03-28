"use strict";
exports.composeTemplate = "\n<div class=\"compose\">\n  <div class=\"header\">\n    <div class=\"flex-h\"> <label>Recipient</label> <input type=\"text\" id=\"to\" name=\"to\" ng-model=\"vm.message.to\"> </div>\n    <div class=\"flex-h\"> <label>Subject</label> <input type=\"text\" id=\"subject\" name=\"subject\" ng-model=\"vm.message.subject\"> </div>\n  </div>\n\n  <div class=\"body\">\n    <textarea name=\"body\" id=\"body\" ng-model=\"vm.message.body\" cols=\"30\" rows=\"20\"></textarea>\n    <div class=\"buttons\">\n      <!-- Clicking this button brings the user back to the state they came from (previous state) -->\n      <button class=\"btn btn-primary\" ng-click=\"vm.gotoPreviousState()\"><i class=\"fa fa-times-circle-o\"></i><span>Cancel</span></button>\n      <button class=\"btn btn-primary\" ng-click=\"vm.save(vm.message)\"><i class=\"fa fa-save\"></i><span>Save as Draft</span></button>\n      <button class=\"btn btn-primary\" ng-click=\"vm.send(vm.message)\"><i class=\"fa fa-paper-plane-o\"></i><span>Send</span></button>\n    </div>\n  </div>\n</div>\n";
exports.composeController = function ComposeController(AppConfig, $stateParams, $state, $transition$, statusApi, Messages) {
    var _this = this;
    /**
     * Navigates back to the previous state.
     *
     * - Checks the $transition$ which activated this controller for a 'from state' that isn't the implicit root state.
     * - If there is no previous state (because the user deep-linked in, etc), then go to 'mymessages.folder'
     */
    this.gotoPreviousState = function () {
        var hasPrevious = !!$transition$.from().name;
        var state = hasPrevious ? $transition$.from() : "mymessages.folder";
        var params = hasPrevious ? $transition$.params("from") : {};
        $state.go(state, params);
    };
    // Create our message's model using the current user's email address as 'message.from'
    // Then extend it with all the properties from non-url state parameter 'message'.
    this.message = angular.extend({ from: AppConfig.emailAddress }, $stateParams.message);
    // Dirty checking code; checks if the message is still pristine, or has changed
    this.pristine = angular.copy(this.message);
    statusApi.isDirty = function () { return !angular.equals(_this.pristine, _this.message); };
    this.resetPristine = function () { return _this.pristine = _this.message; };
    /** "Send" the message (save to the 'sent' folder), and then go to the previous state */
    this.send = function (message) {
        Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'sent' }))
            .then(this.resetPristine)
            .then(this.gotoPreviousState);
    };
    /** Save the message to the 'drafts' folder, and then go to the previous state */
    this.save = function (message) {
        Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'drafts' }))
            .then(this.resetPristine)
            .then(this.gotoPreviousState);
    };
};
//# sourceMappingURL=compose.component.js.map