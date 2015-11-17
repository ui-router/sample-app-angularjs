import {app} from "../index";

import { prefsState } from "./prefs";

app.config(($stateProvider) => {
  let prefsStates = [prefsState];
  prefsStates.forEach(state => $stateProvider.state(state));
});