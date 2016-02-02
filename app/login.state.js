import {template, controller} from "./login.component";
/**
 * This is the login state.  It is activated when the user navigates to /login, or if a unauthenticated
 * user attempts to access a protected state (or substate) which requires authentication. (see routerhooks/requiresAuth.js)
 *
 * It shows a fake login dialog and prompts the user to authenticate.  Once the user authenticates, it then
 * reactivates the state that the user originally came from.
 */
export let loginState = {
  parent: 'app',
  name: 'login',
  url: '/login',
  template: template,
  controller: controller,
  controllerAs: 'vm',
  resolve: { returnTo: returnTo }
};

/**
 * A resolve function which figures out what state we should return to after a successful login.
 * If the user was redirected to this state (due to the requiresAuth redirect), then return the state/params
 * they were redirected from.  Otherwise, if they transitioned directly, return the from state.  Otherwise
 * return the main "app" state.
 */
function returnTo ($transition$) {
  let redirectedFrom = $transition$;
  // Follow the current transition's redirect chain all the way backwards
  while (redirectedFrom.previous()) {
    redirectedFrom = redirectedFrom.previous();
  }

  // Get the "from" state & params, so we can return to there after successful authentication.
  let returnTo = {
    state: redirectedFrom.from(),
    params: redirectedFrom.params('from')
  };

  return returnTo.state.name ? returnTo : { state: 'home' };
}
