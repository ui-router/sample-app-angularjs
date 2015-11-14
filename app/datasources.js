import {uniqReduce} from "./util/util";
import {SessionStorage} from "./util/sessionstorage"
import {app} from "./app_module"

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
  constructor($http, $timeout, $q) {
    // http://beta.json-generator.com/api/json/get/VJl5GbIze
    super($http, $timeout, $q, 'messages', 'data/messages.json');
  }

  byFolder = (folder) => this.search({ folder: folder });
}


app.service("Contacts", ContactsService);
app.service("Folders", FoldersService);
app.service("Messages", MessagesService);
