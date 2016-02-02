/**
 * The mymessages state. This is the main state for the mymessages submodule.
 *
 * This state shows the list of folders for the current user. It retrieves the folders from the
 * Folders service.  If a user navigates directly to this state, the state redirects to the 'mymessages.folder'.
 *
 */
let template = `
<div class="my-messages">

  <!-- Renders a list of folders -->
  <div class="folderlist">
    <ul class="selectlist list-unstyled">

      <!-- Highlight the selected folder:
          When the current state matches the ui-sref's state (and its parameters)
          ui-sref-active applies the 'selected' class to the li element -->
      <li class="folder" ui-sref-active="selected" ng-repeat="folder in vm.folders" >
        <!-- This ui-sref is a relative link to the 'mymessages.folder' substate. It provides the
            'folderId' parameter value from the current folder's .id property -->
        <a ui-sref=".folder({folderId: folder._id})"><i class="fa"></i>{{folder._id}}</a>
      </li>
    </ul>
  </div>

  <!-- A named view for the list of messages in this folder.  This will be  filled in by the 'mymessages.folder' child state -->
  <div ui-view="messagelist" class="messagelist"> </div>

</div>

<!-- A named ui-view for a message's contents.  The 'mymessages.folder.message' grandchild state plugs into this ui-view -->
<div ui-view="messagecontent"></div>
`;

function FoldersController(folders) {
  this.folders = folders;
}

let mymessagesState = {
  parent: 'app',
  name: "mymessages",
  url: "/mymessages",
  resolve: {
    // All the folders are fetched from the Folders service
    folders: (Folders) => Folders.all()
  },
  // If mymessages state is directly activated, redirect the transition to the child state 'mymessages.folder'
  redirectTo: 'mymessages.folder',
  template: template,
  controller: FoldersController,
  controllerAs: "vm",
  // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
  data: { requiresAuth: true }
};

export {mymessagesState}