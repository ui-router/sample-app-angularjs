let messageTemplate = `
<div class="message">

  <div class="header">
    <div>
      <h4>{{message.message.subject}}</h4>
      <h5>{{message.message.senderEmail}}</h5>
    </div>
    <div>
      <span>{{message.message.date | date: 'longDate'}} {{message.message.date | date: 'mediumTime'}}</span>
    </div>
  </div>

  <div class="body" ng-bind-html="::message.message.message | messageBody"></div>
</div>
`;

function MessageController(message) {
  this.message = message;
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
      controllerAs: 'message'
    }
  }
};

export {messageState};