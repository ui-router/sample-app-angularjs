import {folderTemplate, folderController} from "./folder.component";
/**
 * This state shows the contents (a message list) of a single folder
 */

export let folderState = {
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
