import {app} from "../statevis.module.ts";
import d3 from "d3";

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
