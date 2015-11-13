import {SessionStorage} from "../util/sessionstorage"
import {app} from "../app_module"

class ContactsService extends SessionStorage {
  constructor($http, $timeout, $q) {
    // http://beta.json-generator.com/api/json/get/V1g6UwwGx
    super($http, $timeout, $q, "contacts", "data/contacts.json");
  }
}

app.service("Contacts", ContactsService);
