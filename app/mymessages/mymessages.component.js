/**
 * The main mymessages component.
 *
 * Renders a list of folders, and has two viewports:
 * - messageList: filled with the list of messages for a folder
 * - messagecontent: filled with the contents of a single message.
 */
export const mymessages = {
  bindings: {folders: '<'},

  template: `
    <div class="my-messages">
    
      <!-- Show message folders -->
      <folder-list folders="$ctrl.folders"></folder-list>
    
      <!-- A named view for the list of messages in this folder.  This will be  filled in by the 'mymessages.messagelist' child state -->
      <div ui-view="messagelist" class="messagelist"> </div>
    
    </div>
    
    <!-- A named ui-view for a message's contents.  The 'mymessages.messagelist.message' grandchild state plugs into this ui-view -->
    <div ui-view="messagecontent"></div>
`};
