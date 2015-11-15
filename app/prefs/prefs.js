let template = `
<div>
  <button ui-sref="^">Back</button>
  <button ng-click="vm.reset()">Reset Data</button>
</div>
`;

function PrefsController($state) {
  this.reset = () => {
    sessionStorage.clear();
    $state.reload();
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