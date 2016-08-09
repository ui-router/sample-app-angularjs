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

export const MYMESSAGES_MODULE = {
  directives: {sortMessages},
  components: {compose, folderList, message, messageList, mymessages, messageTable},
  states: [composeState, messageState, messageListState, mymessagesState],
  filters: {messageBody},
  services: {MessageListUI}
};