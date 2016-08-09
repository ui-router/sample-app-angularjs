"use strict";
/** Angular filter to format fake emails as HTML*/
exports.messageBody = function ($sce) {
    return function (msgText) {
        if (msgText === void 0) { msgText = ''; }
        return $sce.trustAsHtml(msgText.split(/\n/).map(function (p) { return ("<p>" + p + "</p>"); }).join('\n'));
    };
};
//# sourceMappingURL=messageBody.filter.js.map