/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

import d3 from "d3";
import angular from "angular";
import d3ng from "./d3ng";
import easing from "./easing";
import visSvc from "./service"

let moduleName = "ui.router.demo";
export default moduleName;
let app = angular.module(moduleName, ['ui.router', visSvc, d3ng, easing]);

app.directive('uirStateVis', (uirStateVisService) => {
  return {
    restrict: "E",
    scope: true,
    controllerAs: 'vis',
    bindToController: {
      radius: "@",
      scaleX: "@",
      scaleY: "@",
      offsetX: "@",
      offsetY: "@",
      width: "@",
      height: "@"
    },

    controller: function($state, $interval, $scope) {
      this.nodes = uirStateVisService.nodes;

      this.radius = this.radius || 20;
      this.offsetX = this.offsetX || 0;
      this.offsetY = this.offsetY || this.radius * 2;
      this.height = this.height || 500;
      this.width = this.width || 500;
      this.scaleX = this.scaleX || (this.width - this.offsetX * 2);
      this.scaleY = this.scaleY || (this.height - this.offsetY * 2);

      let tree = d3.layout.tree();

      const doLayout = () => {
        let root = this.nodes.filter(state => state.name === "")[0];
        tree(root);
      };

      $scope.$watchCollection(() => this.nodes, doLayout);
    },
    template: `
      <svg ng-attr-width="{{vis.width}}" ng-attr-height="{{vis.height}}">
        <g uir-state-node ng-repeat="node in vis.nodes | orderBy: '-y' track by node.name " state="node" parent="node._parent"></g>
      </svg>
    `
  }
});


app.directive('uirStateNode', (d3ng) => {
  return {
    restrict: "A",
    scope: {
      state: "=",
      parent: "="
    },
    require: "^uirStateVis",
    link: function (scope, elem, attr, uirStateVis) {
      scope.radius = uirStateVis.radius;

      const makeLinkPath = (state, parent) => {
        let [s, p] = [state, parent];
        let yAvg = (s._y + p._y) / 2;
        return `M ${s._x} ${s._y} C ${s._x} ${yAvg}, ${p._x} ${yAvg}, ${p._x} ${p._y}`;
      };

      let cancelCurrentAnimation = angular.noop;

      function xyValsUpdated(newXyVals) {
        cancelCurrentAnimation();

        const transformX = (xval) => xval * uirStateVis.scaleX + uirStateVis.offsetX;
        const transformY = (yval) => yval * uirStateVis.scaleY + uirStateVis.offsetY;

        let {state, parent} = scope;
        let currentCoords = [state._x || uirStateVis.width / 2, state._y || uirStateVis.height / 2];
        let targetCoords = [transformX(newXyVals[0]), transformY(newXyVals[1])];

        function animationFrame(xyValArray) {
          let [x, y] = xyValArray;
          state._x = x;
          state._y = y;
          if (parent && angular.isDefined(parent._x))
            state._linkPath = makeLinkPath(state, parent);
        }
        cancelCurrentAnimation = d3ng.animatePath(targetCoords, currentCoords, 800, animationFrame);
      }
      scope.$watchGroup(["state.x", "state.y", "parent.x", "parent.y"], xyValsUpdated);
    },

    template: `
      <path ng-if="state._linkPath" ng-attr-d='{{state._linkPath}}' class="link"/>

      <circle r="10" ng-attr-cx="{{state._x}}" ng-attr-cy="{{state._y}}"></circle>

      <text class="label"  text-anchor="middle"
          ng-attr-transform="rotate(-12 {{state._x}} {{state._y}})"
          ng-attr-x="{{state._x}}"
          ng-attr-y="{{state._y - radius}}">{{state.name}}</text>
    `
  }
});
