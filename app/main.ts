import {app} from './module'
import {services, states} from './messages/moduleMessages';

services.forEach(app.service.bind(app));

let $sp;
app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("/app");
  $sp = $stateProvider;
  $stateProvider.state({
    name: 'app',
    url: '/app',
    template: '<span>welcome to the app</span> <span ui-view/>'
  });

  states.forEach($sp.state.bind($sp));

  $stateProvider.state({
    name: 'app.contacts',
    url: '/contacts',
    template: '<span>contacts</span> <span ui-view/>'
  });

  $stateProvider.state({
    name: 'app.contacts.contact',
    url: '/:contactId',
    params: { contactId: "123" },
    template: '<span>contact</span> <span ui-view/>'
  });
});

app.run(($rootScope, $interval, $state, $trace) => {
  $trace.enable(1, 2);
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