import {ngmodule} from "../bootstrap/ngmodule";

// Import the prefs state definition...
import { prefsState } from "./prefs.state";
// ... and register with the $stateProvider
ngmodule.config(($stateProvider) => {
  let prefsStates = [prefsState];
  prefsStates.forEach(state => $stateProvider.state(state));
});