// Apply some global configuration...

// If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
export const otherwiseConfigBlock = ['$urlRouterProvider', $urlRouterProvider => { $urlRouterProvider.otherwise("/welcome"); }];

// Enable tracing of each TRANSITION... (check the javascript console)

// This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
// Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
export const traceRunBlock = ['$trace', $trace => { $trace.enable(1); }];
