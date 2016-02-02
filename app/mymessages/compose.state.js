import {template, controller} from "./compose.component";
/**
 * This state allows the user to compose a new message, edit a drafted message, send a message,
 * or save an unsent message as a draft.
 *
 * This state uses view-targeting to take over the ui-view that would normally be filled by the 'mymessages' state.
 */
export let composeState = {
  name: 'mymessages.compose',
  url: '/compose',
  // Declares that this state has a 'message' parameter, that defaults to an empty object.
  // Note the parameter does not appear in the URL.
  params: {
    message: {}
  },
  resolve: {
    // Dirty checking API (TODO: simplify this)
    statusApi: () => ({
      isDirty: () => false
    })
  },
  onExit: (dialogService, statusApi) => {
    // This hook asks the user to confirm deactivating this state, if the message has been edited (is dirty)
    if (statusApi.isDirty())
      return dialogService.confirm('You have not saved this message.', 'Navigate away and lose changes?', "Yes", "No");
  },
  views: {
    // Absolutely targets the $default (unnamed) ui-view, two nesting levels down.
    "!$default.$default": {
      template: template,
      controller: controller,
      controllerAs: 'vm'
    }
  }
};
