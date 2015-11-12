import {angular} from "angular";

let messageTemplate = `
<div class="message">

  <div class="header">
    <div>
      <h4>{{vm.message.subject}}</h4>
      <h5>{{vm.message.senderEmail}}</h5>
    </div>

    <div class="line2">
      <div>{{vm.message.date | date: 'longDate'}} {{vm.message.date | date: 'mediumTime'}}</div>
      <div>
        <button ng-click="vm.reply(vm.message)"><i class="fa fa-reply"></i> Reply</button>
        <button ng-click="vm.forward(vm.message)"><i class="fa fa-forward" ></i> Forward</button>
        <button ng-click="vm.delete(vm.message)"><i class="fa fa-close"></i> Delete</button>
      </div>
    </div>
  </div>

  <div class="body" ng-bind-html="::vm.message.body | messageBody"></div>
</div>
`;

const prefixSubject = (prefix, message) => prefix + message.subject;
const quoteMessage = (message) => `



---------------------------------------
Original message:
From: ${message.senderEmail}
Date: ${message.date}
Subject: ${message.subject}

${message.body}`;


function MessageController($state, Messages, MessageListUi, message) {
  this.message = message;
  message.read = true;
  Messages._put(message);

  this.reply = function(message) {
    let stateParams = {
      to: message.senderEmail,
      subject: prefixSubject('Re: ', message),
      body: quoteMessage(message)
    };
    $state.go('mymessages.compose', stateParams);
  };

  this.forward = function(message) {
    let stateParams = {
      subject: prefixSubject('Fwd: ', message),
      body: quoteMessage(message)
    };
    $state.go('mymessages.compose', stateParams);
  };

  this.delete = function(message) {
    let nextMessageId = MessageListUi.proximalMessageId(message._id);
    let nextState = nextMessageId ? 'mymessages.folder.message' : 'mymessages.folder';
    let params = { messageId: nextMessageId };
    Messages._delete(message).then(() => $state.go(nextState, params, { reload: 'mymessages.folder' }));
  };
}

let messageState = {
  name: 'mymessages.folder.message',
  url: '/:messageId',
  resolve: {
    message: (Messages, $stateParams) => Messages._get($stateParams.messageId)
  },
  views: {
    "^.^.messagecontent": {
      template: messageTemplate,
      controller: MessageController,
      controllerAs: 'vm'
    }
  }
};

export {messageState};