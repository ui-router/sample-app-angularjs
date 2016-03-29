"use strict";
var ngmodule_1 = require("../../bootstrap/ngmodule");
require("./sortMessages");
var tableTemplate = "  <table>\n    <thead>\n      <tr>\n        <td ng-if=\"::$ctrl.colVisible('read')\"></td>\n        <td ng-if=\"::$ctrl.colVisible('from')\"     sort-messages=\"from\">Sender</td>\n        <td ng-if=\"::$ctrl.colVisible('to')\"       sort-messages=\"to\">Recipient</td>\n        <td ng-if=\"::$ctrl.colVisible('subject')\"  sort-messages=\"subject\">Subject</td>\n        <td ng-if=\"::$ctrl.colVisible('date')\"     sort-messages=\"date\">Date</td>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat=\"message in $ctrl.messages | orderBy: $ctrl.AppConfig.sort track by message._id\"\n          ui-sref=\".message({messageId: message._id})\" ui-sref-active=\"active\">\n        <td ng-if=\"::$ctrl.colVisible('read')\"><i class=\"fa fa-circle\" style=\"font-size: 50%\" ng-show=\"!message.read\"></td>\n        <td ng-if=\"::$ctrl.colVisible('from')\">{{ message.from }}</td>\n        <td ng-if=\"::$ctrl.colVisible('to')\">{{ message.to }}</td>\n        <td ng-if=\"::$ctrl.colVisible('subject')\">{{ message.subject }}</td>\n        <td ng-if=\"::$ctrl.colVisible('date')\">{{ message.date | date: \"yyyy-MM-dd\" }}</td>\n      </tr>\n    </tbody>\n\n  </table>";
ngmodule_1.ngmodule.component("messageTable", {
    bindings: { columns: '<', messages: '<' },
    template: tableTemplate,
    controller: function (AppConfig) {
        var _this = this;
        this.AppConfig = AppConfig;
        this.colVisible = function (name) { return _this.columns.indexOf(name) !== -1; };
    }
});
//# sourceMappingURL=messageTable.js.map