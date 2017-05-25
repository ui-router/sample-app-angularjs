/**
 * A component that displays a folder of messages as a table
 * 
 * If a row is clicked, the details of the message is shown using a relative ui-sref to `.message`.
 * 
 * ui-sref-active is used to highlight the selected row.
 * 
 * Shows/hides specific columns based on the `columns` input binding.
 */
export const messageTable = {
  bindings: { columns: '<', messages: '<' },

  controller: messageTableController,

  template: `
    <table>
      <thead>
        <tr>
          <td ng-if="::$ctrl.colVisible('read')"></td>
          <td ng-if="::$ctrl.colVisible('from')"     sort-messages="from">Sender</td>
          <td ng-if="::$ctrl.colVisible('to')"       sort-messages="to">Recipient</td>
          <td ng-if="::$ctrl.colVisible('subject')"  sort-messages="subject">Subject</td>
          <td ng-if="::$ctrl.colVisible('date')"     sort-messages="date">Date</td>
        </tr>
      </thead>
  
      <tbody>
        <tr ng-repeat="message in $ctrl.messages | orderBy: $ctrl.AppConfig.sort track by message._id"
            ui-sref=".message({messageId: message._id})" ui-sref-active="active">
          <td ng-if="::$ctrl.colVisible('read')"><i class="fa fa-circle" style="font-size: 50%" ng-show="!message.read"></td>
          <td ng-if="::$ctrl.colVisible('from')">{{ message.from }}</td>
          <td ng-if="::$ctrl.colVisible('to')">{{ message.to }}</td>
          <td ng-if="::$ctrl.colVisible('subject')">{{ message.subject }}</td>
          <td ng-if="::$ctrl.colVisible('date')">{{ message.date | date: "yyyy-MM-dd" }}</td>
        </tr>
      </tbody>
  
    </table>
`};

messageTableController.$inject = ['AppConfig'];
function messageTableController(AppConfig) {
  this.AppConfig = AppConfig;
  this.colVisible = (name) => this.columns.indexOf(name) !== -1;
}