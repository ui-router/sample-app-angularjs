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
        <button ui-sref="mymessages.compose({ to: vm.message.senderEmail, subject: vm.prefixSubject('Re: ', vm.message), body: vm.quoteMessage(vm.message) })"><i class="fa fa-reply"></i></button>
        <button ui-sref="mymessages.compose({ subject: vm.prefixSubject('Fwd: ', vm.message), body: vm.quoteMessage(vm.message) })"><i class="fa fa-forward" ></i></button>
      </div>
    </div>
  </div>

  <div class="body" ng-bind-html="::vm.message.body | messageBody"></div>
</div>
`;

function MessageController(message) {
  this.message = message;
  this.prefixSubject = (prefix, message) => prefix + message.subject;
  this.quoteMessage = (message) => `



---------------------------------------
Original message:
From: ${message.senderEmail}
Date: ${message.date}
Subject: ${message.subject}

${message.body}`;
}

let messageState = {
  name: 'mymessages.folder.message',
  url: '/:messageId',
  resolve: {
    message: (Messages, $stateParams) => Messages.byId($stateParams.messageId)
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