import {welcomeTemplate, welcomeController} from "./welcome.component";

/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
export let welcomeState = {
  parent: 'app',
  name: 'welcome',
  url: '/welcome',
  template: welcomeTemplate,
  controller: welcomeController
};
