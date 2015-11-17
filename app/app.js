import {app} from './index';

import {flattenReduce} from './util/util';

import "./dataSources"

import './mymessages/index';
import './contacts/index';
import './prefs/index';

app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("");

  $stateProvider.state({
    name: 'app',
    url: '',
    redirectTo: 'mymessages',
    template: '<div ui-view/>'
  });
});

app.run(($state, $trace, $transitions) => {
  $trace.enable(1); // transitions; alternative to $trace.enable("TRANSITION")

  let matchCriteria = { to: (state) => !!state.redirectTo };
  let redirectFn = ($transition$) => $transition$.redirect($state.targetState($transition$.to().redirectTo));
  $transitions.onBefore(matchCriteria, redirectFn);
});

app.filter('messageBody', ($sce) => (msgText) => $sce.trustAsHtml(msgText.split(/\n/).map(p => `<p>${p}</p>`).join('\n')));

app.value('AppConfig', {
  sort: '+date',
  emailAddress: 'myself@angular.dev'
});

