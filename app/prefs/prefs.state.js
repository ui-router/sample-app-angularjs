import {template, controller} from "./prefs.component";
/**
 * This state allows the user to set their application preferences
 */
export let prefsState = {
  parent: 'app',
  name: 'prefs',
  url: '/prefs',
  template: template,
  controller: controller,
  controllerAs: 'vm',
  // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
  data: { requiresAuth: true }
};