import angular from "angular";
import {app} from "../statevis.module.ts";

app.directive('uirTransitionView', ($transitions) => {
  return {
    restrict: "E",
    controller: ($scope) => {
      $scope.transitions = {};
      $scope.tc = {};

      $transitions.onStart({}, ($transition$) => {
        $scope.transitions[$transition$.$id] = $transition$;
        $scope.tc[$transition$.$id] = $transition$.treeChanges();
      })
    },
    template: `
      <div ng-repeat="trans in transitions">
        <div ng-repeat="node in tc[trans.$id].retained">ret: {{node.state.name}}</div>
        <div ng-repeat="node in tc[trans.$id].entering">ent: {{node.state.name}}</div>
        <div ng-repeat="node in tc[trans.$id].exiting">ext: {{node.state.name}}</div>
      </div>
    `
  }
});
