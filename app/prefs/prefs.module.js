import {prefs} from "./prefs.component";
import {prefsState} from "./prefs.states";

export const PREFS_MODULE = angular.module('prefs', []);

PREFS_MODULE.component('prefs', prefs);

PREFS_MODULE.config(['$stateRegistryProvider', function ($stateRegistry) {
  $stateRegistry.register(prefsState);
}]);
