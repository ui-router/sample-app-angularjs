"use strict";
exports.template = "\n<div class=\"navheader\">\n  <ul ng-if=\"::vm.isAuthenticated\" class=\"nav nav-tabs\">\n\n    <li ui-sref-active=\"active\"> <a ui-sref=\"mymessages\" role=\"button\"> Messages </a> </li>\n    <li ui-sref-active=\"active\"> <a ui-sref=\"contacts\" role=\"button\"> Contacts </a> </li>\n    <li ui-sref-active=\"active\"> <a ui-sref=\"prefs\" role=\"button\"> Preferences </a> </li>\n\n    <li class=\"navbar-right\">\n      <button class=\"btn btn-primary fa fa-home\" ui-sref=\"home\"></button>\n      <button style=\"margin-right: 15px;\" class=\"btn btn-primary\" ui-sref=\"mymessages.compose\"><i class=\"fa fa-envelope\"></i> New Message</button>\n    </li>\n\n    <li class=\"navbar-text navbar-right logged-in-user\" style=\"margin: 0.5em 1.5em;\">\n      <div>\n        {{::vm.emailAddress}} <i class=\"fa fa-chevron-down\"></i>\n        <div class=\"hoverdrop\">\n          <button class=\"btn btn-primary\" ng-click=\"vm.logout()\">Log Out</button>\n        </div>\n      </div>\n    </li>\n\n  </ul>\n</div>\n\n<div ui-view/>\n";
exports.controller = (function () {
    function AuthedController(AppConfig, AuthService, $state) {
        this.AuthService = AuthService;
        this.$state = $state;
        this.emailAddress = AppConfig.emailAddress;
        this.isAuthenticated = AuthService.isAuthenticated();
    }
    AuthedController.prototype.logout = function () {
        var _a = this, AuthService = _a.AuthService, $state = _a.$state;
        AuthService.logout();
        // Reload states after authentication change
        return $state.go('welcome', {}, { reload: true });
    };
    return AuthedController;
}());
//# sourceMappingURL=app.component.js.map