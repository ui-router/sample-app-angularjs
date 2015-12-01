import {app} from "../app.module"


// Register a hook that redirects to /login when:
// - The user is not authenticated
// - The user is navigating to a state that requires authentication
app.run(($state, $transitions, AuthService) => {
  // Matches if the destination state's data property has a truthy 'requiresAuth' property
  let requiresAuthCriteria = {
    to: (state) => state.data && state.data.requiresAuth && !AuthService.isAuthenticated()
  };

  // Function that returns a redirect for the current transition to the login state
  let redirectToLogin = ($transition$) => $transition$.redirect($state.targetState('login'));

  // Register the "requires auth" hook
  $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
});


class FakeAuthService {
  constructor(AppConfig, $q, $timeout) {
    this.AppConfig = AppConfig;
    this.$q = $q;
    this.$timeout = $timeout;
    this.usernames = ['myself@angular.dev', 'devgal@angular.dev', 'devguy@angular.dev'];
  }

  isAuthenticated = () => !!this.AppConfig.emailAddress;

  // Fake authentication function that returns a promise.
  authenticate(username, password) {
    let { $timeout, $q, AppConfig } = this;

    // checks if the username is one of the known usernames, and the password is 'password'
    const checkCredentials = () => $q((resolve, reject) => {
      var validUsername = this.usernames.indexOf(username) !== -1;
      var validPassword = password === 'password';

      return (validUsername && validPassword) ? resolve(username) : reject("Invalid username or password");
    });

    return $timeout(checkCredentials, 800)
        .then((authenticatedUser) =>
        AppConfig.emailAddress = authenticatedUser);
  }
}

app.service("AuthService", FakeAuthService);