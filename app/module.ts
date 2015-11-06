import angular from "angular";
import uiRouter from "angular-ui-router";
import smartTable from "lorenzofox3/Smart-Table";

import d3 from "d3";
import * as extrasCore from "../lib/ct-ui-router-extras.core.js";
import stateSel from "../lib-ts/stateSelector";
import directives from "../lib-ts/vis/directives";

let imports = [ d3, uiRouter, extrasCore];
let app = angular.module("demo", ['ct.ui.router.extras.core', directives, stateSel, smartTable]);

export {app};
