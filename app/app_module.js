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

app.run(($rootScope, $interval, $state, $trace) => {
  $trace.enable(1);
  $rootScope.newState = newState;

  function newState() {
    let states = $state.get();
    let rnd = (max) => Math.floor(Math.random() * max);
    let idx = rnd(states.length);
    let parent = states[idx];
    let newInt = rnd(999);
    $sp.state({
      name: parent.name ? parent.name + ".S" + newInt : "S" + newInt,
      url: "/" + newInt,
      template: "<span>" + newInt + "</span> <span ui-view></span>"
    });
  }

});

export {app};
