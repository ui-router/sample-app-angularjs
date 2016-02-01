import {app} from "../app.module"

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
        .then((authenticatedUser) => {
          AppConfig.emailAddress = authenticatedUser;
          AppConfig.save()
        });
  }

  logout() {
    this.AppConfig.emailAddress = undefined;
    this.AppConfig.save();
  }
}

app.service("AuthService", FakeAuthService);