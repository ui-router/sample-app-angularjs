var foldersTemplate = `
<div>

  <div class="folderlist col-sm-3">

    <ul class="list-unstyled">
      <li class="folder" ui-sref-active="selected active" ng-repeat="folder in messages.folders" >
        <a ui-sref=".folder({folderId: folder})"><i class="fa"></i> {{folder}}</a>
      </li>
    </ul>

  </div>

  <div class="messagelist col-sm-9" ui-view="messagelist">
    Choose a folder...
  </div>
</div>
<div ui-view="messagecontent"></div>
`;

function FoldersController(folders) {
  this.folders = folders;
}

let messagesState = {
  parent: "app",
  name: "messages",
  url: "/messages",
  resolve: {
    folders: (Messages) => Messages.folders()
  },
  template: foldersTemplate,
  controller: FoldersController,
  controllerAs: "messages"
};

export {messagesState}