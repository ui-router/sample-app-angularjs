/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

import d3 from "d3";
import angular from "angular";
import d3ng from "./d3ng";
import easing from "./easing";

export default "ui.router.demo";
let app = angular.module("ui.router.demo", ['ui.router', d3ng, easing]);

app.directive('uirStateVis', () => {
  return {
    restrict: "E",
    scope: true,
    controllerAs: 'vis',
    bindToController: {
      pollInterval: "@",
      radius: "@",
      scaleX: "@",
      scaleY: "@",
      offsetX: "@",
      offsetY: "@",
      width: "@",
      height: "@"
    },

    controller: function($state, $interval, $scope) {
      this.nodes = [];

      this.pollInterval = this.pollInterval || 50;

      this.radius = this.radius || 20;

      this.offsetX = this.offsetX || 0;
      this.offsetY = this.offsetY || this.radius * 2;

      this.height = this.height || 500;
      this.width = this.width || 500;

      this.scaleX = this.scaleX || (this.width - this.offsetX * 2);
      this.scaleY = this.scaleY || (this.height - this.offsetY * 2);

      const pollStates = () => {
        let all = (<any[]> $state.get()).map((s: any) => s.$$state());
        let known = this.nodes.map(Object.getPrototypeOf);
        let toAdd = all.filter(s => known.indexOf(s) === -1);
        let toDel = known.filter(s => all.indexOf(s) === -1);
        if (toAdd.length || toDel.length) doLayout(toAdd, toDel);
      };

      const getRoot = () => this.nodes.filter(state => state.name === "")[0];
      const nodeForState = (state) => this.nodes.filter(node => node.name === state.name)[0];

      const doLayout = (add, del) => {
        add.map(s => Object.create(s)).forEach(n => this.nodes.push(n));
        // todo: del.forEach(blah)
        let root = getRoot();

        // Rebuild each node's children array
        this.nodes.forEach((n: any) => n.children = []);
        this.nodes.forEach((n: any) => {
          if (!n || !n.parent) return;
          let parentNode = nodeForState(n.parent);
          if (!parentNode) return;
          parentNode.children.push(n);
          n._parent = parentNode;
        });

        d3.layout.tree()(root);
      };

      pollStates();

      let cancel = $interval(pollStates, this.pollInterval);
      $scope.$on("$destroy", cancel);
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


      let getLinkPath = (state, parent) => {
        let [s, p] = [state, parent];
        let halfy = (s._y + p._y) / 2;
        return `M ${s._x} ${s._y} C ${s._x} ${halfy}, ${p._x} ${halfy}, ${p._x} ${p._y}`;
      };

      scope.$watchGroup(["state.x", "state.y", "parent.x", "parent.y"], (newVals) => {
        let {state, parent} = scope;

        let currentCoords = [state._x || uirStateVis.width / 2, state._y || uirStateVis.height / 2];
        let targetCoords = [x(newVals[0]), y(newVals[1])];

        d3ng.animatePath(targetCoords, currentCoords,500, (interpolated) => {
          let [stateX, stateY] = interpolated;
          state._x = stateX;
          state._y = stateY;
          if (parent)
            state._linkPath = getLinkPath(state, parent);
        });
      });
    },

    template: `
      <path ng-if="parent" ng-attr-d='{{state._linkPath}}' class="link"/>

      <circle r="10" ng-attr-cx="{{state._x}}" ng-attr-cy="{{state._y}}"></circle>

      <text class="label"  text-anchor="middle"
          ng-attr-transform="rotate(-12 {{state._x}} {{state._y}})"
          ng-attr-x="{{state._x}}"
          ng-attr-y="{{state._y - radius}}">{{state.name}}</text>
    `
  }
});
