import {app} from './app_module';

import "./datasource/contacts"
import "./datasource/messages"
import "./mymessages/mymessages"

let $sp;
app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("");
  $sp = $stateProvider;
  $stateProvider.state({
    name: 'app',
    url: '',
    redirectTo: 'mymessages',
    template: '<div class="container-fluidx" ui-view/>'
  });

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

