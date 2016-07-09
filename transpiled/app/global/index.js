"use strict";
var appConfig_service_1 = require("./appConfig.service");
var auth_service_1 = require("./auth.service");
var dataSources_service_1 = require("./dataSources.service");
var dialog_directive_1 = require("./dialog.directive");
var dialog_service_1 = require("./dialog.service");
var requiresAuth_hook_1 = require("./requiresAuth.hook");
exports.GLOBAL_MODULE = {
    directives: { dialog: dialog_directive_1.dialog },
    services: { AppConfig: appConfig_service_1.AppConfig, AuthService: auth_service_1.AuthService, Contacts: dataSources_service_1.Contacts, Folders: dataSources_service_1.Folders, Messages: dataSources_service_1.Messages, DialogService: dialog_service_1.DialogService },
    runBlocks: [requiresAuth_hook_1.authHookRunBlock]
};
//# sourceMappingURL=index.js.map