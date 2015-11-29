let template = `
<div>
  <button class="btn btn-primary" ui-sref="^"><i class="fa fa-arrow-left"></i> Back</button>
</div>
<div>
  <button class="btn btn-primary" ng-click="vm.reset()"><i class="fa fa-recycle"></i> Reset Data</button>
</div>
<div>
<label for="restDelay">Simulated REST API delay (ms)</label>
  <input type="text" name="restDelay" ng-model="vm.prefs.restDelay">
  <button class="btn btn-primary" ng-click="vm.savePrefs()">Save</button>
</div>
`;

function PrefsController($document, AppConfig) {
  this.prefs = {
    restDelay: AppConfig.restDelay
  };
  this.reset = () => {
    sessionStorage.clear();
    document.location.reload(true);
  };
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
  controllerAs: 'vm'
};