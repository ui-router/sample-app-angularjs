import {app} from "./app.module";

// This is the login screen
// It shows a fake login dialog and prompts the user to authenticate.
// Once the user authenticates, it then re-attempts to activate the state
// that they originally came from

class LoginController {
  constructor(AppConfig, AuthService, $state, returnTo) {
    this.usernames = AuthService.usernames;

    this.credentials = {
      username: AppConfig.emailAddress,
      password: 'password'
    };

    this.login = (credentials) => {
      this.authenticating = true;

      const returnToOriginalState = () => $state.go(returnTo.state, returnTo.params);
      const showError = (errorMessage) => this.errorMessage = errorMessage;

      AuthService.authenticate(credentials.username, credentials.password)
          .then(returnToOriginalState)
          .catch(showError)
          .finally(() => this.authenticating = false);
    }
  }
}

let loginTemplate = `
    <div class="container">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <h3>Log In</h3>
        <p>(This login screen is for demonstration only... just pick a username, enter 'password' and click <b>"Log in"</b>)</p>
        <hr>

        <div>
          <label for="username">Username:</label>
          <select class="form-control" name="username" id="username"
            ng-model="vm.credentials.username" ng-options="username for username in vm.usernames"></select>
          <i style="position: relative; bottom: 1.8em; margin-left: 10em; height: 0"
              ng-hide="vm.credentials.username" class="fa fa-arrow-left bounce-horizontal"> Choose </i>
        </div>
        <br>

        <div>
          <label for="password">Password:</label>
          <input class="form-control" type="password" name="password" ng-model="vm.credentials.password">
          <i style="position: relative; bottom: 1.8em; margin-left: 5em; height: 0"
              ng-hide="!vm.credentials.username || vm.credentials.password == 'password'" class="fa fa-arrow-left bounce-horizontal">
            Enter '<b>password</b>' here
          </i>
        </div>

        <div ng-show="vm.errorMessage" class="well error">{{ vm.errorMessage }}</div>

        <hr>
        <div>
          <button class="btn btn-primary" type="button"
              ng-disabled="vm.authenticating" ng-click="vm.login(vm.credentials)">
            <i class="fa fa-spin fa-spinner" ng-show="vm.authenticating"></i> Log in
          </button>
          <i ng-show="vm.credentials.username && vm.credentials.password == 'password'" style="position: relative;" class="fa fa-arrow-left bounce-horizontal"> Click Me!</i>
      </div>
    </div>
    `;


// Resolve which figures out what state we should return to after a successful login.
// If the user was redirected to this state (due to the requiresAuth redirect), then return the state/params
// they were redirected from.  Otherwise, if they transitioned directly, return the from state.  Otherwise
// return the main "app" state.
const returnTo = ($state, $transition$) => {
  let redirectedFrom = $transition$;
  // Follow the current transition's redirect chain all the way backwards
  while (redirectedFrom.previous()) {
    redirectedFrom = redirectedFrom.previous();
  }

  // Get the "from" state & params, so we can return to there after successful authentication.
  let returnTo = {
    state: redirectedFrom.from(),
    params: redirectedFrom.params('from')
  };

  return returnTo.state.name ? returnTo : { state: 'home' };
};


app.config(($stateProvider) => {
  $stateProvider.state({
    name: 'login',
    url: '/login',
    controller: LoginController,
    controllerAs: 'vm',
    template: loginTemplate,
    resolve: { returnTo: returnTo }
  });
});
