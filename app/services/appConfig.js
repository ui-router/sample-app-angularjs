import {ngmodule} from "../ngmodule"
/**
 * This service stores and retrieves user preferences in session storage
 */
class AppConfig {
  constructor() {
    this.sort = '+date';
    this.emailAddress = undefined;
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

ngmodule.value('AppConfig', new AppConfig().load());

