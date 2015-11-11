let composeTemplate = `
<div class="compose">
  <div class="header">
    <div class="flex-h"> <label>Recipient</label><input type="text" id="to" name="to" ng-model="vm.message.to"> </div>
    <div class="flex-h"> <label>Subject</label><input type="text" id="subject" name="subject" ng-model="vm.message.subject"> </div>
  </div>

  <div class="body">
    <textarea name="body" id="body" ng-model="vm.message.body" cols="30" rows="20"></textarea>
    <div class="buttons">
      <button ng-click="vm.goPrevious()"><i class="fa fa-times-circle-o"></i>Cancel</button>
      <button ng-click="vm.send(vm.message)"><i class="fa fa-paper-plane-o"></i>Send</button>
    </div>
  </div>
</div>
`;

function ComposeController($stateParams, $state, $transition$, Messages) {
  let hasPrevious = !!$transition$.from().name;

  this.goPrevious = function() {
    let state = hasPrevious ? $transition$.from() : "mymessages";
    let params = hasPrevious ? $transition$.params("from") : {};
    $state.go(state, params);
  };

  this.message = {
    to: $stateParams.to,
    subject: $stateParams.subject,
    body: $stateParams.body
  };

  this.send = (message) => Messages._post(angular.extend(message, { tag: 'sent'})).then(this.goPrevious)
}

let composeState = {
  name: 'mymessages.compose',
  url: '/compose',
  params: {
    to: "",
    subject: "",
    body: ""
  },
  onEnter: ($transition$) => ({$transition$: () => $transition$ }),
  controller: ComposeController,
  controllerAs: 'vm',
  views: {
    "!$default": {
      template: composeTemplate
    }
  }
};

export {composeState};