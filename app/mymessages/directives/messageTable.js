import {app} from "../../app_module";

let tableTemplate =
`  <table>
    <thead>
      <tr>
        <td sort-messages="col.sort" ng-repeat="col in ::vm.visibleClumns">{{col.title}}</td>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="message in vm.messages | orderBy: vm.AppConfig.sort track by message._id"
          ui-sref=".message({messageId: message._id})" ui-sref-active="active">
        <td ng-repeat="col in vm.visibleClumns" cell-template="col.template"></td>
      </tr>
    </tbody>

  </table>`;

let makeColumn = (id, title, template, search = true, sort = id) =>
    ({ id, title, search, sort, template });

let allColumns = [
  makeColumn('read',    '',          '<i class="fa fa-circle" ng-show="!message.read"></i>', false, false),
  makeColumn('corpus',  'Style',     '{{ message.corpus }}'),
  makeColumn('from',    'Sender',    '{{ message.from }}'),
  makeColumn('to',      'Recipient', '{{ message.to }}'),
  makeColumn('subject', 'Subject',   '{{ message.subject }}'),
  makeColumn('date',    'Date',      '{{ message.date | date: "yyyy-MM-dd" }}')
];

app.directive("messageTable", (AppConfig) => ({
  bindToController: {
    columns: '=',
    messages: '='
  },
  template: tableTemplate,
  scope: {},
  controllerAs: 'vm',
  controller: function($interpolate, $sce) {
    this.AppConfig = AppConfig;
    this.visibleClumns = allColumns.filter(c => this.columns.indexOf(c.id) !== -1);
    this.renderTemplate = (template, data) => $sce.trustAsHtml($interpolate(template)(data));
  }
}));
