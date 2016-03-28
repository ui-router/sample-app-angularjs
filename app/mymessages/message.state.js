import {messageTemplate, messageController} from "./message.component";
/**
 * This state shows the contents of a single message.
 * It also has UI to reply, forward, delete, or edit an existing draft.
 */
export let messageState = {
  name: 'mymessages.folder.message',
  url: '/:messageId',
  resolve: {
    // Fetch the message from the Messages service using the messageId parameter
    message: (Messages, $stateParams) => Messages.get($stateParams.messageId),
    MessageListUi: ($filter, AppConfig, messages) => ({
      // This is a UI helper which finds the nearest messageId in the messages list to the messageId parameter
      proximalMessageId: (messageId) => {
        let sorted = $filter("orderBy")(messages, AppConfig.sort);
        let idx = sorted.findIndex(msg => msg._id === messageId);
        var proximalIdx = sorted.length > idx + 1 ? idx + 1 : idx - 1;
        return proximalIdx >= 0 ? sorted[proximalIdx]._id : undefined;
      }
    })
  },
  views: {
    // Relatively target the parent-state's parent-state's 'messagecontent' ui-view
    // This could also have been written using ui-view@state addressing: 'messagecontent@mymessages'
    // Or, this could also have been written using absolute ui-view addressing: '!$default.$default.messagecontent'
    "^.^.messagecontent": {
      template: messageTemplate,
      controller: messageController,
      controllerAs: 'vm'
    }
  }
};
