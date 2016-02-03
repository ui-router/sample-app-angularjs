import {ngmodule} from "../bootstrap/ngmodule"

/**
 * This file registers an hook with the TransitionsService which protects a
 * route that requires authentication.
 *
 * Register a hook which redirects to /login when:
 * - The user is not authenticated
 * - The user is navigating to a state that requires authentication
 */
ngmodule.run(($state, $transitions, AuthService) => {
  // Matches if the destination state's data property has a truthy 'requiresAuth' property
  let requiresAuthCriteria = {
    to: (state) => state.data && state.data.requiresAuth
  };

  // Function that returns a redirect for the current transition to the login state
  // if the user is not currently authenticated (according to the AuthService)
  let redirectToLogin = [ 'AuthService', '$transition$', (AuthService) => {
    if (!AuthService.isAuthenticated()) {
      return $state.target('login', undefined, { location: false });
    }
  }];

  // Register the "requires auth" hook with the TransitionsService
  $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
});