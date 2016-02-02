import "./directives/messageTable";

export let template = `
<div class="messages">
  <message-table columns="vm.folder.columns" messages="vm.messages"></message-table>
</div>
`;

export let controller = function FolderController(AppConfig, folder, messages) {
  this.folder = folder;
  this.messages = messages;
  this.AppConfig = AppConfig;
};
