import {appTemplate, appController} from "./app.component";
import {welcomeTemplate, welcomeController} from "./welcome.component";
import {homeTemplate} from "./home.component";
import {loginTemplate, loginController} from "./login.component";

/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost chrome (including the navigation and logout for authenticated users)
 * 2) Provide a viewport (ui-view) for a substate to plug into
 */
export const appState = {
  name: 'app',
  redirectTo: 'welcome',
  component: 'app'
};

/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
export const welcomeState = {
  parent: 'app',
  name: 'welcome',
  url: '/welcome',
  component: 'welcome'
};


/**
 * This is a home screen for authenticated users.
 *
 * It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
 */
export const homeState = {
  parent: 'app',
  name: 'home',
  url: '/home',
  component: 'home'
};


/**
 * This is the login state.  It is activated when the user navigates to /login, or if a unauthenticated
 * user attempts to access a protected state (or substate) which requires authentication. (see routerhooks/requiresAuth.js)
 *
 * It shows a fake login dialog and prompts the user to authenticate.  Once the user authenticates, it then
 * reactivates the state that the user originally came from.
 */
export const loginState = {
  parent: 'app',
  name: 'login',
  url: '/login',
  component: 'login',
  resolve: { returnTo: returnTo }
};

/**
 * A resolve function for 'login' state which figures out what state to return to, after a successful login.
 *
 * If the user was initially redirected to login state (due to the requiresAuth redirect), then return the toState/params
 * they were redirected from.  Otherwise, if they transitioned directly, return the fromState/params.  Otherwise
 * return the main "home" state.
 */
returnTo.$inject = ['$transition$'];
function returnTo($transition$) {
  if ($transition$.redirectedFrom() != null) {
    // The user was redirected to the login state (e.g., via the requiresAuth hook when trying to activate contacts)
    // Return to the original attempted target state (e.g., contacts)
    return $transition$.redirectedFrom().targetState();
  }

  let $state = $transition$.router.stateService;

  // The user was not redirected to the login state; they directly activated the login state somehow.
  // Return them to the state they came from.
  if ($transition$.from().name !== '') {
    return $state.target($transition$.from(), $transition$.params("from"));
  }

  // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
  return $state.target('home');
}



// Future State (Placeholder) for the contacts module
export const contactsFutureState = {
  parent: 'app',
  name: 'contacts.**',
  url: '/contacts',
  lazyLoad: function(transition) {
    const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return import('../contacts/contacts.module').then(mod => $ocLazyLoad.load(mod.CONTACTS_MODULE))
  }
};

// Future State (Placeholder) for the prefs module
export const prefsFutureState = {
  parent: 'app',
  name: 'prefs.**',
  url: '/prefs',
  lazyLoad: function(transition) {
    const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return import('../prefs/prefs.module').then(mod => $ocLazyLoad.load(mod.PREFS_MODULE))
  }
};

// Future State (Placeholder) for the mymessages module
export const mymessagesFutureState = {
  parent: 'app',
  name: 'mymessages.**',
  url: '/mymessages',
  lazyLoad: function(transition) {
    const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return import('../mymessages/mymessages.module').then(mod => $ocLazyLoad.load(mod.MYMESSAGES_MODULE))
  }
};

