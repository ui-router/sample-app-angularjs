import angular from "angular";
import {app} from "../statevis.module.ts";

app.directive('uirTransitionsView', ($transitions, $timeout, d3ng, easing) => {
  return {
    restrict: "E",

    controller: function ($scope, $element) {
      $scope.transitions = [];

      $transitions.onBefore({}, ($transition$) => {
        $scope.transitions.push($transition$);
        //$transition$.onStart({}, later(() => null, 300));  // all these are not working, why?
        //$transition$.onEnter({}, later(() => null, 300));
        //$transition$.onRetain({}, later(() => null, 300));
        //$transition$.onExit({}, later(() => null, 300));
        //$transition$.onSuccess({}, later(() => null, 300));
      });

      let cancelPrevious, duration = 150, el = $element.children()[0].children[1];
      let scrollToRight = () => {
        let targetScrollX = el.scrollWidth - el.clientWidth;
        cancelPrevious && cancelPrevious();
        let newVal = [targetScrollX], oldVal = [el.scrollLeft];
        let callback = (vals) => el.scrollLeft = vals[0];
        cancelPrevious = d3ng.animatePath(newVal, oldVal, duration, callback, easing.easeInOutCubic);
      };

      const later = (fn, delay) => () => $timeout(fn, delay);
      $scope.$watchCollection("transitions", later(scrollToRight, 0));

      let uirTransitionDetail = undefined;
      this.register = (controller) => { uirTransitionDetail = controller; };
      this.showDetails = (transition, element) => { uirTransitionDetail.show(transition, element); };
      this.hideDetails = () => { uirTransitionDetail.hide(); };
    },

    template: `
      <div>
        <uir-transition-detail transition="detail"><h1>asdfASDJFAS JDfkla sjdlfkja sdlkj</h1></uir-transition-detail>
        <div class="transitionHistory">
          <uir-transition-view transition="transition" ng-repeat="transition in transitions track by transition.$id"></uir-transition-view>
        </div>
      </div>
    `
  }
});

app.directive('uirTransitionView', () => {
  return {
    restrict: "E",
    require: '^uirTransitionsView',

    scope: {
      trans: '=transition'
    },
    controller: function ($scope) {
      let iconClasses = {
        running: 'fa fa-spin fa-spinner',
        success: 'fa fa-check',
        error: 'fa fa-close'
      };
      $scope.iconClass = () => iconClasses[$scope.status];

      $scope.status = "running";
      $scope.trans.promise.then(() => $scope.status = "success", () => $scope.status = "error");

      $scope.tc = $scope.trans.treeChanges();

      let views = ['summary', 'detail', 'tree'];
      $scope.currentview = 'summary';
      $scope.cycleView = () => $scope.currentview = views[(views.indexOf($scope.currentview) + 1) % views.length];

      $scope.paramCount = (params) => Object.keys(params || {}).length;
    },

    link: (scope, elem, attrs, uirTransitionsView) => {
      elem.on("mouseover", (evt) => uirTransitionsView.showDetails(scope.trans, elem));
      elem.on("mouseout", (evt) => uirTransitionsView.hideDetails());
    },

    template: `
        <div class="historyEntry" ng-class="status" ng-click="cycleView()" style="cursor: pointer">

          <div class="summary">
              <div class="transid">{{trans.$id}}</div>
              <div class="transname">
                <i ng-class="iconClass()"></i>
                {{trans.to().name}}
                </div>
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


app.directive('uirTransitionDetail', () => ({
  require: ['^uirTransitionsView', 'uirTransitionDetail'],
  template: `
  <div ng-show="!!vm.transition" class="transitionDetail">
    <table class="table table-condensed table-striped">
      <thead>
        <tr><th>Param</th><th>Value</th></tr>
      </thead>

      <tr ng-repeat="(key, val) in vm.params()"><td>{{ key }}</td><td>{{ val }}</td></tr>
    </table>
  </div>
  `,
  link: (scope, elem, attrs, [uirTransitionsView, uirTransitionDetail]) => {
    uirTransitionsView.register(uirTransitionDetail);
  },
  controllerAs: "vm",
  bindToController: "true",
  controller: function($element, $timeout) {
    let detailEl = angular.element($element[0].children[0]);

    this.params = () => {
      let keyvals = angular.extend({}, this.transition && this.transition.params('to'));
      if (keyvals['#'] === null) delete keyvals['#'];
      return keyvals;
    };

    this.show = (transition, element) => {
      let rect = element[0].getBoundingClientRect();
      this.transition = transition;
      detailEl.css('left', rect.left);
    };

    this.hide = () => {
      this.transition = undefined;
    };

  }
}));