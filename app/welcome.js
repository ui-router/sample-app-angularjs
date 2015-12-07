import {app} from "./app.module";

let welcomeTemplate = `
  <div class="container-fluid">

    <h3>UI-Router Sample App</h3>

    <p>Welcome to the sample app!</p>
    <p>This is a demonstration app intended to highlight some patterns that can be used within UI-Router.
      These patterns should help you to to build cohesive, robust apps.  Additionally, this app uses state-vis
      to show the tree of states, and a transition log visualizer.</p>


    <h4>App Overview</h4>
    <p>
      First, start exploring the application's functionality at a high level by activating
      one of the three submodules: Messages, Contacts, or Preferences. If you are not already logged in,
      you will be taken to an authentication screen (the authentication is fake; the password is "password")
      <div>
        <button class="btn btn-primary" ui-sref="mymessages"><i class="fa fa-envelope"></i> Messages</button>
        <button class="btn btn-primary" ui-sref="contacts"><i class="fa fa-users"></i> Contacts</button>
        <button class="btn btn-primary" ui-sref="prefs"><i class="fa fa-cogs"></i> Preferences</button>
      </div>
    </p>

    <h4>Patterns</h4>
    <ul>
      <li>pattern 1</li>
      <li>pattern 2</li>
      <li>pattern 3</li>
    </ul>
  </div>
`;

app.config(($stateProvider) => {
  $stateProvider.state({
    name: 'welcome',
    url: '/welcome',
    template: welcomeTemplate
  });
});
