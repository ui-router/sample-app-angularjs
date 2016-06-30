"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
exports.prefsComponent = "prefs";
var prefsTemplate = "\n<div>\n  <button class=\"btn btn-primary\" ng-click=\"$ctrl.reset()\"><i class=\"fa fa-recycle\"></i> <span>Reset All Data</span></button>\n</div>\n\n<div>\n  <label for=\"restDelay\">Simulated REST API delay (ms)</label>\n  <input type=\"text\" name=\"restDelay\" ng-model=\"$ctrl.prefs.restDelay\">\n  <button class=\"btn btn-primary\" ng-click=\"$ctrl.savePrefs()\">Save</button>\n</div>\n";
var PrefsController = (function () {
    function PrefsController(AppConfig) {
        this.AppConfig = AppConfig;
    }
    PrefsController.prototype.$onInit = function () {
        this.prefs = {
            restDelay: this.AppConfig.restDelay
        };
    };
    /** Clear out the session storage */
    PrefsController.prototype.reset = function () {
        sessionStorage.clear();
        document.location.reload(true);
    };
    /** After saving preferences to session storage, reload the entire application */
    PrefsController.prototype.savePrefs = function () {
        angular.extend(this.AppConfig, { restDelay: this.prefs.restDelay }).save();
        document.location.reload(true);
    };
    return PrefsController;
}());
ngmodule_1.ngmodule.component(exports.prefsComponent, {
    controller: PrefsController,
    template: prefsTemplate
});
//# sourceMappingURL=prefs.component.js.map