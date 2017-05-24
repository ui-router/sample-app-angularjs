System.config({
  transpiler: false,
  defaultJSExtensions: true,

  packages: {
    "app": { "defaultExtension": "js" }
  },

  paths: { "npm:*": "node_modules/*" },

  meta: {
    "npm:angular/angular.min": { format: "global", exports: "angular" }
  },

  map: {
    "@uirouter/angularjs": "npm:@uirouter/angularjs/release/ui-router-angularjs",
    "@uirouter/core": "npm:@uirouter/core/_bundles/ui-router-core",
    "@uirouter/visualizer": "npm:@uirouter/visualizer/bundles/visualizer.min",
    "angular": "npm:angular/angular.min",
    "bootstrap": "npm:bootstrap/dist",
    "css": "npm:systemjs-plugin-css/css",
    "d3": "npm:d3/d3.min",
    "font-awesome": "npm:font-awesome",
  }
});
