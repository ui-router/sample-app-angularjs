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
      $scope.toggles = [];

      $transitions.onBefore({}, ($transition$) => {
        $scope.transitions.push($transition$);
        $scope.toggles.push({ expand: false, showDetail: false });
        const statename = (state) => state.name || "(root)";
        $transition$.onStart({}, () => setMessage($transition$, "Starting..."), { priority: -1 });
        $transition$.onExit({}, ($state$) => setMessage($transition$, `Exiting ${statename($state$)}`), { priority: -1 });
        $transition$.onRetain({}, ($state$) => setMessage($transition$, `Retained ${statename($state$)}`), { priority: -1 });
        $transition$.onEnter({}, ($state$) => setMessage($transition$, `Entering ${statename($state$)}`), { priority: -1 });
        $transition$.onFinish({}, () => setMessage($transition$, `Finishing...`));
        $transition$.promise.then(() => delete $transition$._message);
      });

      this.fullScreen = function(toggle) {
        $element.toggleClass("fullscreen", toggle);
      };

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
      <div>
        <div class="transitionHistory">
          <uir-transition-view transition="transition" toggles="toggles[$index]" ng-repeat="transition in transitions track by transition.$id"></uir-transition-view>
          <div style="min-width: 18em; border: 1px solid transparent;"></div>
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
      let tc = this.tc = this.trans.treeChanges();

      this.paths = tc.retained
          .filter(node => node.state.name)
          .map(node => ({to: node, toType: 'retain', from: node, fromType: 'retain'}));
      let count = Math.max(tc.exiting.length, tc.entering.length);
      for (let i = 0; i < count; i++) {
        this.paths.push({to: tc.entering[i], toType: tc.entering[i] && 'enter', from: tc.exiting[i], fromType: tc.exiting[i] && 'exit'});
      }

      const paramsForNode = node => Object.keys(node.values).map(key => ({state: node.state.name, key: key, value: node.values[key]}));
      this.params = this.trans.treeChanges().to
          .map(paramsForNode)
          .reduce((memo, array) => memo.concat(array), [])
          .filter(param => param.key !== '#' || !!param.value);

      const success = () => this.status = "success";
      const reject = (rejection) => {
        this.status = "error";
        this.rejection = rejection && rejection.message;
        if (rejection.type == 2) {
          this.status = "redirected";
          //this.rejection = rejection.detail;
          let toState = rejection.detail.to().name;
          let toParams = JSON.stringify(rejection.detail.params("to"));
          this.rejection = truncateTo(100, `${toState}(${toParams}`) + ")";
        }
        if (rejection.type == 5) {
          this.status = "ignored";
          this.rejection = "The To and From paths are identical."
        }
        console.log(rejection);
      };

      this.trans.promise.then(success, reject);
    },

    template: `
      <div ng-mouseover="vm.toggles.showDetail = true" ng-mouseout="vm.toggles.showDetail = false">
        <div ng-show="vm.toggles.showDetail || vm.toggles.expand" ng-class="{ expand: vm.toggles.expand }" class="transitionDetail panel panel-default">
          <div class="panel-heading">
            <button class="pull-right" ng-click="vm.toggles.expand = false" ng-show="vm.toggles.expand"><i class="fa fa-thumb-tack"> </i></button>
            <h3 class="panel-title">Transition #{{vm.trans.$id}}</h3>
          </div>
          <div class="panel-body">
            <table class="summary">
              <tr><td>From State:</td><td>{{vm.trans.from().name || '(root)'}}</td></tr>
              <tr><td>To State:</td><td>{{vm.trans.to().name || '(root)'}}</td></tr>
              <tr><td>Outcome:</td><td>{{vm.status}}<span ng-show="vm.rejection">: {{vm.rejection}}</span></td></tr>
            </table>

            <hr/>

            <table class="paths">

              <thead>
                <tr><th>From Path</th><th>To Path</th></tr>
              </thead>

              <tbody>
                <tr ng-repeat="elem in vm.paths">
                  <!--<td ng-show="elem.fromType == 'retain'" colspan="2" ng-class="elem.fromType" uir-transition-node-detail node="elem.from" type="elem.fromType"></td>-->
                  <td ng-class="elem.fromType" uir-transition-node-detail node="elem.from" type="elem.fromType"></td>
                  <td ng-class="elem.toType" uir-transition-node-detail node="elem.to" type="elem.toType"></td>
                </tr>
              </tbody>

            </table>
          </div>
          <div class="downArrow"></div>
        </div>

        <div class="historyEntry" ng-class="vm.status" style="cursor: pointer" ng-click="vm.toggles.expand = !vm.toggles.expand">
          <div class="summary">
            <div class="transid">{{vm.trans.$id}}</div>
            <div class="status">{{vm.status}}<span ng-show="vm.trans._message">: {{vm.trans._message}}</span> </div>
            <div class="transname">
              <i ng-class="vm.iconClass()"></i>
              {{vm.trans.to().name}}
              </div>
          </div>
        </div>

      </div>
    `
  }
});


