import {ngmodule} from "../bootstrap/ngmodule";
import {folderTemplate, folderController} from "./folder.component";
import {composeTemplate, composeController} from "./compose.component";
import {mymessagesTemplate, mymessagesController} from "./mymessages.component";
import {messageTemplate, messageController} from "./message.component";

/**
 * This state allows the user to compose a new message, edit a drafted message, send a message,
 * or save an unsent message as a draft.
 *
 * This state uses view-targeting to take over the ui-view that would normally be filled by the 'mymessages' state.
 */
let composeState = {
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
      template: composeTemplate,
      controller: composeController,
      controllerAs: 'vm'
    }
  }
};

/**
 * The mymessages state. This is the main state for the mymessages submodule.
 *
 * This state shows the list of folders for the current user. It retrieves the folders from the
 * Folders service.  If a user navigates directly to this state, the state redirects to the 'mymessages.folder'.
 *
 */
let mymessagesState = {
  parent: 'app',
  name: "mymessages",
  url: "/mymessages",
  resolve: {
    // All the folders are fetched from the Folders service
    folders: (Folders) => Folders.all()
  },
  // If mymessages state is directly activated, redirect the transition to the child state 'mymessages.folder'
  redirectTo: 'mymessages.folder',
  template: mymessagesTemplate,
  controller: mymessagesController,
  controllerAs: "vm",
  // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
  data: { requiresAuth: true }
};


/**
 * This state shows the contents of a single message.
 * It also has UI to reply, forward, delete, or edit an existing draft.
 */
let messageState = {
  name: 'mymessages.folder.message',
  url: '/:messageId',
  resolve: {
    // Fetch the message from the Messages service using the messageId parameter
    message: (Messages, $stateParams) => Messages.get($stateParams.messageId),
    MessageListUi: ($filter, AppConfig, messages) => ({
      // This is a UI helper which finds the nearest messageId in the messages list to the messageId parameter
      proximalMessageId: (messageId) => {
        let sorted = $filter("orderBy")(messages, AppConfig.sort);
        let idx = sorted.findIndex(msg => msg._id === messageId);
        var proximalIdx = sorted.length > idx + 1 ? idx + 1 : idx - 1;
        return proximalIdx >= 0 ? sorted[proximalIdx]._id : undefined;
      }
    })
  },
  views: {
    // Relatively target the parent-state's parent-state's 'messagecontent' ui-view
    // This could also have been written using ui-view@state addressing: 'messagecontent@mymessages'
    // Or, this could also have been written using absolute ui-view addressing: '!$default.$default.messagecontent'
    "^.^.messagecontent": {
      template: messageTemplate,
      controller: messageController,
      controllerAs: 'vm'
    }
  }
};


/**
 * This state shows the contents (a message list) of a single folder
 */
let folderState = {
  name: 'mymessages.folder',
  url: '/:folderId',
  // The folderId parameter is part of the URL.  This params block sets 'inbox' as the default value.
  // If no parameter value for folderId is provided on the transition, then it will be defaulted to 'inbox'
  params: {folderId: "inbox"},
  resolve: {
    // Fetch the current folder from the Folders service, using the folderId parameter
    folder: (Folders, $stateParams) => Folders.get($stateParams.folderId),

    // The resolved folder object (from the resolve above) is injected into this resolve
    // The list of message for the folder are fetched from the Messages service
    messages: (Messages, folder) => Messages.byFolder(folder)
  },
  views: {
    // This targets the "messagelist" named ui-view added to the DOM in the parent state 'mymessages'
    "messagelist": {
      template: folderTemplate,
      controller: folderController,
      controllerAs: 'vm'
    }
  }
};


// ...and register them with the $stateProvider
ngmodule.config(($stateProvider) => {
  let mymessagesStates = [ folderState, mymessagesState, messageState, composeState ];
  mymessagesStates.forEach(state => $stateProvider.state(state));
});