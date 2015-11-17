import angular from "angular";
import "angular-ui-router";
import "d3";
import "../lib/ct-ui-router-extras.core.js";
import "font-awesome/css/font-awesome.css!"
import "bootstrap/css/bootstrap.css!"

import stateSel from "../lib-ts/stateSelector";
import stateVis from "../lib-ts/vis/statevis";

export let app = angular.module("demo", ['ct.ui.router.extras.core', stateSel, stateVis]);
