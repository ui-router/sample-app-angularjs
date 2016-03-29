/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */

// External dependencies
import * as angular from "angular";
import uiRouter from "angular-ui-router";
import "d3";
import stateVis from "ui-router-visualizer";

// Create the angular module "demo".  It's empty now, but other parts of the app will register things on it.
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// For example, in mymessages.module.js:
//
// import {ngmodule} from "../bootstrap/ngmodule";
// ngmodule.config(($stateProvider) => { /* ... register states with $stateProvider */ }
export let ngmodule = angular.module("demo", [uiRouter, stateVis]);
