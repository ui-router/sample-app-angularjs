import {angular} from "angular"
import {uniqReduce} from "../util/util";
import {app} from "../app_module"

class Contact {
  constructor(raw) { angular.extend(this, raw); }
  toString = () => `${this.name.last}, ${this.name.first} <${this.email}>`
}

class ContactsService {
  _contacts;

  constructor($http) {
    this._contacts = $http.get("http://beta.json-generator.com/api/json/get/V1g6UwwGx")
        .then(resp => resp.data.map(rawContact => new Contact(rawContact)));
  }

  search = (string) => this._contacts.then(contacts => contacts.map(c => c.toString()).filter(c => c.indexOf(string) !== -1));
}

app.service("Contacts", ContactsService);
export {ContactsService}
