"use strict";
require("./directives/messageTable");
exports.template = "\n<div class=\"messages\">\n  <message-table columns=\"vm.folder.columns\" messages=\"vm.messages\"></message-table>\n</div>\n";
exports.controller = function FolderController(AppConfig, folder, messages) {
    this.folder = folder;
    this.messages = messages;
    this.AppConfig = AppConfig;
};
//# sourceMappingURL=folder.component.js.map