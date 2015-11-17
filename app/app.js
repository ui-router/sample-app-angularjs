import "./dataSources"
import {app} from './_app';
import {flattenReduce} from './util/util';

import { mymessagesStates } from './mymessages/_mymessages';
import { contactsStates } from './contacts/_contacts';
import { prefsStates } from './prefs/_prefs';

let $sp;
app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("");
  $sp = $stateProvider;
  $stateProvider.state({
    name: 'app',
    url: '',
    redirectTo: 'mymessages',
    template: '<div ui-view/>'
  });
});

app.config(function ($stateProvider) {
  let states = [prefsStates, contactsStates, mymessagesStates].reduce(flattenReduce, []);
  states.forEach(state => $stateProvider.state(state));
});

