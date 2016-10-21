"use strict";
var angular = require("angular");
var LoadingIndicatorService = (function () {
    function LoadingIndicatorService($document) {
        var body = $document.find("body");
        this.showLoadingIndicator = function () {
            console.log("showing spinner");
            body.append(angular.element('<div id="spinner"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i></div>'));
        };
        this.hideLoadingIndicator = function () {
            console.log("hiding spinner");
            var spinner = document.getElementById("spinner");
            spinner.parentElement.removeChild(spinner);
        };
    }
    return LoadingIndicatorService;
}());
exports.LoadingIndicatorService = LoadingIndicatorService;
//# sourceMappingURL=loading_indicator.service.js.map