/**
 * This state shows the contents (a message list) of a single folder
 */

// Import the directives used
import "./directives/sortMessages";

let template = `
<div class="messages">
  <message-table columns="vm.folder.columns" messages="vm.messages"></message-table>
</div>
`;

function FolderController(AppConfig, folder, messages) {
  this.folder = folder;
  this.messages = messages;
  this.AppConfig = AppConfig;
}

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
      template: template,
      controller: FolderController,
      controllerAs: 'vm'
    }
  }
};

export {folderState};