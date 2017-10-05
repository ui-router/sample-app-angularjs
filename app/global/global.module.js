import {AppConfig} from "./appConfig.service";
import {AuthService} from "./auth.service";
import {Contacts, Folders, Messages} from "./dataSources.service";
import {dialog} from "./dialog.directive";
import {DialogService} from "./dialog.service";
import {LoadingIndicatorService} from "./loadingIndicator.service";
import {authHookRunBlock} from "./requiresAuth.hook";
import {loadingIndicatorHookRunBlock} from "./loadingIndicator.hook";

export const GLOBAL_MODULE = angular.module('global', []);

GLOBAL_MODULE.directive('dialog', dialog);

GLOBAL_MODULE.service('AppConfig', AppConfig);
GLOBAL_MODULE.service('AuthService', AuthService);
GLOBAL_MODULE.service('Contacts', Contacts);
GLOBAL_MODULE.service('Folders', Folders);
GLOBAL_MODULE.service('Messages', Messages);
GLOBAL_MODULE.service('DialogService', DialogService);
GLOBAL_MODULE.service('LoadingIndicatorService', LoadingIndicatorService);

GLOBAL_MODULE.run(authHookRunBlock);
GLOBAL_MODULE.run(loadingIndicatorHookRunBlock);
