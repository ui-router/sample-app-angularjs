import {app} from "../../app_module";
app.directive("cellTemplate", ($compile) => {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.html(scope.$eval(attrs.cellTemplate));
      $compile(elem.contents())(scope);
    }
  }
});
