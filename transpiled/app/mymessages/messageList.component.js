"use strict";
/**
 * This component renders a list of messages using the `messageTable` component
 */
exports.messageList = {
    bindings: { folder: '<', messages: '<' },
    template: "\n    <div class=\"messages\">\n      <message-table columns=\"$ctrl.folder.columns\" messages=\"$ctrl.messages\"></message-table>\n    </div>\n" };
//# sourceMappingURL=messageList.component.js.map