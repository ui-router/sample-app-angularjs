"use strict";
var util_1 = require("../util/util");
require('./filters/messageBodyFilter');
exports.messageTemplate = "\n<div class=\"message\">\n\n  <div class=\"header\">\n    <div>\n      <h4>{{$ctrl.message.subject}}</h4>\n      <h5>{{$ctrl.message.from}} <i class=\"fa fa-long-arrow-right\"></i> {{$ctrl.message.to}}</h5>\n    </div>\n\n    <div class=\"line2\">\n      <div>{{$ctrl.message.date | date: 'longDate'}} {{$ctrl.message.date | date: 'mediumTime'}}</div>\n      <div>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.edit\" ng-click=\"$ctrl.editDraft($ctrl.message)\"><i class=\"fa fa-pencil\"></i> <span>Edit Draft</span></button>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.reply\" ng-click=\"$ctrl.reply($ctrl.message)\"><i class=\"fa fa-reply\"></i> <span>Reply</span></button>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.forward\" ng-click=\"$ctrl.forward($ctrl.message)\"><i class=\"fa fa-forward\" ></i> <span>Forward</span></button>\n        <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.delete\" ng-click=\"$ctrl.remove($ctrl.message)\"><i class=\"fa fa-close\"></i> <span>Delete</span></button>\n      </div>\n    </div>\n  </div>\n\n  <!-- Pass the raw (plain text) message body through the messageBody filter to format slightly nicer. -->\n  <div class=\"body\" ng-bind-html=\"::$ctrl.message.body | messageBody\"></div>\n</div>\n";
/** Helper function to prefix a message with "fwd: " or "re: " */
var prefixSubject = function (prefix, message) { return prefix + message.subject; };
/** Helper function which quotes an email message */
var quoteMessage = function (message) { return ("\n\n\n\n---------------------------------------\nOriginal message:\nFrom: " + message.from + "\nDate: " + message.date + "\nSubject: " + message.subject + "\n\n" + message.body); };
exports.messageController = function MessageController($state, dialogService, Messages, MessageListUi, folder, message) {
    this.message = message;
    message.read = true;
    Messages.put(message);
    this.actions = folder.actions.reduce(function (obj, action) { return util_1.setProp(obj, action, true); }, {});
    var makeResponseMsg = function (subjectPrefix, origMsg) { return ({
        from: origMsg.to,
        to: origMsg.from,
        subject: prefixSubject(subjectPrefix, origMsg),
        body: quoteMessage(origMsg)
    }); };
    this.reply = function (message) {
        var replyMsg = makeResponseMsg("Re: ", message);
        $state.go('mymessages.compose', { message: replyMsg });
    };
    this.forward = function (message) {
        var fwdMsg = makeResponseMsg("Fwd: ", message);
        delete fwdMsg.to;
        $state.go('mymessages.compose', { message: fwdMsg });
    };
    this.editDraft = function (message) {
        $state.go('mymessages.compose', { message: message });
    };
    this.remove = function (message) {
        var nextMessageId = MessageListUi.proximalMessageId(message._id);
        var nextState = nextMessageId ? 'mymessages.folder.message' : 'mymessages.folder';
        var params = { messageId: nextMessageId };
        dialogService.confirm("Delete?", undefined)
            .then(function () { return Messages.remove(message); })
            .then(function () { return $state.go(nextState, params, { reload: 'mymessages.folder' }); });
    };
};
//# sourceMappingURL=message.component.js.map