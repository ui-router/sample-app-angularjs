let messageTemplate = `
<div class="message">
  <pre>{{message.message | json }}</pre>
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