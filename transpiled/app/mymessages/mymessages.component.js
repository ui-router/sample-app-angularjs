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
    template: "\n    <div class=\"my-messages\">\n    \n      <!-- Renders a list of folders -->\n      <div class=\"folderlist\">\n        <ul class=\"selectlist list-unstyled\">\n    \n          <!-- Highlight the selected folder:\n              When the current state matches the ui-sref's state (and its parameters)\n              ui-sref-active applies the 'selected' class to the li element -->\n          <li class=\"folder\" ui-sref-active=\"selected\" ng-repeat=\"folder in $ctrl.folders\" >\n            <!-- This ui-sref is a relative link to the 'mymessages.messagelist' substate. It provides the\n                'folderId' parameter value from the current folder's .id property -->\n            <a ui-sref=\".messagelist({folderId: folder._id})\"><i class=\"fa\"></i>{{folder._id}}</a>\n          </li>\n        </ul>\n      </div>\n    \n      <!-- A named view for the list of messages in this folder.  This will be  filled in by the 'mymessages.messagelist' child state -->\n      <div ui-view=\"messagelist\" class=\"messagelist\"> </div>\n    \n    </div>\n    \n    <!-- A named ui-view for a message's contents.  The 'mymessages.messagelist.message' grandchild state plugs into this ui-view -->\n    <div ui-view=\"messagecontent\"></div>\n" };
//# sourceMappingURL=mymessages.component.js.map