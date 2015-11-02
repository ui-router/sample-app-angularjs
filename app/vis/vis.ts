/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

import d3 from "d3";
import angular from "angular";

export default "ui.router.demo";
let app = angular.module("ui.router.demo", ['ui.router']);

console.log("Loaded!");

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
      this.states = [];

      this.pollInterval = this.pollInterval || 50;

      this.radius = this.radius || 20;

      this.height = this.height || 800;
      this.width = this.width || 800;

      this.scaleX = this.scaleX || 150;
      this.scaleY = this.scaleY || 75;

      this.offsetX = this.offsetX || 400;
      this.offsetY = this.offsetY || 40;

      const pollStates = () => {
        let all = (<any[]> $state.get()).map(s => s.$$state());
        let known = this.states.map(Object.getPrototypeOf);
        let toAdd = all.filter(s => known.indexOf(s) === -1);
        let toDel = known.filter(s => all.indexOf(s) === -1);
        if (toAdd.length || toDel.length) doLayout(toAdd, toDel);
      };

      const getRoot = () => this.states.filter(state => state.name === "")[0];
      const nodeForState = (s) => this.states.filter(state => Object.getPrototypeOf(state) === s)[0];

      const doLayout = (add, del) => {
        add.map(s => Object.create(s)).forEach(n => this.states.push(n));
        // todo: del.forEach(blah)
        let root = getRoot();
        root.parent = root;

        // Rebuild each node's children array
        this.states.forEach((n: any) => n.children = []);
        this.states.forEach((n: any) => n && n.parent && nodeForState(n.parent) && nodeForState(n.parent).children.push(n));

        d3.layout.tree()(root);
      };

      pollStates();

      let cancel = $interval(pollStates, this.pollInterval);
      $scope.$on("$destroy", cancel);
    },
    template: `
      <svg ng-attr-width="{{vis.width}}" ng-attr-height="{{vis.height}}">
        <g uir-state-node ng-repeat="state in vis.states track by state.name" state="state" parent="state.parent"></g>
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
      scope.x = (n) => n.x * uirStateVis.scaleX + uirStateVis.offsetX;
      scope.y = (n) => n.y * uirStateVis.scaleY + uirStateVis.offsetY;
    },

    template: `
      <line ng-attr-x1="{{x(state)}}" ng-attr-y1="{{y(state)}}"
          ng-attr-x2="{{x(parent)}}" ng-attr-y2="{{y(parent)}}"
          stroke="black" stroke-width="1"/>

      <circle r="10" ng-attr-cx="{{x(state)}}" ng-attr-cy="{{y(state)}}"></circle>
      <text class="label" ng-attr-cx="{{x(state)}}" ng-attr-cy="{{y(state)}}"></text>
    `
  }
});
