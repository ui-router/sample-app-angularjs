let moduleName = "ui.router.demo.statesel";
export default moduleName;
let app = angular.module(moduleName, ['ui.router']);

app.directive("stateSelector", function() {
  return {
    restrict: "E",
    template: '  <select ng-model="ctrl.currentstate" ng-change="ctrl.$state.go(ctrl.currentstate);" ' +
    '    ng-options="state as state.name for state in ctrl.$state.get()">' +
    '     <option value="">Choose a state</option>' +
    '  </select>',
    controller: function($scope, $state) {
      var ctrl: any = this;
      ctrl.$state = $state;
      ctrl.currentstate = $state.current;
      $scope.$on("$stateChangeSuccess", function(evt, to) {
        ctrl.currentstate = $state.current
      });
    },
    controllerAs: "ctrl"
  }
});