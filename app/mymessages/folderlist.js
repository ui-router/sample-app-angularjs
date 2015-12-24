var template = `
<div class="my-messages">

  <div class="folderlist">
    <ul class="selectlist list-unstyled">
      <li class="folder" ui-sref-active="selected" ng-repeat="folder in vm.folders" >
        <a ui-sref=".folder({folderId: folder._id})"><i class="fa"></i>{{folder._id}}</a>
      </li>
    </ul>
  </div>

  <div ui-view="messagelist" class="messagelist"> </div>

</div>

<div ui-view="messagecontent"></div>
<div ui-view="compose"></div>
`;

function FoldersController(folders) {
  this.folders = folders;
}

let messagesState = {
  parent: 'authRequired',
  name: "mymessages",
  url: "/mymessages",
  resolve: {
    folders: (Folders) => Folders.all()
  },
  redirectTo: 'mymessages.folder',
  template: template,
  controller: FoldersController,
  controllerAs: "vm"
};

export {messagesState}