app.directive('uirTransitionNodeDetail', () => ({
  restrict: 'A',
  scope: {
    node: '=',
    type: '='
  },
  bindToController: true,
  controllerAs: 'vm',
  controller: function($scope) {
    this.stateName = (node) => {
      let name = node && node.state && node.state.name;
      if (name === "") name = "(root)";
      return name && name.split(".").reverse()[0];
    };

    this.paramValue = (value) => {
      if (value === undefined) return "undefined";
      if (value === null) return "undefined";
      if (!angular.isObject(value)) return value.toString();
      return "[object " + truncateTo(99, JSON.stringify(value)) + "]";
    };

    let resolveKeys = memoDebounce(500, () =>
        Object.keys(this.node && this.node.resolves || {})
            .filter(key => key !== '$stateParams' && key !== '$transition$'));

    $scope.$watchCollection(resolveKeys, (newval, oldval) => {
      this.resolves = (newval || []).map(key => ({ key: key, value: this.node.resolves[key]}))
    });

  },
  template: `
    <div ng-if="vm.type">
      <div class="header">
        <div class="nowrap deemphasize">[{{vm.type}} state]</div>
        <div class="statename">{{vm.stateName(vm.node)}}</div>
      </div>

      <div class="params" ng-show="vm.node.schema.length">
        <div class="paramslabel deemphasize">Param values</div>
        <div ng-repeat="param in vm.node.schema">
          <div class="paramid">{{param.id}}:</div>
          <div class="paramvalue">{{vm.paramValue(vm.node.values[param.id])}}</div>
        </div>
      </div>

      <div class="params" ng-show="vm.resolves.length">
        <div class="paramslabel deemphasize">Resolved data</div>
        <div ng-repeat="resolve in vm.resolves">

          <simple-modal size="lg" as-modal="true" ng-if="vm.showresolve == resolve.key">
            <div class="modal-header" style="background-color: cornflowerblue">
              <button class="btn btn-primary pull-right" ng-click="vm.showresolve = null">Close</button>
              <h3>{{ resolve.key }}</h3>
            </div>
            <div class="modal-body" style="max-height: 80%;">
              <pre style="max-height: 50%">{{ resolve.value.data | json }}</pre>
            </div>
            <div class="modal-footer"><button class="btn btn-primary" ng-click="vm.showresolve = null">Close</button></div>
          </simple-modal>

          <span class="paramid">
            <span class="link" ng-click="vm.showresolve = resolve.key">{{resolve.key}}</span>
            <i ng-show="resolve.value.data" class="fa fa-check"></i>
          </span>
        </div>
      </div>
    </div>
  `
}));



app.directive("simpleModal", function ($timeout) {
  return {
    restrict: 'AE',
    transclude: true,
    require: "^?uirTransitionsView",
    scope: {
      size: '@',
      asModal: '='
    },
    link: function (scope, elem, attrs, uirTransitionsView) {
      $timeout(() => elem.children().addClass("in"), 10);
      uirTransitionsView.fullScreen(true);
      scope.$on("$destroy", () => uirTransitionsView.fullScreen(false))
    },
    template: `
        <div ng-class="{'modal-backdrop fade': asModal}" style="z-index: 1040;"> </div>

        <div tabindex="-1" ng-class="{'modal fade': asModal}" style="z-index: 1050; display: block;">
          <div ng-class="{'modal-dialog': asModal}" ng-class="{ 'modal-sm': size == 'sm', 'modal-lg': size == 'lg' }">
            <div ng-class="{'modal-content': asModal}" ng-transclude></div>
          </div>
        </div>
      `
  };
});

function truncateTo(len, str) {
  return str.length > len ? str.substr(0, len - 3) + "..." : str;
}

function memoDebounce(ms, fn) {
  let memo, last = 0;
  return function() {
    if (Date.now() - last > ms) {
      memo = fn.apply(null, arguments);
      last = Date.now();
    }
    return memo;
  }
}