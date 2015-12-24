System.config({
  baseURL: "/new-state-vis",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },

  packages: {
    "app": {
      "defaultExtension": "js"
    },
    "lib-ts": {
      "defaultExtension": "ts"
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.7",
    "angular-ui-router": "lib/angular-ui-router.min.js",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "css": "github:systemjs/plugin-css@0.1.19",
    "d3": "github:mbostock/d3@3.5.6",
    "font-awesome": "npm:font-awesome@4.4.0",
    "lorenzofox3/Smart-Table": "github:lorenzofox3/Smart-Table@2.1.4",
    "typescript": "npm:typescript@1.6.2",
    "ui-router-extras": "npm:ui-router-extras@0.1.0",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.19"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:ui-router-extras@0.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
