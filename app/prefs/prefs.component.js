export let prefsTemplate = `
<div>
  <button class="btn btn-primary" ng-click="vm.reset()"><i class="fa fa-recycle"></i> <span>Reset All Data</span></button>
</div>

<div>
  <label for="restDelay">Simulated REST API delay (ms)</label>
  <input type="text" name="restDelay" ng-model="vm.prefs.restDelay">
  <button class="btn btn-primary" ng-click="vm.savePrefs()">Save</button>
</div>
`;

export let prefsController = function PrefsController(AppConfig) {
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
};
