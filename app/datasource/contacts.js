import {angular} from "angular"
import {uniqReduce} from "../util/util";
import {app} from "../app_module"

class Contact {
  constructor(raw) { angular.extend(this, raw); }
  toString = () => `${this.name.last}, ${this.name.first} <${this.email}>`
}

class ContactsService {
  constructor($http, $timeout, $q) {
    super($http, $timeout, $q, "contacts", "http://beta.json-generator.com/api/json/get/V1g6UwwGx");
  }
  _get = (thenFn) => super._get(rawContacts => rawContacts.map(c => new Contact(c))).then(thenFn);
  search = (string) => this._get(contacts => contacts.map(c => c.toString()).filter(c => c.indexOf(string) !== -1));
}

app.service("Contacts", ContactsService);
export {ContactsService}
