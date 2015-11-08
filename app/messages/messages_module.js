import {app} from '../app_module'

import {folderState} from "./messagelist";
import {messagesState} from "./folderlist"
import {messageState} from "./message"

app.config(function ($stateProvider) {
  let states = [folderState, messagesState, messageState];
  states.forEach(state => $stateProvider.state(state));
});