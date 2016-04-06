"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
exports.composeComponent = "compose";
var composeTemplate = "\n<div class=\"compose\">\n  <div class=\"header\">\n    <div class=\"flex-h\"> <label>Recipient</label> <input type=\"text\" id=\"to\" name=\"to\" ng-model=\"$ctrl.message.to\"> </div>\n    <div class=\"flex-h\"> <label>Subject</label> <input type=\"text\" id=\"subject\" name=\"subject\" ng-model=\"$ctrl.message.subject\"> </div>\n  </div>\n\n  <div class=\"body\">\n    <textarea name=\"body\" id=\"body\" ng-model=\"$ctrl.message.body\" cols=\"30\" rows=\"20\"></textarea>\n    <div class=\"buttons\">\n      <!-- Clicking this button brings the user back to the state they came from (previous state) -->\n      <button class=\"btn btn-primary\" ng-click=\"$ctrl.gotoPreviousState()\"><i class=\"fa fa-times-circle-o\"></i><span>Cancel</span></button>\n      <button class=\"btn btn-primary\" ng-click=\"$ctrl.save($ctrl.message)\"><i class=\"fa fa-save\"></i><span>Save as Draft</span></button>\n      <button class=\"btn btn-primary\" ng-click=\"$ctrl.send($ctrl.message)\"><i class=\"fa fa-paper-plane-o\"></i><span>Send</span></button>\n    </div>\n  </div>\n</div>\n";
var ComposeController = (function () {
    function ComposeController($state, dialogService, AppConfig, Messages) {
        this.$state = $state;
        this.dialogService = dialogService;
        this.AppConfig = AppConfig;
        this.Messages = Messages;
    }
    ComposeController.prototype.$onInit = function () {
        // Create our message's model using the current user's email address as 'message.from'
        // Then extend it with all the properties from non-url state parameter 'message'.
        this.pristineMessage = angular.extend({ from: this.AppConfig.emailAddress }, this.$stateParams.message);
        this.message = angular.copy(this.pristineMessage);
    };
    ComposeController.prototype.uiCanExit = function () {
        if (this.canExit || angular.equals(this.pristineMessage, this.message)) {
            return true;
        }
        var message = 'You have not saved this message.';
        var question = 'Navigate away and lose changes?';
        return this.dialogService.confirm(message, question, "Yes", "No");
    };
    /**
     * Navigates back to the previous state.
     *
     * - Checks the $transition$ which activated this controller for a 'from state' that isn't the implicit root state.
     * - If there is no previous state (because the user deep-linked in, etc), then go to 'mymessages.messagelist'
     */
    ComposeController.prototype.gotoPreviousState = function () {
        var $transition$ = this.$transition$;
        var hasPrevious = !!$transition$.from().name;
        var state = hasPrevious ? $transition$.from() : "mymessages.messagelist";
        var params = hasPrevious ? $transition$.params("from") : {};
        this.$state.go(state, params);
    };
    ;
    /** "Send" the message (save to the 'sent' folder), and then go to the previous state */
    ComposeController.prototype.send = function (message) {
        var _this = this;
        this.Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'sent' }))
            .then(function () { return _this.canExit = true; })
            .then(function () { return _this.gotoPreviousState(); });
    };
    ;
    /** Save the message to the 'drafts' folder, and then go to the previous state */
    ComposeController.prototype.save = function (message) {
        var _this = this;
        this.Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'drafts' }))
            .then(function () { return _this.canExit = true; })
            .then(function () { return _this.gotoPreviousState(); });
    };
    return ComposeController;
}());
ngmodule_1.ngmodule.component(exports.composeComponent, {
    bindings: { $stateParams: '<', $transition$: '<' },
    controller: ComposeController,
    template: composeTemplate
});
//# sourceMappingURL=compose.component.js.map