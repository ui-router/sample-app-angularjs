"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
var util_1 = require("../util/util");
require('./filters/messageBody.filter');
exports.messageComponent = "message";
var messageTemplate = "\n<div class=\"message\">\n\n  <div class=\"header\">\n    <div>\n      <h4>{{$ctrl.message.subject}}</h4>\n      <h5>{{$ctrl.message.from}} <i class=\"fa fa-long-arrow-right\"></i> {{$ctrl.message.to}}</h5>\n    </div>\n\n    <div class=\"line2\">\n      <div>{{$ctrl.message.date | date: 'longDate'}} {{$ctrl.message.date | date: 'mediumTime'}}</div>\n      <div>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.edit\" ng-click=\"$ctrl.editDraft($ctrl.message)\"><i class=\"fa fa-pencil\"></i> <span>Edit Draft</span></button>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.reply\" ng-click=\"$ctrl.reply($ctrl.message)\"><i class=\"fa fa-reply\"></i> <span>Reply</span></button>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.forward\" ng-click=\"$ctrl.forward($ctrl.message)\"><i class=\"fa fa-forward\" ></i> <span>Forward</span></button>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.delete\" ng-click=\"$ctrl.remove($ctrl.message)\"><i class=\"fa fa-close\"></i> <span>Delete</span></button>\n      </div>\n    </div>\n  </div>\n\n  <!-- Pass the raw (plain text) message body through the messageBody filter to format slightly nicer. -->\n  <div class=\"body\" ng-bind-html=\"::$ctrl.message.body | messageBody\"></div>\n</div>\n";
/** Helper function to prefix a message with "fwd: " or "re: " */
var prefixSubject = function (prefix, message) { return prefix + message.subject; };
/** Helper function which quotes an email message */
var quoteMessage = function (message) { return ("\n\n\n\n---------------------------------------\nOriginal message:\nFrom: " + message.from + "\nDate: " + message.date + "\nSubject: " + message.subject + "\n\n" + message.body); };
/** Helper function to make a response message object */
var makeResponseMsg = function (subjectPrefix, origMsg) { return ({
    from: origMsg.to,
    to: origMsg.from,
    subject: prefixSubject(subjectPrefix, origMsg),
    body: quoteMessage(origMsg)
}); };
var MessageController = (function () {
    function MessageController($state, dialogService, Messages) {
        this.$state = $state;
        this.dialogService = dialogService;
        this.Messages = Messages;
    }
    MessageController.prototype.$onInit = function () {
        this.message.read = true;
        this.Messages.put(this.message);
        this.actions = this.folder.actions.reduce(function (obj, action) { return util_1.setProp(obj, action, true); }, {});
    };
    MessageController.prototype.reply = function (message) {
        var replyMsg = makeResponseMsg("Re: ", message);
        this.$state.go('mymessages.compose', { message: replyMsg });
    };
    ;
    MessageController.prototype.forward = function (message) {
        var fwdMsg = makeResponseMsg("Fwd: ", message);
        delete fwdMsg.to;
        this.$state.go('mymessages.compose', { message: fwdMsg });
    };
    ;
    MessageController.prototype.editDraft = function (message) {
        this.$state.go('mymessages.compose', { message: message });
    };
    ;
    MessageController.prototype.remove = function (message) {
        var _this = this;
        var nextMessageId = this.nextMessageGetter(message._id);
        var nextState = nextMessageId ? 'mymessages.messagelist.message' : 'mymessages.messagelist';
        var params = { messageId: nextMessageId };
        this.dialogService.confirm("Delete?", undefined)
            .then(function () { return _this.Messages.remove(message); })
            .then(function () { return _this.$state.go(nextState, params, { reload: 'mymessages.messagelist' }); });
    };
    ;
    return MessageController;
}());
ngmodule_1.ngmodule.component(exports.messageComponent, {
    bindings: { folder: '<', message: '<', nextMessageGetter: '<' },
    controller: MessageController,
    template: messageTemplate
});
//# sourceMappingURL=message.component.js.map