"use strict";
require("./directives/messageTable");
exports.folderTemplate = "\n<div class=\"messages\">\n  <message-table columns=\"vm.folder.columns\" messages=\"vm.messages\"></message-table>\n</div>\n";
exports.folderController = function FolderController(AppConfig, folder, messages) {
    this.folder = folder;
    this.messages = messages;
    this.AppConfig = AppConfig;
};
//# sourceMappingURL=folder.component.js.map