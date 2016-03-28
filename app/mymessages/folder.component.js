import "./directives/messageTable";

export let folderTemplate = `
<div class="messages">
  <message-table columns="vm.folder.columns" messages="vm.messages"></message-table>
</div>
`;

export let folderController = function FolderController(AppConfig, folder, messages) {
  this.folder = folder;
  this.messages = messages;
  this.AppConfig = AppConfig;
};
