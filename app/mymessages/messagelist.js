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
  params: {folderId: "inbox"},
  resolve: {
    folder: (Folders, $stateParams) => Folders.get($stateParams.folderId),
    messages: (Messages, folder) =>
        Messages.byFolder(folder._id),
    MessageListUi: ($filter, AppConfig, messages) => ({
      proximalMessageId: (messageId) => {
        let sorted = $filter("orderBy")(messages, AppConfig.sort);
        let idx = sorted.findIndex(msg => msg._id === messageId);
        var proximalIdx = sorted.length > idx + 1 ? idx + 1 : idx - 1;
        return proximalIdx >= 0 ? sorted[proximalIdx]._id : undefined;
      }
    })
  },
  views: {
    "messagelist": {
      template: template,
      controller: FolderController,
      controllerAs: 'vm'
    }
  }
};

export {folderState};