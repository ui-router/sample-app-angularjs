import {app} from './app.module';

import {flattenReduce} from './util/util';

import "./dataSources"

import './mymessages/mymessages.module';
import './contacts/contacts.module';
import './prefs/prefs.module';

import './login';
import './util/appConfig';
import './util/auth';


app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("");

  $stateProvider.state({
    name: 'app',
    url: '',
    data: { requiresAuth: true},
    template: '<div ui-view/>'
  });
});


app.run(($state, $trace, $transitions) => {
  $trace.enable(1); // transitions; alternative to $trace.enable("TRANSITION")

  // Matches if the destination state has a 'redirectTo' property
  let matchCriteria = { to: (state) => state.redirectTo != null };
  // Function that returns a redirect for a transition, with a TargetState created using the desitionat state's 'redirectTo' property
  let redirectFn = ($transition$) => $transition$.redirect($state.targetState($transition$.to().redirectTo));
  // Register the redirectTo hook
  $transitions.onBefore(matchCriteria, redirectFn);
});


app.filter('messageBody', ($sce) => (msgText) => $sce.trustAsHtml(msgText.split(/\n/).map(p => `<p>${p}</p>`).join('\n')));

