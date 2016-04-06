"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
/** Google analytics */
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * (new Date());
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
var ga = window['ga'];
ga('create', 'UA-73329341-1', 'auto');
ga('send', 'pageview');
ngmodule_1.ngmodule.config(function ($transitionsProvider) {
    $transitionsProvider.onBefore({}, function ($transition$) {
        var path = $transition$.treeChanges().to
            .map(function (node) { return node.state.self.url; })
            .filter(function (x) { return x != null && x !== '^'; })
            .join('');
        var vpv = function (path) { return ga('send', 'pageview', path); };
        var success = function () { vpv(path); };
        var error = function (err) {
            var errType = err && err.hasOwnProperty("type") ? err.type : '_';
            path = path.replace(/^\//, "");
            vpv("/errors/" + errType + "/" + path);
        };
        $transition$.promise.then(success, error);
    });
});
//# sourceMappingURL=ga.js.map