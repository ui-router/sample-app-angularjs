import {app} from "../app.module"

/**
 * This file registers an hook with the TransitionsService that protects a route which requires authentication.
 *
 * Register a hook which redirects to /login when:
 * - The user is not authenticated
 * - The user is navigating to a state that requires authentication
 */
app.run(($state, $transitions, AuthService) => {
  // Matches if the destination state's data property has a truthy 'requiresAuth' property
  let requiresAuthCriteria = {
    to: (state) => state.data && state.data.requiresAuth && !AuthService.isAuthenticated()
  };

  // Function that returns a redirect for the current transition to the login state
  let redirectToLogin = ($transition$) => $state.target('login');

  // Register the "requires auth" hook with the TransitionsService
  $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
});