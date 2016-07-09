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
 * return the main "app" state.
 */
function returnTo ($transition$) {
  let redirectedFrom = $transition$.previous();
  // The user was redirected to the login state (via the requiresAuth hook)
  if (redirectedFrom != null) {
    // Follow the current transition's redirect chain all the way back to the original attempted transition
    while (redirectedFrom.previous()) {
      redirectedFrom = redirectedFrom.previous();
    }
    // return to the original attempted "to state"

    return { state: redirectedFrom.to(), params: redirectedFrom.params("to") };
  }

  // The user was not redirected to the login state; they directly activated the login state somehow.
  // Return them to the state they came from.
  let fromState = $transition$.from();
  let fromParams = $transition$.params("from");

  if (fromState.name !== '') {
    return {state: fromState, params: fromParams};
  }

  // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
  return { state: 'home' };
}
