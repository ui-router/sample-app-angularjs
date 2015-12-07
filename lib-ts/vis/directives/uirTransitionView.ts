import angular from "angular";
import {app} from "../statevis.module.ts";


///////////////////////////////////////////////////////////
// These two directives make up the Transition Visualizer
///////////////////////////////////////////////////////////


/**
 * This outer directive manages the list of all transitions (history), and provides a fixed, scrolling viewport.
 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
 */
app.directive('uirTransitionsView', ($transitions, $timeout, d3ng, easing) => {
  return {
    restrict: "E",

    controller: function ($scope, $element) {
      const later = (fn, delay) => () => $timeout(fn, delay);
      function setMessage($transition$, message) {
        $transition$._message = message;
      }

      $scope.transitions = [];
      $scope.toggles = { showDetail: false };

      $transitions.onBefore({}, ($transition$) => {
        $scope.transitions.push($transition$);
        const statename = (state) => state.name || "(root)";
        $transition$.onStart({}, () => setMessage($transition$, "Starting..."), { priority: -1 });
        $transition$.onExit({}, ($state$) => setMessage($transition$, `Exiting ${statename($state$)}`), { priority: -1 });
        $transition$.onRetain({}, ($state$) => setMessage($transition$, `Retained ${statename($state$)}`), { priority: -1 });
        $transition$.onEnter({}, ($state$) => setMessage($transition$, `Entering ${statename($state$)}`), { priority: -1 });
        $transition$.onFinish({}, () => setMessage($transition$, `Finishing...`));
        $transition$.promise.then(() => delete $transition$._message);
      });

      let cancelPreviousAnim, duration = 150, el = $element[0].children[0].children[0];
      let scrollToRight = () => {
        let targetScrollX = el.scrollWidth - el.clientWidth;
        cancelPreviousAnim && cancelPreviousAnim();
        let newVal = [targetScrollX], oldVal = [el.scrollLeft];
        let callback = (vals) => el.scrollLeft = vals[0];
        cancelPreviousAnim = d3ng.animatePath(newVal, oldVal, duration, callback, easing.easeInOutCubic);
      };

      $scope.$watchCollection("transitions", later(scrollToRight, 0));
    },

    template: `
      <div >
        <div class="transitionHistory" ng-mouseover="toggles.showDetail = true" ng-mouseout="toggles.showDetail = false">
          <uir-transition-view transition="transition" toggles="toggles" ng-repeat="transition in transitions track by transition.$id"></uir-transition-view>
        </div>
      </div>
    `
  }
});

/** This directive visualizes a single transition object. It changes visualization as the transition runs. */
app.directive('uirTransitionView', () => {
  return {
    restrict: "E",
    require: ['^uirTransitionsView', 'uirTransitionDetail'],

    scope: {
      trans: '=transition',
      toggles: '='
    },

    bindToController: true,
    controllerAs: "vm",
    controller: function ($scope) {
      let iconClasses = {
        running: 'fa fa-spin fa-spinner',
        success: 'fa fa-check',
        redirected: 'fa fa-share',
        ignored: 'fa fa-circle-o',
        error: 'fa fa-close'
      };

      this.iconClass = () => iconClasses[this.status];

      this.status = "running";
      this.tc = this.trans.treeChanges();

      const paramsForNode = node => Object.keys(node.values).map(key => ({state: node.state.name, key: key, value: node.values[key]}));
      this.params = this.trans.treeChanges().to
          .map(paramsForNode)
          .reduce((memo, array) => memo.concat(array), [])
          .filter(param => param.key !== '#' || !!param.value);

      const success = () => this.status = "success";
      const reject = (rejection) => {
        if (rejection.type == 2) this.status = "redirected";
        if (rejection.type == 5) this.status = "ignored";
        this.rejection = rejection;
      };

      this.trans.promise.then(success, reject);
    },

    template: `
        <div ng-show="vm.toggles.showDetail" class="transitionDetail">
          <!--<div class="panel-default">-->
            <!--<div class="panel-heading">States</div>-->
            <!--<div class="header"> <strong>From:</strong> <div>{{vm.trans.from().name || '(root)'}}</div> </div>-->
            <!--<div class="header"> <strong>To:</strong> <div>{{vm.trans.to().name}}</div> </div>-->
          <!--</div>-->

          <div class="panel-default">
            <div class="panel-heading">Param Values</div>
            <div ng-repeat="param in vm.params">
              <div class="header">
                <strong>{{param.key}}</strong> <div class="stateName">({{param.state}})</div>
              </div>
              {{param.value}}
            </div>
          </div>
        </div>

        <div class="historyEntry" ng-class="vm.status" style="cursor: pointer">
          <div class="summary">
            <div class="transid">{{vm.trans.$id}}</div>
            <div class="status">{{vm.status}}<span ng-show="vm.trans._message">: {{vm.trans._message}}</span> </div>
            <div class="transname">
              <i ng-class="vm.iconClass()"></i>
              {{vm.trans.to().name}}
              </div>
          </div>
        </div>
    `
  }
});
