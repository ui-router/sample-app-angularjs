/**
 * This file imports the application's dependencies.
 */

// External dependencies
import angular from "angular";
import "angular-ui-router";
import "d3";

// Internal dependencies; If this app were bundled, these files would be bundled as well
import "../lib/ct-ui-router-extras.core.js";
import stateSel from "../lib-ts/stateSelector";
import stateVis from "../lib-ts/vis/statevis";

// Import CSS (SystemJS will inject it into the document for us)
import "font-awesome/css/font-awesome.css!"
import "bootstrap/css/bootstrap.css!"

// Create the angular module "demo".  It's empty now, but other parts of the app will register things on it.
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// For example, in mymessages.module.js:
//
// import {app} from "../app.module";
// app.config(($stateProvider) => { /* ... register states with $stateProvider */ }
export let app = angular.module("demo", ['ui.router', 'ct.ui.router.extras.core', stateSel, stateVis]);

