import {ngmodule} from "./bootstrap/ngmodule";

// Import the top-level state definitions for app, welcome, home, and login
import {appState} from "./app.state";
import {welcomeState} from './welcome.state';
import {homeState} from './home.state';
import {loginState} from './login.state';

// and register each one with the StateProvider
ngmodule.config(['$stateProvider', $stateProvider => {
  [appState, homeState, welcomeState, loginState].forEach(state => $stateProvider.state(state));
}]);


// Apply some global configuration...

// If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
ngmodule.config(['$urlRouterProvider', $urlRouterProvider => { $urlRouterProvider.otherwise("/welcome"); }]);

// Enable tracing of each TRANSITION... (check the javascript console)

// This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
// Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
ngmodule.run(['$trace', $trace => { $trace.enable(1); }]);
