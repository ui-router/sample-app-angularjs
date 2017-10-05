import * as angular from "angular";

export class LoadingIndicatorService {
  constructor($document) {
    let body = $document.find("body");

    this.showLoadingIndicator = () => {
      body.append(angular.element('<div id="spinner"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i></div>'));
    };

    this.hideLoadingIndicator = () => {
      let spinner = document.getElementById("spinner");
      spinner.parentElement.removeChild(spinner);
    };
  }
}
LoadingIndicatorService.$inject = ['$document', '$compile', '$rootScope'];
