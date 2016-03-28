import {appTemplate, appController} from "./app.component";
/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost chrome (including the navigation and logout for authenticated users)
 * 2) Provide a viewport (ui-view) for a substate to plug into
 */
export let appState = {
  name: 'app',
  redirectTo: 'welcome',
  template: appTemplate,
  controller: appController,
  controllerAs: 'vm'
};
