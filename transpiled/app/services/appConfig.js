"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
/**
 * This service stores and retrieves user preferences in session storage
 */
var AppConfig = (function () {
    function AppConfig() {
        this.sort = '+date';
        this.emailAddress = undefined;
        this.restDelay = 100;
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
ngmodule_1.ngmodule.value('AppConfig', new AppConfig().load());
//# sourceMappingURL=appConfig.js.map