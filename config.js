System.config({
  transpiler: false,
  defaultJSExtensions: true,

  packages: {
    "app": { "defaultExtension": "js" }
  },

  paths: { "npm:*": "node_modules/*" },

  map: {
    "angular": "npm:angular/angular.min",
    "angular-ui-router": "npm:angular-ui-router/release/angular-ui-router",
    "bootstrap": "npm:bootstrap/dist",
    "css": "npm:systemjs-plugin-css/css",
    "d3": "npm:d3/d3.min",
    "font-awesome": "npm:font-awesome",
    "ui-router-extras-core": "npm:ui-router-extras/release/modular/ct-ui-router-extras.core.min",
    "ui-router-visualizer": "npm:ui-router-visualizer/release/visualizer"
  }
});
