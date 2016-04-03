"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
require("./directives/messageTable.component");
exports.messageListComponent = "messageList";
ngmodule_1.ngmodule.component(exports.messageListComponent, {
    bindings: { folder: '<', messages: '<' },
    template: "\n<div class=\"messages\">\n  <message-table columns=\"$ctrl.folder.columns\" messages=\"$ctrl.messages\"></message-table>\n</div>\n" });
//# sourceMappingURL=messageList.component.js.map