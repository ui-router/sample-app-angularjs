import {app} from "../index";

import "./directives/sortMessages";
import "./directives/messageTable";

import {folderState} from "./messagelist";
import {messagesState} from "./folderlist";
import {messageState} from "./message";
import {composeState} from "./compose";

app.config(($stateProvider) => {
  let mymessagesStates = [ folderState, messagesState, messageState, composeState ];
  mymessagesStates.forEach(state => $stateProvider.state(state));
});