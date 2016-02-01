import {app} from "../app.module";

import './filters/messageBodyFilter';
import "./directives/sortMessages";
import "./directives/messageTable";

import {mymessagesState} from "./mymessages";
import {folderState} from "./folder";
import {messageState} from "./message";
import {composeState} from "./compose";

app.config(($stateProvider) => {
  let mymessagesStates = [ folderState, mymessagesState, messageState, composeState ];
  mymessagesStates.forEach(state => $stateProvider.state(state));
});