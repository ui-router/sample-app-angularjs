import "./directives/messageTable";

export let folderTemplate = `
<div class="messages">
  <message-table columns="$ctrl.folder.columns" messages="$ctrl.messages"></message-table>
</div>
`;

export let folderController = function FolderController(AppConfig, folder, messages) {
  this.folder = folder;
  this.messages = messages;
  this.AppConfig = AppConfig;
};
