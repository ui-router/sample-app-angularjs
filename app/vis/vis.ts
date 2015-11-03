/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

import d3 from "d3";
import angular from "angular";
import d3ng from "./d3ng";
import easing from "./easing";

let moduleName = "ui.router.demo";
export default moduleName;
let app = angular.module(moduleName, ['ui.router', d3ng, easing]);

app.service("uirStateVisService", ($state, $interval) => {
  let nodes = [];

  const nodeForState = (state) => nodes.filter(node => node.name === state.name)[0];

  const pollStates = () => {
    let all = (<any[]> $state.get()).map((s: any) => s.$$state());
    let known = nodes.map(Object.getPrototypeOf);
    let toAdd = all.filter(s => known.indexOf(s) === -1);
    let toDel = known.filter(s => all.indexOf(s) === -1);

    if (toAdd.length || toDel.length) {
      toAdd.map(s => Object.create(s)).forEach(n => nodes.push(n));
      // todo: del.forEach(blah)

      // Rebuild each node's children array
      nodes.forEach((n: any) => n.children = []);
      nodes.forEach((n: any) => {
        if (!n || !n.parent) return;
        let parentNode = nodeForState(n.parent);
        if (!parentNode) return;
        parentNode.children.push(n);
        n._parent = parentNode;
      });
    }
  };

  pollStates();
  let cancel = $interval(pollStates, 50);

  return {
    nodes: nodes,
    cancel: cancel
  };
});

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

      const doLayout = () => {
        let root = this.nodes.filter(state => state.name === "")[0];
        d3.layout.tree()(root);
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

      const x = (xval) => xval * uirStateVis.scaleX + uirStateVis.offsetX;
      const y = (yval) => yval * uirStateVis.scaleY + uirStateVis.offsetY;


      let makeLinkPath = (state, parent) => {
        let [s, p] = [state, parent];
        let yAvg = (s._y + p._y) / 2;
        return `M ${s._x} ${s._y} C ${s._x} ${yAvg}, ${p._x} ${yAvg}, ${p._x} ${p._y}`;
      };

      scope.$watchGroup(["state.x", "state.y", "parent.x", "parent.y"], (newVals) => {
        let {state, parent} = scope;

        let currentCoords = [state._x || uirStateVis.width / 2, state._y || uirStateVis.height / 2];
        let targetCoords = [x(newVals[0]), y(newVals[1])];

        d3ng.animatePath(targetCoords, currentCoords, 800, (interpolated) => {
          let [stateX, stateY] = interpolated;
          state._x = stateX;
          state._y = stateY;
          if (angular.isDefined(parent) && angular.isDefined(parent._x))
            state._linkPath = makeLinkPath(state, parent);
        });
      });
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
