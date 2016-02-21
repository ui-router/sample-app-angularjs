"use strict";
exports.template = "\n<div class=\"container\">\n  <div class=\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">\n    <h3>Log In</h3>\n    <p>(This login screen is for demonstration only... just pick a username, enter 'password' and click <b>\"Log in\"</b>)</p>\n    <hr>\n\n    <div>\n      <label for=\"username\">Username:</label>\n      <select class=\"form-control\" name=\"username\" id=\"username\"\n        ng-model=\"vm.credentials.username\" ng-options=\"username for username in vm.usernames\"></select>\n      <i style=\"position: relative; bottom: 1.8em; margin-left: 10em; height: 0\"\n          ng-hide=\"vm.credentials.username\" class=\"fa fa-arrow-left bounce-horizontal\"> Choose </i>\n    </div>\n    <br>\n\n    <div>\n      <label for=\"password\">Password:</label>\n      <input class=\"form-control\" type=\"password\" name=\"password\" ng-model=\"vm.credentials.password\">\n      <i style=\"position: relative; bottom: 1.8em; margin-left: 5em; height: 0\"\n          ng-hide=\"!vm.credentials.username || vm.credentials.password == 'password'\" class=\"fa fa-arrow-left bounce-horizontal\">\n        Enter '<b>password</b>' here\n      </i>\n    </div>\n\n    <div ng-show=\"vm.errorMessage\" class=\"well error\">{{ vm.errorMessage }}</div>\n\n    <hr>\n    <div>\n      <button class=\"btn btn-primary\" type=\"button\"\n          ng-disabled=\"vm.authenticating\" ng-click=\"vm.login(vm.credentials)\">\n        <i class=\"fa fa-spin fa-spinner\" ng-show=\"vm.authenticating\"></i> <span>Log in</span>\n      </button>\n      <i ng-show=\"vm.credentials.username && vm.credentials.password == 'password'\" style=\"position: relative;\" class=\"fa fa-arrow-left bounce-horizontal\"> Click Me!</i>\n  </div>\n</div>\n";
exports.controller = (function () {
    function LoginController(AppConfig, AuthService, $state, returnTo) {
        var _this = this;
        this.usernames = AuthService.usernames;
        this.credentials = {
            username: AppConfig.emailAddress,
            password: 'password'
        };
        this.login = function (credentials) {
            _this.authenticating = true;
            var returnToOriginalState = function () { return $state.go(returnTo.state, returnTo.params, { reload: true }); };
            var showError = function (errorMessage) { return _this.errorMessage = errorMessage; };
            AuthService.authenticate(credentials.username, credentials.password)
                .then(returnToOriginalState)
                .catch(showError)
                .finally(function () { return _this.authenticating = false; });
        };
    }
    return LoginController;
}());
//# sourceMappingURL=login.component.js.map