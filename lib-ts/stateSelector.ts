import angular from "angular";

let moduleName = "ui.router.demo.statesel";
export default moduleName;
let app = angular.module(moduleName, ['ui.router']);
+
app.directive("stateSelector", function() {
  return {
    restrict: "E",

    template: '  <select ng-model="sel.currentstate" ng-change="sel.go(sel.currentstate);" ' +
    '    ng-options="state as state.name for state in sel.$state.get()">' +
    '     <option value="">Choose a state</option>' +
    '  </select>',

    controller: function($scope, $state, $injector) {
      this.$state = $state;
      this.go = (state) =>
          $state.go(state);

      let updateCurrentState = () => this.currentstate = $state.current;

      let $transitions = $injector.get("$transitions");
      if ($transitions) {
        $transitions.onBefore({}, $transition$ => { $transition$.promise.finally(updateCurrentState); });
      } else {
        $scope.$on("$stateChangeSuccess", updateCurrentState);
        $scope.$on("$stateChangeError", updateCurrentState);
      }
    },
    controllerAs: "sel"
  }
});