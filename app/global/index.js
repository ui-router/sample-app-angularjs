import {loadNg1Module, ngmodule} from "../bootstrap/ngmodule";

import {AppConfig} from "./appConfig.service";
import {AuthService} from "./auth.service";
import {Contacts, Folders, Messages} from "./dataSources.service";
import {dialog} from "./dialog.directive";
import {DialogService} from "./dialog.service";
import {authHookRunBlock} from "./requiresAuth.hook";

const globalAppModule = {
  directives: {dialog},
  services: {AppConfig, AuthService, Contacts, Folders, Messages, DialogService},
  runBlocks: [authHookRunBlock]
};

loadNg1Module(ngmodule, globalAppModule);
