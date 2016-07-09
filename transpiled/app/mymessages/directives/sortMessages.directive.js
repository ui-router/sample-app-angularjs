"use strict";
/**
 * A directive (for a table header) which changes the app's sort order
 */
exports.sortMessages = function (AppConfig) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var col = attrs.sortMessages;
            if (!col)
                return;
            var chevron = angular.element("<i style='padding-left: 0.25em' class='fa'></i>");
            elem.append(chevron);
            elem.on("click", function (evt) { return AppConfig.sort = (AppConfig.sort === "+" + col) ? "-" + col : "+" + col; });
            scope.$watch(function () { return AppConfig.sort; }, function (newVal) {
                chevron.toggleClass("fa-sort-asc", newVal == "+" + col);
                chevron.toggleClass("fa-sort-desc", newVal == "-" + col);
            });
        }
    };
};
//# sourceMappingURL=sortMessages.directive.js.map