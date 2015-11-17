let template = `
<div>
  <button class="btn btn-primary" ui-sref="^">Back</button>
  <button class="btn btn-primary" ng-click="vm.reset()">Reset Data</button>
</div>
`;

function PrefsController($document) {
  this.reset = () => {
    sessionStorage.clear();
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