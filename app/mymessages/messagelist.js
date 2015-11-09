let folderTemplate = `

<div class="messages" st-table="messages" st-safe-src="folder.messages">
  <table>
    <thead>
      <tr>
        <td></td>
        <td st-delay="0" st-sort="senderEmail">From</td>
        <td st-delay="0" st-sort="subject"    >Subject</td>
        <td st-delay="0" st-sort="date"       >Date</td>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="message in messages" ui-sref=".message({messageId: message._id})" ui-sref-active="active">
        <td><i class="fa fa-circle" ng-show="!message.read"></i></td>
        <td class="ellipsis">{{message.senderEmail}}</td>
        <td class="ellipsis">{{message.subject}}</td>
        <td>{{message.date | date: 'yyyy-MM-dd'}}</td>
      </tr>
    </tbody>
  </table>
</div>
`;

function FolderController(messages, tag) {
  this.messages = messages;
  this.tag = tag;
}

let folderState = {
  name: 'mymessages.folder',
  url: '/:folderId',
  params: {folderId: "inbox"},
  resolve: {
    tag: ($stateParams) => $stateParams.folderId,
    messages: (Messages, tag) => Messages.byFolder(tag)
  },
  views: {
    "messagelist": {
      template: folderTemplate,
      controller: FolderController,
      controllerAs: 'folder'
    }
  }
};

export {folderState};