let template = `
<div class="compose">
  <div class="header">
    <div class="flex-h"> <label>Recipient</label> <input type="text" id="to" name="to" ng-model="vm.message.to"> </div>
    <div class="flex-h"> <label>Subject</label> <input type="text" id="subject" name="subject" ng-model="vm.message.subject"> </div>
  </div>

  <div class="body">
    <textarea name="body" id="body" ng-model="vm.message.body" cols="30" rows="20"></textarea>
    <div class="buttons">
      <button ng-click="vm.goPrevious()"><i class="fa fa-times-circle-o"></i>Cancel</button>
      <button ng-click="vm.save(vm.message)"><i class="fa fa-save"></i>Save as Draft</button>
      <button ng-click="vm.send(vm.message)"><i class="fa fa-paper-plane-o"></i>Send</button>
    </div>
  </div>
</div>
`;

function ComposeController(AppConfig, $stateParams, $state, $transition$, Messages) {
  this.goPrevious = function() {
    let hasPrevious = !!$transition$.from().name;
    let state = hasPrevious ? $transition$.from() : "mymessages.folder";
    let params = hasPrevious ? $transition$.params("from") : {};
    $state.go(state, params);
  };

  this.message = angular.extend({ from: AppConfig.emailAddress }, $stateParams.message);
  this.message.from = AppConfig.emailAddress;

  this.send = (message) =>
      Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'sent' })).then(this.goPrevious);
  this.save = (message) =>
      Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'drafts' })).then(this.goPrevious);
}

let composeState = {
  name: 'mymessages.compose',
  url: '/compose',
  params: {
    message: {}
  },
  onEnter: ($transition$) => ({$transition$: () => $transition$ }),
  controller: ComposeController,
  controllerAs: 'vm',
  views: {
    "!$default": {
      template: template
    }
  }
};

export {composeState};