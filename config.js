System.config({
  transpiler: false,
  defaultJSExtensions: true,

  packages: {
    "app": { "defaultExtension": "js" }
  },

  paths: { "npm:*": "node_modules/*" },

  meta: {
    "npm:angular/angular": { format: "global", exports: "angular" }
  },

  map: {
    "angular": "npm:angular/angular",
    "angular2": "npm:angular2",
    "rxjs": "npm:rxjs",
    "angular-ui-router": "npm:angular-ui-router/release/angular-ui-router",
    "ui-router-ng2": "npm:ui-router-ng2/ng2",
    "bootstrap": "npm:bootstrap/dist",
    "css": "npm:systemjs-plugin-css/css",
    "d3": "npm:d3/d3.min",
    "font-awesome": "npm:font-awesome",
    "ui-router-ng1-to-ng2": "npm:ui-router-ng1-to-ng2/ng1-to-ng2",
    "ui-router-visualizer": "npm:ui-router-visualizer/release/visualizer"
  }
});
