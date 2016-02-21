System.config({
  baseURL: "/sample-app",
  transpiler: false,
  defaultJSExtensions: true,

  packages: {
    "app": { "defaultExtension": "js" }
  },

  paths: { "npm:*": "node_modules/*" },

  map: {
    "angular": "npm:angular/angular.min",
    "angular-ui-router": "lib/angular-ui-router.js",
    "bootstrap": "npm:bootstrap/dist",
    "css": "npm:systemjs-plugin-css/css",
    "d3": "npm:d3/d3.min",
    "font-awesome": "npm:font-awesome",
    "ui-router-visualizer": "npm:ui-router-visualizer/release/visualizer"
  }
});
