"use strict";
exports.dialog = function ($timeout, $q) {
    return {
        link: function (scope, elem) {
            $timeout(function () { return elem.addClass('active'); });
            elem.data('promise', $q(function (resolve, reject) {
                scope.yes = function () { return resolve(true); };
                scope.no = function () { return reject(false); };
            }));
        },
        template: "\n      <div class=\"backdrop\"></div>\n      <div class='wrapper'>\n        <div class=\"content\">\n          <h4 ng-show=\"message\">{{message}}</h4>\n          <div ng-show=\"details\">{{details}}</div>\n    \n          <div style=\"padding-top: 1em;\">\n            <button class=\"btn btn-primary\" ng-click=\"yes()\">{{yesMsg}}</button>\n            <button class=\"btn btn-primary\" ng-click=\"no()\">{{noMsg}}</button>\n          </div>\n        </div>\n      </div>\n"
    };
};
//# sourceMappingURL=dialog.directive.js.map