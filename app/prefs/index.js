import {loadNg1Module, ngmodule} from "../bootstrap/ngmodule";

import {prefs} from "./prefs.component";
import {prefsState} from "./prefs.states";

const prefsAppModule = {
  components: {prefs},
  states: [prefsState]
};

loadNg1Module(ngmodule, prefsAppModule);