let folderTemplate = `

<div class="messages">
  <table>
    <thead>
      <tr>
        <td></td>
        <td sort-messages="recipientEmail">To</td>
        <td sort-messages="senderEmail">From</td>
        <td sort-messages="subject">Subject</td>
        <td sort-messages="date">Date</td>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="message in folder.messages | orderBy: folder.AppConfig.sort track by message._id" ui-sref=".message({messageId: message._id})" ui-sref-active="active">
        <td><i class="fa fa-circle" ng-show="!message.read"></i></td>
        <td class="ellipsis">{{message.recipientEmail}}</td>
        <td class="ellipsis">{{message.senderEmail}}</td>
        <td class="ellipsis">{{message.subject}}</td>
        <td>{{message.date | date: 'yyyy-MM-dd'}}</td>
      </tr>
    </tbody>
  </table>
</div>
`;

function FolderController(AppConfig, messages, tag) {
  this.messages = messages;
  this.tag = tag;
  this.AppConfig = AppConfig;
}

let folderState = {
  name: 'mymessages.folder',
  url: '/:folderId',
  params: {folderId: "inbox"},
  resolve: {
    tag: ($stateParams) => $stateParams.folderId,
    messages: (Messages, tag) => Messages.byFolder(tag),
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
      template: folderTemplate,
      controller: FolderController,
      controllerAs: 'folder'
    }
  }
};

export {folderState};