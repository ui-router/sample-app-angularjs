"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
// Import all the state definitions for this submodule...
var mymessages_state_1 = require("./mymessages.state");
var folder_state_1 = require("./folder.state");
var message_state_1 = require("./message.state");
var compose_state_1 = require("./compose.state");
// ...and register them with the $stateProvider
ngmodule_1.ngmodule.config(function ($stateProvider) {
    var mymessagesStates = [folder_state_1.folderState, mymessages_state_1.mymessagesState, message_state_1.messageState, compose_state_1.composeState];
    mymessagesStates.forEach(function (state) { return $stateProvider.state(state); });
});
//# sourceMappingURL=mymessages.module.js.map