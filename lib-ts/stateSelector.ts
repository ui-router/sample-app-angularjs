import angular from "angular";

let moduleName = "ui.router.demo.statesel";
export default moduleName;
let app = angular.module(moduleName, ['ui.router']);

app.directive("stateSelector", function() {
  return {
    restrict: "E",
    template: '  <select ng-model="sel.currentstate" ng-change="sel.$state.go(sel.currentstate);" ' +
    '    ng-options="state as state.name for state in sel.$state.get()">' +
    '     <option value="">Choose a state</option>' +
    '  </select>',
    controller: function($scope, $state, $injector) {
      let $transitions = $injector.get("$transitions");
      this.$state = $state;
      this.currentstate = $state.current;
      if ($transitions)
        $transitions.onSuccess({}, ($transition$) => {this.currentstate = $transition$.to(); return; });
      else
        $scope.$on("$stateChangeSuccess", (evt, to) => this.currentstate = $state.current);
    },
    controllerAs: "sel"
  }
});