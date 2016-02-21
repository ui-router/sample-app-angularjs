"use strict";
var angular = require("angular");
var ngmodule_1 = require("../bootstrap/ngmodule");
var dialogTpl = "\n  <div class=\"backdrop\"></div>\n  <div class='wrapper'>\n    <div class=\"content\">\n      <h4 ng-show=\"message\">{{message}}</h4>\n      <div ng-show=\"details\">{{details}}</div>\n\n      <div style=\"padding-top: 1em;\">\n        <button class=\"btn btn-primary\" ng-click=\"yes()\">{{yesMsg}}</button>\n        <button class=\"btn btn-primary\" ng-click=\"no()\">{{noMsg}}</button>\n      </div>\n    </div>\n  </div>\n";
function DialogDirective($timeout, $q) {
    return {
        template: dialogTpl,
        link: function (scope, elem) {
            $timeout(function () { return elem.addClass('active'); });
            elem.data('promise', $q(function (resolve, reject) {
                scope.yes = function () { return resolve(true); };
                scope.no = function () { return reject(false); };
            }));
        }
    };
}
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
ngmodule_1.ngmodule.directive("dialog", DialogDirective);
ngmodule_1.ngmodule.service("dialogService", DialogService);
//# sourceMappingURL=dialog.js.map