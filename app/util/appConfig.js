import {app} from "../app.module"

class AppConfig {
  constructor() {
    this.sort = '+date';
    this.emailAddress = 'myself@angular.dev';
    this.restDelay = 100;
  }

  load() {
    try {
      return angular.extend(this, angular.fromJson(sessionStorage.getItem("appConfig")))
    } catch (Error) { }

    return this;
  }

  save() {
    sessionStorage.setItem("appConfig", angular.toJson(angular.extend({}, this)));
  }
}

app.value('AppConfig', new AppConfig().load());

