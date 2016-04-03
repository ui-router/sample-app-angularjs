import {ngmodule} from "../bootstrap/ngmodule";
import "./directives/messageTable.component";

export const messageListComponent = "messageList";

const messageListTemplate = `
<div class="messages">
  <message-table columns="$ctrl.folder.columns" messages="$ctrl.messages"></message-table>
</div>
`;

ngmodule.component(messageListComponent, {
  bindings: { folder: '<', messages: '<' },
  template: messageListTemplate
});