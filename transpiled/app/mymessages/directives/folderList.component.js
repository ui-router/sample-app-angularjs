"use strict";
/**
 * Renders a list of folders
 */
exports.folderList = {
    bindings: { folders: '<' },
    template: "\n    <!-- Renders a list of folders -->\n    <div class=\"folderlist\">\n      <ul class=\"selectlist list-unstyled\">\n  \n        <!-- Highlight the selected folder:\n            When the current state matches the ui-sref's state (and its parameters)\n            ui-sref-active applies the 'selected' class to the li element -->\n        <li class=\"folder\" ui-sref-active=\"selected\" ng-repeat=\"folder in $ctrl.folders\" >\n          <!-- This ui-sref is a relative link to the 'mymessages.messagelist' substate. It provides the\n              'folderId' parameter value from the current folder's .id property -->\n          <a ui-sref=\".messagelist({folderId: folder._id})\"><i class=\"fa\"></i>{{folder._id}}</a>\n        </li>\n      </ul>\n    </div>\n" };
//# sourceMappingURL=folderList.component.js.map