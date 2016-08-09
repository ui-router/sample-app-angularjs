/**
 * Renders a list of folders
 */
export const folderList = {
  bindings: {folders: '<'},

  template: `
    <!-- Renders a list of folders -->
    <div class="folderlist">
      <ul class="selectlist list-unstyled">
  
        <!-- Highlight the selected folder:
            When the current state matches the ui-sref's state (and its parameters)
            ui-sref-active applies the 'selected' class to the li element -->
        <li class="folder" ui-sref-active="selected" ng-repeat="folder in $ctrl.folders" >
          <!-- This ui-sref is a relative link to the 'mymessages.messagelist' substate. It provides the
              'folderId' parameter value from the current folder's .id property -->
          <a ui-sref=".messagelist({folderId: folder._id})"><i class="fa"></i>{{folder._id}}</a>
        </li>
      </ul>
    </div>
`};
