import {uniqReduce} from "./util/util";
import {SessionStorage} from "./util/sessionStorage"
import {app} from "./_app"

class ContactsService extends SessionStorage {
  constructor($http, $timeout, $q) {
    // http://beta.json-generator.com/api/json/get/V1g6UwwGx
    super($http, $timeout, $q, "contacts", "data/contacts.json");
  }
}

class FoldersService extends SessionStorage {
  constructor($http, $timeout, $q) {
    super($http, $timeout, $q, 'folders', 'data/folders.json');
  }
}

class MessagesService extends SessionStorage {
  constructor($http, $timeout, $q, AppConfig) {
    // http://beta.json-generator.com/api/json/get/VJl5GbIze
    super($http, $timeout, $q, 'messages', 'data/messages.json');
    this.AppConfig = AppConfig;
  }

  byFolder(folder) {
    let searchObject = { folder: folder };
    let toFromAttr = ["drafts", "sent"].indexOf(folder) !== -1 ? "from" : "to";
    searchObject[toFromAttr] = this.AppConfig.emailAddress;
    return this.search(searchObject);
  }
}


app.service("Contacts", ContactsService);
app.service("Folders", FoldersService);
app.service("Messages", MessagesService);
