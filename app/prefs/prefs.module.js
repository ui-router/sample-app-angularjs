import {ngmodule} from "../ngmodule";

// Import the prefs state definition...
import { prefsState } from "./prefs";
// ... and register with the $stateProvider
ngmodule.config(($stateProvider) => {
  let prefsStates = [prefsState];
  prefsStates.forEach(state => $stateProvider.state(state));
});