/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

import d3 from "d3";
import angular from "angular";

export default "ui.router.demo";
let app = angular.module("ui.router.demo", ['ui.router']);

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
        let all = (<any[]> $state.get()).map(s => s.$$state());
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


app.directive('uirStateNode', () => {
  return {
    restrict: "A",
    scope: {
      state: "=",
      parent: "="
    },
    require: "^uirStateVis",
    link: function (scope, elem, attr, uirStateVis) {
      scope.radius = uirStateVis.radius;
      scope.x = (n) => n.x * uirStateVis.scaleX + uirStateVis.offsetX;
      scope.y = (n) => n.y * uirStateVis.scaleY + uirStateVis.offsetY;
    },

    template: `
      <line ng-if="parent" ng-attr-x1="{{x(state)}}" ng-attr-y1="{{y(state)}}"
          ng-attr-x2="{{x(parent)}}" ng-attr-y2="{{y(parent)}}" class="link"/>

      <circle r="10" ng-attr-cx="{{x(state)}}" ng-attr-cy="{{y(state)}}"></circle>

      <text class="label"
          ng-attr-transform="rotate(-8 {{x(state)}} {{y(state)}})"
          ng-attr-x="{{x(state) - radius}}"
          ng-attr-y="{{y(state) - (radius / 1.5)}}">{{state.name}}</text>
    `
  }
});
