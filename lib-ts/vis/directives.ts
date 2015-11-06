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

app.filter("lastDottedSegment", () => (word) => word.split(".").slice(-1)[0]);

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

      this.radius = this.radius || 15;
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
      node: "=state",
      parent: "="
    },
    require: "^uirStateVis",
    link: function (scope, elem, attr, uirStateVis) {
      scope.radius = uirStateVis.radius;

      const makeLinkPath = (node, parent) => {
        let [s, p] = [node, parent];
        let yAvg = (s._y + p._y) / 2;
        return `M ${s._x} ${s._y} C ${s._x} ${yAvg}, ${p._x} ${yAvg}, ${p._x} ${p._y}`;
      };

      let cancelCurrentAnimation = angular.noop;

      function xyValsUpdated(newXyVals) {
        cancelCurrentAnimation();

        const transformX = (xval) => xval * uirStateVis.scaleX + uirStateVis.offsetX;
        const transformY = (yval) => yval * uirStateVis.scaleY + uirStateVis.offsetY;

        let {node, parent} = scope;
        let currentCoords = [node._x || uirStateVis.width / 2, node._y || uirStateVis.height / 2];
        let targetCoords = [transformX(newXyVals[0]), transformY(newXyVals[1])];

        function animationFrame(xyValArray) {
          let [x, y] = xyValArray;
          node._x = x;
          node._y = y;
          if (parent && angular.isDefined(parent._x))
            node._linkPath = makeLinkPath(node, parent);
        }
        cancelCurrentAnimation = d3ng.animatePath(targetCoords, currentCoords, 800, animationFrame);
      }
      scope.$watchGroup(["node.x", "node.y", "parent.x", "parent.y"], xyValsUpdated);
    },

    template: `
      <path ng-if="node._linkPath" ng-attr-d='{{node._linkPath}}' class="link"/>

      <circle class="{{node._classes}}" r="10" ng-attr-cx="{{node._x}}" ng-attr-cy="{{node._y}}"></circle>
      <path class="{{node._classes}}" r="10" ng-attr-cx="{{node._x}}" ng-attr-cy="{{node._y}}"></path>

      <text class="name" text-anchor="middle"
          ng-attr-transform="rotate(-12 {{node._x}} {{node._y}})"
          ng-attr-x="{{node._x}}" ng-attr-y="{{node._y - radius}}">
          {{node.name | lastDottedSegment}}
      </text>

      <text class="label" text-anchor="middle" ng-attr-x="{{node._x}}" ng-attr-y="{{node._y + radius + 10}}">
          {{node.label}}
      </text>
    `
  }
});
