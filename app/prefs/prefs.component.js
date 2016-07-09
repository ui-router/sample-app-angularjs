/**
 * The controller for the prefs component.
 */
class PrefsController {
  constructor(AppConfig) {
    this.AppConfig = AppConfig
  }

  $onInit() {
    this.prefs = {
      restDelay: this.AppConfig.restDelay
    }
  }

  /** Clear out the session storage */
  reset() {
    sessionStorage.clear();
    document.location.reload(true);
  }

  /** After saving preferences to session storage, reload the entire application */
  savePrefs() {
    angular.extend(this.AppConfig, { restDelay: this.prefs.restDelay }).save();
    document.location.reload(true);
  }
}

/**
 * A component which shows and updates app preferences
 */
export const prefs = {
  controller: PrefsController,

  template: `
    <div>
      <button class="btn btn-primary" ng-click="$ctrl.reset()"><i class="fa fa-recycle"></i> <span>Reset All Data</span></button>
    </div>
    
    <div>
      <label for="restDelay">Simulated REST API delay (ms)</label>
      <input type="text" name="restDelay" ng-model="$ctrl.prefs.restDelay">
      <button class="btn btn-primary" ng-click="$ctrl.savePrefs()">Save</button>
    </div>
`};