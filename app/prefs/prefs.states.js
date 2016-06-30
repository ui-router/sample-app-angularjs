import {prefsComponent} from "./prefs.component";

/**
 * This state allows the user to set their application preferences
 */
let prefsState = {
  parent: 'app',
  name: 'prefs',
  url: '/prefs',
  component: prefsComponent,
  // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
  data: { requiresAuth: true }
};

export let PREFS_STATES = [prefsState];
