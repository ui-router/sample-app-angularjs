/**
 * This state allows the user to set their application preferences
 */
let template = `
<div>
  <button class="btn btn-primary" ng-click="vm.reset()"><i class="fa fa-recycle"></i> <span>Reset All Data</span></button>
</div>

<div>
  <label for="restDelay">Simulated REST API delay (ms)</label>
  <input type="text" name="restDelay" ng-model="vm.prefs.restDelay">
  <button class="btn btn-primary" ng-click="vm.savePrefs()">Save</button>
</div>
`;

function PrefsController(AppConfig) {
  this.prefs = {
    restDelay: AppConfig.restDelay
  };
  /** Clear out the session storage */
  this.reset = () => {
    sessionStorage.clear();
    document.location.reload(true);
  };
  /** After saving preferences to session storage, reload the entire application */
  this.savePrefs = () => {
    angular.extend(AppConfig, { restDelay: this.prefs.restDelay }).save();
    document.location.reload(true);
  }
}

export let prefsState = {
  parent: 'app',
  name: 'prefs',
  template: template,
  url: '/prefs',
  controller: PrefsController,
  controllerAs: 'vm',
  // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
  data: { requiresAuth: true }
};