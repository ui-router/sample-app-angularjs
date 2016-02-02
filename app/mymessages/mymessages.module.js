import {ngmodule} from "../ngmodule";

// Import all the state definitions for this submodule...
import {mymessagesState} from "./mymessages.state";
import {folderState} from "./folder.state";
import {messageState} from "./message.state";
import {composeState} from "./compose.state";
// ...and register them with the $stateProvider
ngmodule.config(($stateProvider) => {
  let mymessagesStates = [ folderState, mymessagesState, messageState, composeState ];
  mymessagesStates.forEach(state => $stateProvider.state(state));
});