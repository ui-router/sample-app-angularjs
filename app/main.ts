import angular from "angular";
import uiRouter from "angular-ui-router";

import d3 from "d3";
import * as extrasCore from "../lib/ct-ui-router-extras.core.js";
import stateSel from "../lib-ts/stateSelector";

import vis from "../lib-ts/vis/directives";

let imports = [ d3, vis, extrasCore];
let app = angular.module("demo", [uiRouter, vis, stateSel, 'ct.ui.router.extras.core']);

let $sp;
app.config($stateProvider => {
  $sp = $stateProvider;
  $stateProvider.state({
    name: 'app',
    url: '/app',
    template: '<h3>app</h3> <div ui-view/>'
  });

  $stateProvider.state({
    name: 'app.msgs',
    url: '/msgs',
    template: '<h3>msgs</h3> <div ui-view/>'
  });

  $stateProvider.state({
    name: 'app.msgs.folder',
    url: '/:folderId',
    params: { folderId: "123" },
    template: '<h3>folder</h3> <div ui-view/>'
  });

  $stateProvider.state({
    name: 'app.contacts',
    url: '/contacts',
    template: '<h3>contacts</h3> <div ui-view/>'
  });

  $stateProvider.state({
    name: 'app.contacts.contact',
    url: '/:contactId',
    params: { contactId: "123" },
    template: '<h3>contact</h3> <div ui-view/>'
  });
});

app.run(($rootScope, $interval, $state) => {

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
      template: "<h3>" + newInt + "</h3> <div ui-view></div>"
    });
  }

});