import {ngmodule} from "../ngmodule";

// Import all the state definitions for this submodule...
import {mymessagesState} from "./mymessages";
import {folderState} from "./folder";
import {messageState} from "./message";
import {composeState} from "./compose";
// ...and register them with the $stateProvider
ngmodule.config(($stateProvider) => {
  let mymessagesStates = [ folderState, mymessagesState, messageState, composeState ];
  mymessagesStates.forEach(state => $stateProvider.state(state));
});