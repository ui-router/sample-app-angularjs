dialog.$inject = ['$timeout', '$q'];
export function dialog($timeout, $q) {
  return {
    link: (scope, elem) => {
      $timeout(() => elem.addClass('active'));
      elem.data('promise', $q((resolve, reject) => {
        scope.yes = () => resolve(true);
        scope.no = () => reject(false);
      }));
    },
    template: `
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
`
  }
}