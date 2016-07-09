/**
 * This component renders a list of messages using the `messageTable` component
 */
export const messageList = {
  bindings: { folder: '<', messages: '<' },
  template: `
    <div class="messages">
      <message-table columns="$ctrl.folder.columns" messages="$ctrl.messages"></message-table>
    </div>
`};