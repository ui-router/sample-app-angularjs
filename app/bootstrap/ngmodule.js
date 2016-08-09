/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */

// External dependencies
import * as angular from "angular";
import uiRouter from "angular-ui-router";
import {visualizer} from "ui-router-visualizer";

// Create the angular module "demo".
//
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// In bootstrap.js, the module is imported, and the components, services, and states are registered.
export const ngmodule = angular.module("demo", [uiRouter]);

// Show ui-router-visualizer
ngmodule.run(ng1UIRouter => visualizer(ng1UIRouter));