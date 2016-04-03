"use strict";
var ngmodule_1 = require("../../bootstrap/ngmodule");
// Angular filter to format fake emails as HTML
ngmodule_1.ngmodule.filter('messageBody', function ($sce) { return function (msgText) { return $sce.trustAsHtml(msgText.split(/\n/).map(function (p) { return ("<p>" + p + "</p>"); }).join('\n')); }; });
//# sourceMappingURL=messageBody.filter.js.map