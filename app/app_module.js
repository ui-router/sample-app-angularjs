import angular from "angular";
import "angular-ui-router";
import smartTable from "lorenzofox3/Smart-Table";
import "d3";
import "../lib/ct-ui-router-extras.core.js";
import "font-awesome/css/font-awesome.css!"
import "bootstrap/css/bootstrap.css!"

import stateSel from "../lib-ts/stateSelector";
import directives from "../lib-ts/vis/directives";

let app = angular.module("demo", ['ct.ui.router.extras.core', directives, stateSel, smartTable]);

app.run(($rootScope, $interval, $state, $trace, $transitions) => {
  $trace.enable(1);

  let matchCriteria = { to: (state) => !!state.redirectTo };
  let redirectFn = ($transition$) => $transition$.redirect($state.targetState($transition$.to().redirectTo));
  $transitions.onBefore(matchCriteria, redirectFn);
});

export {app};
