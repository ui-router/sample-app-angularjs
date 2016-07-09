"use strict";
/**
 * This service stores and retrieves user preferences in session storage
 */
var AppConfig = (function () {
    function AppConfig() {
        this.sort = '+date';
        this.emailAddress = undefined;
        this.restDelay = 100;
        this.load();
    }
    AppConfig.prototype.load = function () {
        try {
            return angular.extend(this, angular.fromJson(sessionStorage.getItem("appConfig")));
        }
        catch (Error) { }
        return this;
    };
    AppConfig.prototype.save = function () {
        sessionStorage.setItem("appConfig", angular.toJson(angular.extend({}, this)));
    };
    return AppConfig;
}());
exports.AppConfig = AppConfig;
//# sourceMappingURL=appConfig.service.js.map