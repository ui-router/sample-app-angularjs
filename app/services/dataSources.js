import {uniqReduce} from "../util/util";
import {SessionStorage} from "../util/sessionStorage"
import {ngmodule} from "../ngmodule"

/**
 * Fake REST Services (Contacts, Folders, Messages) used in the mymessages submodule.
 *
 * Each of these APIs have:
 *
 * .all()
 * .search(exampleItem)
 * .get(id)
 * .save(item)
 * .post(item)
 * .put(item)
 * .remove(item)
 *
 * See ../util/sessionStorage.js for more details, if curious
 */

/** A fake Contacts REST client API */
class ContactsService extends SessionStorage {
  constructor($http, $timeout, $q, AppConfig) {
    // http://beta.json-generator.com/api/json/get/V1g6UwwGx
    super($http, $timeout, $q, "contacts", "data/contacts.json", AppConfig);
  }
}

/** A fake Folders REST client API */
class FoldersService extends SessionStorage {
  constructor($http, $timeout, $q, AppConfig) {
    super($http, $timeout, $q, 'folders', 'data/folders.json', AppConfig);
  }
}

/** A fake Messages REST client API */
class MessagesService extends SessionStorage {
  constructor($http, $timeout, $q, AppConfig) {
    // http://beta.json-generator.com/api/json/get/VJl5GbIze
    super($http, $timeout, $q, 'messages', 'data/messages.json', AppConfig);
  }

  byFolder(folder) {
    let searchObject = { folder: folder._id };
    let toFromAttr = ["drafts", "sent"].indexOf(folder) !== -1 ? "from" : "to";
    searchObject[toFromAttr] = this.AppConfig.emailAddress;
    return this.search(searchObject);
  }
}


ngmodule.service("Contacts", ContactsService);
ngmodule.service("Folders", FoldersService);
ngmodule.service("Messages", MessagesService);
