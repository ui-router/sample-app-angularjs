import {compose} from "./compose.component";
import {folderList} from "./directives/folderList.component";
import {message} from "./message.component";
import {messageList} from "./messageList.component";
import {mymessages} from "./mymessages.component";
import {messageTable} from "./directives/messageTable.component";
import {sortMessages} from "./directives/sortMessages.directive";
import {messageBody} from "./filters/messageBody.filter";
import {MessageListUI} from "./services/messagesListUI.service";

import {composeState, messageState, messageListState, mymessagesState} from "./mymessages.states";

export const MYMESSAGES_MODULE = angular.module('mymessages', []);

MYMESSAGES_MODULE.directive('sortMessages', sortMessages);

MYMESSAGES_MODULE.component('compose', compose);
MYMESSAGES_MODULE.component('folderList', folderList);
MYMESSAGES_MODULE.component('message', message);
MYMESSAGES_MODULE.component('messageList', messageList);
MYMESSAGES_MODULE.component('mymessages', mymessages);
MYMESSAGES_MODULE.component('messageTable', messageTable);

MYMESSAGES_MODULE.filter('messageBody', messageBody);

MYMESSAGES_MODULE.service('MessageListUI', MessageListUI);

MYMESSAGES_MODULE.config(['$stateRegistryProvider', function($stateRegistry) {
  $stateRegistry.register(composeState);
  $stateRegistry.register(messageState);
  $stateRegistry.register(messageListState);
  $stateRegistry.register(mymessagesState);
}]);
