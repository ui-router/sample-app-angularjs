import angular from "angular";
import {app} from "../statevis.module.ts";


///////////////////////////////////////////////////////////
// These two directives make up the Transition Visualizer
///////////////////////////////////////////////////////////


app.value("uirTransitionsViewConfig", { MAX_TRANSITIONS: 15});

/**
 * This outer directive manages the list of all transitions (history), and provides a fixed, scrolling viewport.
 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
 */
app.directive('uirTransitionsView', ($transitions, $timeout, d3ng, easing, uirTransitionsViewConfig) => {
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
        $transition$.onStart({}, () => setMessage($transition$, "Starting..."), { priority: 10000 });
        $transition$.onExit({}, ($state$) => setMessage($transition$, `Exiting ${statename($state$)}`), { priority: 10000 });
        $transition$.onRetain({}, ($state$) => setMessage($transition$, `Retained ${statename($state$)}`), { priority: 10000 });
        $transition$.onEnter({}, ($state$) => setMessage($transition$, `Entering ${statename($state$)}`), { priority: 10000 });
        $transition$.onFinish({}, () => setMessage($transition$, `Finishing...`));
        $transition$.promise.finally(() => delete $transition$._message);
      });

      this.fullScreen = function(toggle) {
        $element.toggleClass("fullscreen", toggle);
      };

      let cancelPreviousAnim, duration = 750, el = $element[0].children[0].children[0];
      let scrollToRight = () => {
        let targetScrollX = el.scrollWidth - el.clientWidth;
        cancelPreviousAnim && cancelPreviousAnim();
        let newVal = [targetScrollX], oldVal = [el.scrollLeft];
        let enforceMax = () => [$scope.transitions, $scope.toggles].forEach(arr => { while (arr.length > uirTransitionsViewConfig.MAX_TRANSITIONS) arr.shift(); });
        let callback = (vals) => el.scrollLeft = vals[0];
        cancelPreviousAnim = d3ng.animatePath(newVal, oldVal, duration, callback, enforceMax, easing.easeInOutCubic);
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
  // Icons in the breadcrumb/arrow based on the transition status
  let iconClasses = {
    running: 'fa fa-spin fa-spinner',
    success: 'fa fa-check',
    redirected: 'fa fa-share',
    ignored: 'fa fa-circle-o',
    error: 'fa fa-close'
  };

  return {
    restrict: "E",
    require: ['^uirTransitionsView', 'uirTransitionDetail'],

    scope: {
      trans: '=transition',
      toggles: '='
    },

    bindToController: true,
    controllerAs: "vm",
    controller: function () {
      this.status = "running";

      // Makes the widget take up the entire screen, via position: fixed
      this.fullScreen = toggle => this.toggles.fullscreen = toggle;
      // Provides the icon class to the view
      this.iconClass = () => iconClasses[this.status];

      this.tc = this.trans.treeChanges();
      let paths = angular.extend({}, this.tc);
      // Ignore the root state when drawing paths.
      ["entering", "exiting", "retained"].forEach(key => paths[key] = paths[key].filter(node => node.state.name));
      paths.exiting.reverse();

      this.paths = paths.retained
          .map(node => ({to: node, toType: 'retain', from: node, fromType: 'retain'}));

      let count = Math.max(paths.exiting.length, paths.entering.length);
      for (let i = 0; i < count; i++) {
        this.paths.push({
          to: paths.entering[i],
          toType: paths.entering[i] && 'enter',
          from: paths.exiting[i],
          fromType: paths.exiting[i] && 'exit'
        });
      }

      const paramsForNode = node =>
          Object.keys(node.values).map(key => ({state: node.state.name, key: key, value: node.values[key]}));

      this.params = this.trans.treeChanges().to
          .map(paramsForNode)
          .reduce((memo, array) => memo.concat(array), [])
          .filter(param => param.key !== '#' || !!param.value);
      this.paramsMap = this.params.reduce(((obj, param) => { obj[param.key] = param.value; return obj; }), {});

      const success = () => this.status = "success";

      const reject = (rejection) => {
        this.status = "error";
        if (rejection) {
          this.rejection = rejection && rejection.message;

          let type = rejection && rejection.type;
          if (type == 2) {
            this.status = "redirected";
            //this.rejection = rejection.detail;
            let toState = rejection.detail.name();
            let toParams = JSON.stringify(rejection.detail.params());
            this.rejection = truncateTo(100, `${toState}(${toParams}`) + ")";
          }

          if (type == 5) {
            this.status = "ignored";
            this.rejection = "All states and parameters in the To and From paths are identical."
          }

          console.log(rejection);
        }
      };

      this.trans.promise.then(success, reject);
    },

    template: `
      <div ng-mouseover="vm.toggles.showDetail = true" ng-mouseout="vm.toggles.showDetail = false">
        <div ng-show="vm.toggles.showDetail || vm.toggles.pin || vm.toggles.fullscreen" ng-class="vm.toggles" class="transitionDetail panel panel-default">

          <div class="panel-heading header">
            <button class="btn btn-default btn-xs pinButton" ng-click="vm.toggles.pin = !vm.toggles.pin">
              <i class="fa fa-thumb-tack" ng-class="{ 'fa-rotate-45 text-muted': !vm.toggles.pin }"></i>
            </button>

            <h3 class="panel-title">Transition #{{::vm.trans.$id}}</h3>

            <div style="cursor: pointer;" ng-click="vm.toggles.expand = !vm.toggles.expand">
              <i class="tooltip-right fa" title="Show Details" ng-class="{ 'fa-toggle-off': !vm.toggles.expand, 'fa-toggle-on': vm.toggles.expand }"></i>
            </div>
          </div>

          <div class="panel-body">
            <table class="summary">
              <tr><td>From State:</td><td>{{::vm.trans.from().name || '(root)'}}</td></tr>
              <tr><td>To State:</td><td>{{::vm.trans.to().name || '(root)'}}</td></tr>
              <tr>
                <td colspan="1">Parameters:</td>
                <td colspan="1">
                  <div keys-and-values="::vm.paramsMap"
                      labels="{ section: '', modalTitle: 'Parameter value: ' }"
                      classes="{ outerdiv: '', keyvaldiv: 'keyvalue', section: '', key: '', value: '' }">
                  </div>
                </td>
              </tr>

              <tr><td>Outcome:</td><td>{{vm.status}}<span ng-show="vm.rejection">: {{vm.rejection}}</span></td></tr>
            </table>

            <hr/>

            <table class="paths">

              <thead>
                <tr><th>From Path</th><th>To Path</th></tr>
              </thead>

              <tbody>
                <tr ng-repeat="elem in ::vm.paths">
                  <!--<td ng-show="elem.fromType == 'retain'" colspan="2" ng-class="elem.fromType" uir-transition-node-detail node="elem.from" type="elem.fromType"></td>-->
                  <td ng-class="::elem.fromType" uir-transition-node-detail node="::elem.from" type="::elem.fromType"></td>
                  <td ng-class="::elem.toType" uir-transition-node-detail node="::elem.to" type="::elem.toType"></td>
                </tr>
              </tbody>

            </table>
          </div>

          <div class="downArrow"></div>

        </div>

        <div class="historyEntry" ng-class="vm.status" style="cursor: pointer" ng-click="vm.toggles.expand = !vm.toggles.expand">
          <div class="summary">
            <div class="transid">{{::vm.trans.$id}}</div>
            <div class="status">{{vm.status}}<span ng-show="vm.trans._message">: {{vm.trans._message}}</span> </div>
            <div class="transname">
              <i ng-class="vm.iconClass()"></i>
              {{::vm.trans.to().name}}
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

    $scope.$watch(() => this.node, (node, oldval) => {
      if (!node) return;
      this.params = node.schema.reduce((params, param) => {
        params[param.id] = node.values[param.id];
        return params;
      }, {});
    });

    let getResolveKeys = memoDebounce(500, () =>
        Object.keys(this.node && this.node.resolves || {}).filter(key => key !== '$stateParams' && key !== '$transition$'));

    this.unwrapResolve = (resolve) => {
      return resolve.data;
    };


    $scope.$watchCollection(getResolveKeys, (keys, oldval) => {
      this.resolves = (keys || []).reduce(((resolves, key) => {
        resolves[key] = this.node.resolves[key];
        return resolves;
      }), {});
    });

  },
  template: `
    <div ng-if="::vm.type">
      <div class="header">
        <div class="nowrap deemphasize">({{::vm.type}} state)</div>
        <div class="statename">{{::vm.stateName(vm.node)}}</div>
      </div>

      <div keys-and-values="vm.params"
          classes="{ outerdiv: 'params', section: 'paramslabel deemphasize' }"
          labels="{ section: 'Parameter values', modalTitle: 'Parameter value: ' }">
      </div>

      <div keys-and-values="vm.resolves" getvalue="vm.unwrapResolve(value)"
          classes="{ outerdiv: 'params resolve', section: 'resolvelabel deemphasize' }"
          labels="{ section: 'Resolved data', modalTitle: 'Resolved value: ' }">
      </div>
    </div>
  `
}));


app.directive("keysAndValues", function () {
  return {
    restrict: 'AE',

    scope: {
      keysAndValues: '=', // map of keys/values to display
      getvalue: '&?', // [Optional] a function which unwraps each value
      classes: '=', // Apply classes to specific elements
      labels: '=' // Apply labels to specific elements, e.g., { section: 'Param values', modalTitle: 'Parameter value: ' }
    },

    controller($scope) {
      // Default CSS class values
      let _classes = { outerdiv: 'param', keyvaldiv: 'keyvalue', section: 'paramslabel deemphasize', key: 'paramid', value: 'paramvalue' };
      $scope._classes = angular.extend(_classes, $scope.classes);
      $scope.toggles = {
        modal: null // Toggle display of a modal for a particular value
      };

      // Unwraps the value using the bound unwrapValue function
      $scope.unwrap = (value) => $scope.getvalue ? $scope.getvalue({ value: value }) : value;

      $scope.empty = () => Object.keys($scope.keysAndValues || {}).length == 0;

      $scope.isObject = (object) => // If it's not a string, not a number, not a boolean, is it an object?
        object && !angular.isString(object) && !angular.isNumber(object) && object !== true && object !== false;

      // Render various types of objects differently
      $scope.displayValue = function (object) {
        if (object === undefined) return "undefined";
        if (object === null) return "null";
        if (angular.isString(object)) return '"' + truncateTo(100, object) + '"';
        if ($scope.isObject(object)) return "[Object]";
        if (typeof object.toString === 'function') return truncateTo(100, object.toString());
        return object;
      };
    },

    template: `
      <div ng-class="::_classes.outerdiv" ng-if="!empty()">
        <div ng-class="::_classes.section">{{::labels.section}}</div>

        <div ng-repeat="(key, value) in keysAndValues" ng-class="::_classes.keyvaldiv">

          <div ng-class="::_classes.key">{{::key}}: </div>

          <div ng-if="!isObject(unwrap(value))" ng-class="::_classes.value">
            <!-- The value  is a simple string, int, boolean -->
            {{ displayValue(unwrap(value)) }}
          </div>

          <div ng-if="isObject(unwrap(value))" ng-class="::_classes.value">
            <!-- The value is an Object. Allow user to click a link titled [Object] to show a modal containing the object as JSON -->

            <simple-modal size="lg" as-modal="true" ng-if="toggles.modal == key">
              <div class="modal-header" style="display: flex; flex-flow: row nowrap; justify-content: space-between; background-color: cornflowerblue">
                <div style="font-size: 1.5em;">{{::labels.modalTitle}}: {{ ::key }}</div>
                <button class="btn btn-primary" ng-click="toggles.modal = null"><i class="fa fa-close"></i></button>
              </div>

              <div class="modal-body" style="max-height: 80%;">
                <pre style="max-height: 50%">{{ ::unwrap(value) | json }}</pre>
              </div>

              <div class="modal-footer"><button class="btn btn-primary" ng-click="toggles.modal = null">Close</button></div>
            </simple-modal>

            <span>
              <span class="link" ng-click="toggles.modal = key">[Object]</span>
            </span>

          </div>
        </div>
      </div>
      `
  };
});



app.directive("simpleModal", function ($timeout) {
  return {
    restrict: 'AE',
    transclude: true,
    require: [ "^?uirTransitionsView", "^?uirTransitionView" ],
    scope: {
      size: '@',
      asModal: '='
    },
    link: function (scope, elem, attrs, controllers) {
      $timeout(() => elem.children().addClass("in"), 10);
      controllers = controllers.filter(x => !!x);
      controllers.forEach(ctrl => ctrl.fullScreen(true));
      scope.$on("$destroy", () => controllers.forEach(ctrl => ctrl.fullScreen(false)))
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