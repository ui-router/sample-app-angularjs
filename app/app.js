import {app} from './app.module';

import {flattenReduce} from './util/util';

import "./dataSources"

import './mymessages/mymessages.module';
import './contacts/contacts.module';
import './prefs/prefs.module';

import './welcome';
import './home';
import './login';
import './authenticatedNav';
import './util/appConfig';
import './util/auth';
import './routerhooks/redirectTo';
import './util/messageBodyFilter';

app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("/welcome");
});

app.run(($trace) => {
  // trace transitions; alternative to $trace.enable("TRANSITION")
  $trace.enable(1);
});
