import * as angular from "angular";

export class DialogService {
  constructor($document, $compile, $rootScope) {
    let body = $document.find("body");
    let elem = angular.element("<div class='dialog' dialog='opts'></div>");

    this.confirm = (message, details = "Are you sure?", yesMsg = "Yes", noMsg = "No") => {
      $compile(elem)(angular.extend($rootScope.$new(), {message, details, yesMsg, noMsg}));
      body.append(elem);
      return elem.data("promise").finally(() => elem.removeClass('active').remove());
    }
  }
}
DialogService.$inject = ['$document', '$compile', '$rootScope'];
