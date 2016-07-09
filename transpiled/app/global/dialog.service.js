"use strict";
var angular = require("angular");
var DialogService = (function () {
    function DialogService($document, $compile, $rootScope) {
        var body = $document.find("body");
        var elem = angular.element("<div class='dialog' dialog='opts'></div>");
        this.confirm = function (message, details, yesMsg, noMsg) {
            if (details === void 0) { details = "Are you sure?"; }
            if (yesMsg === void 0) { yesMsg = "Yes"; }
            if (noMsg === void 0) { noMsg = "No"; }
            $compile(elem)(angular.extend($rootScope.$new(), { message: message, details: details, yesMsg: yesMsg, noMsg: noMsg }));
            body.append(elem);
            return elem.data("promise").finally(function () { return elem.removeClass('active').remove(); });
        };
    }
    return DialogService;
}());
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map