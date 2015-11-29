import {app} from './app.module';

import {flattenReduce} from './util/util';

import "./dataSources"

import './mymessages/mymessages.module';
import './contacts/contacts.module';
import './prefs/prefs.module';


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


class AppConfig {
  constructor() {
    this.sort = '+date';
    this.emailAddress = 'myself@angular.dev';
    this.restDelay = 100;
  }

  load() {
    try {
      return angular.extend(this, angular.fromJson(sessionStorage.getItem("appConfig")))
    } catch (Error) { }

    return this;
  }

  save() {
    sessionStorage.setItem("appConfig", angular.toJson(angular.extend({}, this)));
  }
}

app.value('AppConfig', new AppConfig().load());

