"use strict";
var message_component_1 = require("./message.component");
/**
 * This state shows the contents of a single message.
 * It also has UI to reply, forward, delete, or edit an existing draft.
 */
exports.messageState = {
    name: 'mymessages.folder.message',
    url: '/:messageId',
    resolve: {
        // Fetch the message from the Messages service using the messageId parameter
        message: function (Messages, $stateParams) { return Messages.get($stateParams.messageId); },
        MessageListUi: function ($filter, AppConfig, messages) { return ({
            // This is a UI helper which finds the nearest messageId in the messages list to the messageId parameter
            proximalMessageId: function (messageId) {
                var sorted = $filter("orderBy")(messages, AppConfig.sort);
                var idx = sorted.findIndex(function (msg) { return msg._id === messageId; });
                var proximalIdx = sorted.length > idx + 1 ? idx + 1 : idx - 1;
                return proximalIdx >= 0 ? sorted[proximalIdx]._id : undefined;
            }
        }); }
    },
    views: {
        // Relatively target the parent-state's parent-state's 'messagecontent' ui-view
        // This could also have been written using ui-view@state addressing: 'messagecontent@mymessages'
        // Or, this could also have been written using absolute ui-view addressing: '!$default.$default.messagecontent'
        "^.^.messagecontent": {
            template: message_component_1.messageTemplate,
            controller: message_component_1.messageController,
            controllerAs: 'vm'
        }
    }
};
//# sourceMappingURL=message.state.js.map