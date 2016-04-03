import {ngmodule} from "../bootstrap/ngmodule"
import {setProp} from "../util/util";
import './filters/messageBody.filter';

export const messageComponent = "message";

const messageTemplate = `
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

/** Helper function to make a response message object */
const makeResponseMsg = (subjectPrefix, origMsg) => ({
  from: origMsg.to,
  to: origMsg.from,
  subject: prefixSubject(subjectPrefix, origMsg),
  body: quoteMessage(origMsg)
});


class MessageController {
  constructor($state, dialogService, Messages) {
    this.$state = $state;
    this.dialogService = dialogService;
    this.Messages = Messages;
  }

  $onInit() {
    this.message.read = true;
    this.Messages.put(this.message);

    this.actions = this.folder.actions.reduce((obj, action) => setProp(obj, action, true), {});
  }

  reply(message) {
    let replyMsg = makeResponseMsg("Re: ", message);
    this.$state.go('mymessages.compose', { message: replyMsg });
  };

  forward(message) {
    let fwdMsg = makeResponseMsg("Fwd: ", message);
    delete fwdMsg.to;
    this.$state.go('mymessages.compose', { message: fwdMsg });
  };

  editDraft(message) {
    this.$state.go('mymessages.compose', { message: message });
  };

  remove(message) {
    let nextMessageId = this.nextMessageGetter(message._id);
    let nextState = nextMessageId ? 'mymessages.messagelist.message' : 'mymessages.messagelist';
    let params = { messageId: nextMessageId };

    this.dialogService.confirm("Delete?", undefined)
        .then(() => this.Messages.remove(message))
        .then(() => this.$state.go(nextState, params, { reload: 'mymessages.messagelist' }));
  };
}

ngmodule.component(messageComponent, {
  bindings: { folder: '<', message: '<', nextMessageGetter: '<' },
  controller: MessageController,
  template: messageTemplate
});
