import {folderState} from "./messagelist";
import {messagesState} from "./folderlist"
import {messageState} from "./message"
import {composeState} from "./compose"

import "./directives/sortMessages"
import "./directives/messageTable"

export let mymessagesStates = [ folderState, messagesState, messageState, composeState ];