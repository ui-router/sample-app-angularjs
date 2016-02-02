import angular from "angular";
import {ngmodule} from "../ngmodule";

let dialogTpl = `
  <div class="backdrop"></div>
  <div class='wrapper'>
    <div class="content">
      <h4 ng-show="message">{{message}}</h4>
      <div ng-show="details">{{details}}</div>

      <div style="padding-top: 1em;">
        <button class="btn btn-primary" ng-click="yes()">{{yesMsg}}</button>
        <button class="btn btn-primary" ng-click="no()">{{noMsg}}</button>
      </div>
    </div>
  </div>
`;

function DialogDirective($timeout, $q) {
  return {
    template: dialogTpl,
    link: (scope, elem) => {
      $timeout(() => elem.addClass('active'));
      elem.data('promise', $q((resolve, reject) => {
        scope.yes = () => resolve(true);
        scope.no = () => reject(false);
      }));
    }
  }
}

function DialogService($document, $compile, $rootScope) {
  let body = $document.find("body");
  let elem = angular.element("<div class='dialog' dialog='opts'></div>");
  this.confirm = (message, details = "Are you sure?", yesMsg = "Yes", noMsg = "No") => {
    $compile(elem)(angular.extend($rootScope.$new(), { message, details, yesMsg, noMsg }));
    body.append(elem);
    return elem.data("promise").finally(() => elem.removeClass('active').remove());
  }
}

ngmodule.directive("dialog", DialogDirective);
ngmodule.service("dialogService", DialogService);
