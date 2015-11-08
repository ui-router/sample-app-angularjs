let folderTemplate = `
<div class="messages" st-table="messages" st-safe-src="folder.messages">
  <table class="table table-condensed table-bordered">
    <thead>
      <tr>
        <td width="5%"></td>
        <td st-delay="0" st-sort="senderEmail"   width="30%">From</td>
        <td st-delay="0" st-sort="subject"       width="40%">Subject</td>
        <td st-delay="0" st-sort="date"          width="15%">Date</td>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="message in messages" ui-sref=".message({messageId: message._id})" ui-sref-active="active">
        <td><i class="fa fa-circle" ng-show="!message.read"></i></td>
        <td class="ellipsis">{{message.senderEmail}}</td>
        <td class="ellipsis">{{message.subject}}</td>
        <td>{{message.date | date: 'short'}}</td>
      </tr>
    </tbody>
  </table>
</div>
`;

function FolderController(messages) {
  this.messages = messages;
}

let folderState = {
  name: 'mymessages.folder',
  url: '/:folderId',
  params: {folderId: "inbox"},
  resolve: {
    messages: (Messages, $stateParams) => Messages.byFolder($stateParams.folderId)
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