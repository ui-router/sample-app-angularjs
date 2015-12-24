import {app} from "../statevis.module.ts";
import d3 from "d3";

app.filter("lastDottedSegment", () => (word) => word.split(".").slice(-1)[0]);

app.directive('uirStateVisContainer', uirStateVisService => ({
  restrict: 'E',
  controllerAs: 'vm',
  controller: function($element) {
    //$element = $element.children();
    let el = $element[0].children[0];

    this.minimize = (evt?) => {
      evt && evt.preventDefault();
      evt && evt.stopPropagation();

      let bounds = el.getBoundingClientRect();
      el.style.top = el.style.left = "auto";
      el.style.right = this.right = (window.innerWidth - bounds.right);
      el.style.bottom = this.bottom = (window.innerHeight - bounds.bottom);

      let unminimize = () => {
        el.style.top = el.style.left = "auto";
        el.style.right = this.right;
        el.style.bottom = this.bottom;
        $element.children().toggleClass("minimized", false);
        $element.off("click", unminimize);
        this.minimized = false;
      };

      $element.children().toggleClass("minimized", true);
      $element.on("click", unminimize);
      // wait 50ms to avoid coordinates jumping directly to 0/0 and avoid animation
      setTimeout(() => el.style.right = el.style.bottom = "0", 50);

      this.minimized = true;
    };

    setTimeout(() => this.minimize(), 1000)
  },
  template: `
    <div class="uirStateVisContainer" draggable="!vm.minimized">
      <div style="width: 100%; display: flex; flex-flow: row nowrap; justify-content: space-between">
        <div> Current State: <state-selector></state-selector></div>
        <button ng-click="vm.minimize($event)"><i class="fa fa-chevron-down" style="cursor: pointer"></i></button>
      </div>
      <uir-state-vis style="flex: 1 0 auto" class="statevis" width="350" height="250"></uir-state-vis>
    </div>
`
}));

app.directive('uirStateVis', uirStateVisService => ({
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

    controller: function($state, $scope) {
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
}));
