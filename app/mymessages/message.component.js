import {setProp} from "../util/util";
import './filters/messageBodyFilter';

export let messageTemplate = `
<div class="message">

  <div class="header">
    <div>
      <h4>{{$ctrl.message.subject}}</h4>
      <h5>{{$ctrl.message.from}} <i class="fa fa-long-arrow-right"></i> {{$ctrl.message.to}}</h5>
    </div>

    <div class="line2">
      <div>{{$ctrl.message.date | date: 'longDate'}} {{$ctrl.message.date | date: 'mediumTime'}}</div>
      <div>
        <button class="btn btn-primary" ng-show="$ctrl.actions.edit" ng-click="$ctrl.editDraft($ctrl.message)"><i class="fa fa-pencil"></i> <span>Edit Draft</span></button>
        <button class="btn btn-primary" ng-show="$ctrl.actions.reply" ng-click="$ctrl.reply($ctrl.message)"><i class="fa fa-reply"></i> <span>Reply</span></button>
        <button class="btn btn-primary" ng-show="$ctrl.actions.forward" ng-click="$ctrl.forward($ctrl.message)"><i class="fa fa-forward" ></i> <span>Forward</span></button>
        <button class="btn btn-primary" ng-show="$ctrl.actions.delete" ng-click="$ctrl.remove($ctrl.message)"><i class="fa fa-close"></i> <span>Delete</span></button>
      </div>
    </div>
  </div>

  <!-- Pass the raw (plain text) message body through the messageBody filter to format slightly nicer. -->
  <div class="body" ng-bind-html="::$ctrl.message.body | messageBody"></div>
</div>
`;

/** Helper function to prefix a message with "fwd: " or "re: " */
const prefixSubject = (prefix, message) => prefix + message.subject;
/** Helper function which quotes an email message */
const quoteMessage = (message) => `



---------------------------------------
Original message:
From: ${message.from}
Date: ${message.date}
Subject: ${message.subject}

${message.body}`;


export let messageController = function MessageController($state, dialogService, Messages, MessageListUi, folder, message) {
  this.message = message;
  message.read = true;
  Messages.put(message);

  this.actions = folder.actions.reduce((obj, action) => setProp(obj, action, true), {});

  let makeResponseMsg = (subjectPrefix, origMsg) => ({
    from: origMsg.to,
    to: origMsg.from,
    subject: prefixSubject(subjectPrefix, origMsg),
    body: quoteMessage(origMsg)
  });

  this.reply = function(message) {
    let replyMsg = makeResponseMsg("Re: ", message);
    $state.go('mymessages.compose', { message: replyMsg });
  };

  this.forward = function(message) {
    let fwdMsg = makeResponseMsg("Fwd: ", message);
    delete fwdMsg.to;
    $state.go('mymessages.compose', { message: fwdMsg });
  };

  this.editDraft = function(message) {
    $state.go('mymessages.compose', { message: message });
  };

  this.remove = function(message) {
    let nextMessageId = MessageListUi.proximalMessageId(message._id);
    let nextState = nextMessageId ? 'mymessages.folder.message' : 'mymessages.folder';
    let params = { messageId: nextMessageId };

    dialogService.confirm("Delete?", undefined)
        .then(() => Messages.remove(message))
        .then(() => $state.go(nextState, params, { reload: 'mymessages.folder' }));
  };
}
