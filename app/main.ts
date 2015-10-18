import angular from "angular";
import uiRouter from "angular-ui-router";

import d3 from "d3";
import * as extrasCore from "../lib/ct-ui-router-extras.core.js";
import * as extrasSticky from "../lib/ct-ui-router-extras.sticky.js";
import * as extrasStatevis from "../lib/ct-ui-router-extras.statevis.js";
let imports = [ d3, extrasCore, extrasSticky, extrasStatevis ];

let app = angular.module("demo", [uiRouter, 'ct.ui.router.extras.statevis']);