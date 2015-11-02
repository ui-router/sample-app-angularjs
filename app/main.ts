import angular from "angular";
import uiRouter from "angular-ui-router";

import d3 from "d3";
import * as extrasCore from "../lib/ct-ui-router-extras.core.js";
import * as extrasSticky from "../lib/ct-ui-router-extras.sticky.js";
import * as extrasStatevis from "../lib/ct-ui-router-extras.statevis.js";

import vis from "./vis/vis";

let imports = [ d3, vis, extrasCore, extrasSticky, extrasStatevis ];

let app = angular.module("demo", [uiRouter, vis, 'ct.ui.router.extras.statevis']);

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
    template: '<h3>contact</h3> <div ui-view/>'
  });
});

app.run(($interval, $state) => {
  $interval(function() {
    let states = $state.get();
    let rnd = (max) => Math.floor(Math.random() * max);
    let idx = rnd(states.length);
    let parent = states[idx];
    let newInt = rnd(999);
    $sp.state({
      name: parent.name ? parent.name + ".S" + newInt : "S" + newInt,
      url: "/" + newInt,
      template: "<h3>" + newInt + "</h3>"
    });
  }, 5000)
});