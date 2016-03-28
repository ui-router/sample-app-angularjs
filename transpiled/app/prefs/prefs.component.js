"use strict";
exports.prefsTemplate = "\n<div>\n  <button class=\"btn btn-primary\" ng-click=\"vm.reset()\"><i class=\"fa fa-recycle\"></i> <span>Reset All Data</span></button>\n</div>\n\n<div>\n  <label for=\"restDelay\">Simulated REST API delay (ms)</label>\n  <input type=\"text\" name=\"restDelay\" ng-model=\"vm.prefs.restDelay\">\n  <button class=\"btn btn-primary\" ng-click=\"vm.savePrefs()\">Save</button>\n</div>\n";
exports.prefsController = function PrefsController(AppConfig) {
    var _this = this;
    this.prefs = {
        restDelay: AppConfig.restDelay
    };
    /** Clear out the session storage */
    this.reset = function () {
        sessionStorage.clear();
        document.location.reload(true);
    };
    /** After saving preferences to session storage, reload the entire application */
    this.savePrefs = function () {
        angular.extend(AppConfig, { restDelay: _this.prefs.restDelay }).save();
        document.location.reload(true);
    };
};
//# sourceMappingURL=prefs.component.js.map