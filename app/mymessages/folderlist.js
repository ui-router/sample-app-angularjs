var myMessagesTemplate = `
<div class="my-messages">

  <div class="folderlist">
    <ul class="list-unstyled">
      <li class="folder" ui-sref-active="selected active" ng-repeat="folder in messages.folders" >
        <a ui-sref=".folder({folderId: folder})"><i class="fa"></i> {{folder}}</a>
      </li>
    </ul>
  </div>

  <div ui-view="messagelist" class="messagelist"> </div>

</div>

<div ui-view="messagecontent"></div>
`;

function FoldersController(folders) {
  this.folders = folders;
}

let messagesState = {
  parent: "app",
  name: "mymessages",
  url: "/mymessages",
  redirectTo: 'mymessages.folder',
  resolve: {
    folders: (Messages) => Messages.folders()
  },
  template: myMessagesTemplate,
  controller: FoldersController,
  controllerAs: "messages"
};

export {messagesState}