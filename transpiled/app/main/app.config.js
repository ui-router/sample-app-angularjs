// Apply some global configuration...
"use strict";
// If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
exports.otherwiseConfigBlock = ['$urlRouterProvider', function ($urlRouterProvider) { $urlRouterProvider.otherwise("/welcome"); }];
// Enable tracing of each TRANSITION... (check the javascript console)
// This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
// Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
exports.traceRunBlock = ['$trace', function ($trace) { $trace.enable(1); }];
//# sourceMappingURL=app.config.js.map