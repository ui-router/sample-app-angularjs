/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */
// External dependencies
import * as angular from "angular";
import uiRouter from "@uirouter/angularjs";
import { StickyStatesPlugin } from '@uirouter/sticky-states';
import { DSRPlugin } from '@uirouter/dsr';
import { visualizer } from "@uirouter/visualizer";
import ocLazyLoad from "oclazyload";

import { MAIN_MODULE } from '../main/main.module';
import { GLOBAL_MODULE } from '../global/global.module';
import { MYMESSAGES_MODULE } from '../mymessages/mymessages.module';
import { PREFS_MODULE } from '../prefs/prefs.module';

// Create the angular module "demo".
//
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// In bootstrap.js, the module is imported, and the components, services, and states are registered.
export const ngmodule = angular.module("demo", [
  uiRouter,
  ocLazyLoad,
  // CONTACTS_MODULE.name // lazy loaded below
  MAIN_MODULE.name,
  GLOBAL_MODULE.name,
  MYMESSAGES_MODULE.name,
  PREFS_MODULE.name,
]);

ngmodule.config(['$uiRouterProvider', $uiRouter => {
  $uiRouter.plugin(StickyStatesPlugin);
  $uiRouter.plugin(DSRPlugin);
  // Show the UI-Router Visualizer
  visualizer($uiRouter);
}]);
