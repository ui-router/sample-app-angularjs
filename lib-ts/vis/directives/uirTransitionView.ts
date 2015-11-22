import angular from "angular";
import {app} from "../statevis.module.ts";

app.directive('uirTransitionsView', ($transitions, $timeout, d3ng, easing) => {
  return {
    restrict: "E",

    controller: ($scope, $element) => {
      $scope.transitions = {};
      $scope.tc = {};

      const later = (fn, delay) => () => $timeout(fn, delay);

      $transitions.onBefore({}, ($transition$) => {
        $scope.transitions[$transition$.$id] = $transition$;
        $scope.tc[$transition$.$id] = $transition$.treeChanges();
        $transition$.onStart({}, later(() => null, 300));  // all these are not working, why?
        $transition$.onEnter({}, later(() => null, 300));
        $transition$.onRetain({}, later(() => null, 300));
        $transition$.onExit({}, later(() => null, 300));
        $transition$.onSuccess({}, later(() => null, 300));
      });

      let cancelPrevious, duration = 300, el = $element.children()[0];
      let scrollToRight = () => {
        let targetScrollX = el.scrollWidth - el.clientWidth;
        cancelPrevious && cancelPrevious();
        let newVal = [targetScrollX], oldVal = [el.scrollLeft];
        let callback = (vals) => el.scrollLeft = vals[0];
        cancelPrevious = d3ng.animatePath(newVal, oldVal, duration, callback, easing.easeInOutCubic);
      };

      $scope.$watchCollection("transitions", later(scrollToRight, 0))
    },

    template: `
      <div class="transitionHistory">
        <uir-transition-view class="historyEntry" transition="transition" ng-repeat="transition in transitions"></uir-transition-view>
      </div>
    `
  }
});

app.directive('uirTransitionView', ($transitions) => {
  return {
    restrict: "E",

    scope: {
      trans: '=transition'
    },
    controller: ($scope) => {
      $scope.trans.onStart({}, () => console.log("onstart"));
      $scope.trans.onSuccess({}, () => console.log("onsuccess"));
      $scope.tc = $scope.trans.treeChanges();

      let views = ['summary', 'detail', 'tree'];
      $scope.currentview = 'summary';
      $scope.cycleView = () => $scope.currentview = views[(views.indexOf($scope.currentview) + 1) % views.length];

      $scope.shortParamString = (params) =>
          Object.keys(params || {})
              .map(key => ({ key: key, val: params[key]}))
              .filter(pair => pair.val != null)
              .map(pair => `${pair.key}`)
              .join(", ");

      $scope.paramString = (params) =>
          Object.keys(params || {})
              .map(key => ({ key: key, val: params[key]}))
              .filter(pair => pair.val != null)
              .map(pair => `${pair.key}: ${pair.val}`)
              .join(", ");

      $scope.paramCount = (params) => Object.keys(params || {}).length;
    },


    template: `
        <div ng-click="cycleView()" style="cursor: pointer">
          <div ng-show="currentview == 'summary'" class="summary">
              #{{trans.$id}}: {{trans.to().name}}
          </div>

          <div ng-show="currentview == 'detail'" class="detail">
            <table>
              <tr><td>Trans</td><td>#{{trans.$id}}</td></tr>
              <tr><td>From State:</td><td>{{trans.from().name}}</td></tr>
              <tr><td>From Params:</td><td>{{paramString(trans.params("from"))}}</td></tr>
              <tr><td>To State:</td><td>{{trans.to().name}}</td></tr>
              <tr><td>To Params:</td><td>{{paramString(trans.params("to"))}}</td></tr>
            </table>
          </div>

          <div ng-show="currentview == 'tree'" class="tree">
          <h1>asdf</h1>
            <div class="node retained" ng-repeat="node in ctrl.tc.retained">ret: {{node.state.name}}</div>

            <div style="display: flex; flex-flow: ">
              <div>
                <uir-node-view class="node entering" ng-repeat="node in ctrl.tc.entering">ent: {{node.state.name}}</uir-node-view>
              </div>

              <div>
                <uir-node-view class="node exiting" ng-repeat="node in ctrl.tc.exiting">ext: {{node.state.name}}</uir-node-view>
              </div>
            </div>
          </div>
        </div>

    `
  }
});
