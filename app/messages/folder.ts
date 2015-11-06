import {Message, MessagesSvc} from "./messages_iface";

let folderTemplate = `
<div class="message_list" st-table="page" st-safe-src="folder.messages">
  <table>
    <thead>
      <tr>
        <td                         width="5%">Read</td>
        <td st-sort="tag"           width="10%">Tag</td>
        <td st-sort="senderAddress" width="30%">From</td>
        <td st-sort="date"          width="15%">Date</td>
        <td st-sort="subject"       width="40%">Subject</td>
      </tr>
    </thead>
  </table>
</div>
`;

let messages = (MessagesService: MessagesSvc, $stateParams) => MessagesService.byFolder($stateParams.folderId);

class FolderController {
  constructor(public messages: Message[]) {
  }
}

let folderState = {
  name: 'messages.folder',
  url: '/:folderId',
  params: { folderId: "inbox" },
  resolve: { messages },
  template: folderTemplate,
  controller: FolderController,
  controllerAs: 'folder'
};

export {folderState};