import {angular} from "angular"
import {SessionStorage} from "./sessionstorage"
import {uniqReduce} from "../util/util";
import {app} from "../app_module"

class Contact {
  constructor(raw) { angular.extend(this, raw); }
  toString = () => `${this.name.last}, ${this.name.first} <${this.email}>`
}

class ContactsService extends SessionStorage {
  constructor($http, $timeout, $q) {
    super($http, $timeout, $q, "contacts", "http://beta.json-generator.com/api/json/get/V1g6UwwGx");
  }
}

app.service("Contacts", ContactsService);
