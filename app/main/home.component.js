// This is a home component for authenticated users.
// It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
export const home = {
  template: `
    <div class="home buttons">
      <button ui-sref="mymessages" class="btn btn-primary">
        <h1><i class="fa fa-envelope"></i></h1>
        <h1>Messages</h1>
      </button>

      <button ui-sref="contacts" class="btn btn-primary">
      <h1><i class="fa fa-users"></i></h1>
      <h1>Contacts</h1>
      </button>

      <button ui-sref="prefs" class="btn btn-primary">
        <h1><i class="fa fa-cogs"></i></h1>
        <h1>Preferences</h1>
      </button>
    </div>
`};
