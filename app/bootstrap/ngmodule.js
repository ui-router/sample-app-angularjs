/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */

// External dependencies
import angular from "angular";
import uiRouter from "angular-ui-router";
import "d3";

// Internal dependencies; If this app were bundled, these files would be bundled with it
import "../../lib/ct-ui-router-extras.core.js";
import stateSel from "../../lib-ts/stateSelector";
import stateVis from "../../lib-ts/vis/statevis";

// Create the angular module "demo".  It's empty now, but other parts of the app will register things on it.
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// For example, in mymessages.module.js:
//
// import {ngmodule} from "../bootstrap/ngmodule";
// ngmodule.config(($stateProvider) => { /* ... register states with $stateProvider */ }
export let ngmodule = angular.module("demo", [uiRouter, 'ct.ui.router.extras.core', stateSel, stateVis]);
