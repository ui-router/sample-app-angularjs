"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
require("./directives/messageTable.component");
exports.messageListComponent = "messageList";
var messageListTemplate = "\n<div class=\"messages\">\n  <message-table columns=\"$ctrl.folder.columns\" messages=\"$ctrl.messages\"></message-table>\n</div>\n";
ngmodule_1.ngmodule.component(exports.messageListComponent, {
    bindings: { folder: '<', messages: '<' },
    template: messageListTemplate
});
//# sourceMappingURL=messageList.component.js.map