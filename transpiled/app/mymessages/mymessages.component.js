"use strict";
/**
 * The main mymessages component.
 *
 * Renders a list of folders, and has two viewports:
 * - messageList: filled with the list of messages for a folder
 * - messagecontent: filled with the contents of a single message.
 */
exports.mymessages = {
    bindings: { folders: '<' },
    template: "\n    <div class=\"my-messages\">\n    \n      <!-- Show message folders -->\n      <folder-list folders=\"$ctrl.folders\"></folder-list>\n    \n      <!-- A named view for the list of messages in this folder.  This will be  filled in by the 'mymessages.messagelist' child state -->\n      <div ui-view=\"messagelist\" class=\"messagelist\"> </div>\n    \n    </div>\n    \n    <!-- A named ui-view for a message's contents.  The 'mymessages.messagelist.message' grandchild state plugs into this ui-view -->\n    <div ui-view=\"messagecontent\"></div>\n" };
//# sourceMappingURL=mymessages.component.js.map