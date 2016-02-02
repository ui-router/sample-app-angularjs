import {template} from "./home.component";
/**
 * This is a home screen for authenticated users.
 *
 * It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
 */
export let homeState = {
  parent: 'app',
  name: 'home',
  url: '/home',
  template: template
};
