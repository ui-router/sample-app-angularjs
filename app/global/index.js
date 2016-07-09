import {AppConfig} from "./appConfig.service";
import {AuthService} from "./auth.service";
import {Contacts, Folders, Messages} from "./dataSources.service";
import {dialog} from "./dialog.directive";
import {DialogService} from "./dialog.service";
import {authHookRunBlock} from "./requiresAuth.hook";

export const GLOBAL_MODULE = {
  directives: {dialog},
  services: {AppConfig, AuthService, Contacts, Folders, Messages, DialogService},
  runBlocks: [authHookRunBlock]
}
