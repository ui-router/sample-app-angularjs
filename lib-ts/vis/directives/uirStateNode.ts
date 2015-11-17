import angular from "angular";
import {app} from "../statevis.module.ts";

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
