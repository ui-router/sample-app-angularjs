import {app} from "../../app_module";

let tableTemplate =
`  <table>
    <thead>
      <tr>
        <td ng-if="::vm.colVisible('read')"></td>
        <td ng-if="::vm.colVisible('from')"     sort-messages="from">Sender</td>
        <td ng-if="::vm.colVisible('to')"       sort-messages="from">Recipient</td>
        <td ng-if="::vm.colVisible('subject')"  sort-messages="from">Subject</td>
        <td ng-if="::vm.colVisible('date')"     sort-messages="from">Date</td>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat="message in vm.messages | orderBy: vm.AppConfig.sort track by message._id"
          ui-sref=".message({messageId: message._id})" ui-sref-active="active">
        <td ng-if="::vm.colVisible('read')"><i class="fa fa-circle" style="font-size: 50%" ng-show="!message.read"></td>
        <td ng-if="::vm.colVisible('from')">{{ message.from }}</td>
        <td ng-if="::vm.colVisible('to')">{{ message.to }}</td>
        <td ng-if="::vm.colVisible('subject')">{{ message.subject }}</td>
        <td ng-if="::vm.colVisible('date')">{{ message.date | date: "yyyy-MM-dd" }}</td>
      </tr>
    </tbody>

  </table>`;

app.directive("messageTable", (AppConfig) => ({
  bindToController: {
    columns: '=',
    messages: '='
  },
  template: tableTemplate,
  scope: {},
  controllerAs: 'vm',
  controller: function() {
    this.AppConfig = AppConfig;
    this.colVisible = (name) => this.columns.indexOf(name) !== -1;
  }
}));
