import {SessionStorage} from "../util/sessionStorage"

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
export class Contacts extends SessionStorage {
  constructor($http, $timeout, $q, AppConfig) {
    // http://beta.json-generator.com/api/json/get/V1g6UwwGx
    super($http, $timeout, $q, "contacts", "data/contacts.json", AppConfig);
  }
}
Contacts.$inject = ['$http', '$timeout', '$q', 'AppConfig'];

/** A fake Folders REST client API */
export class Folders extends SessionStorage {
  constructor($http, $timeout, $q, AppConfig) {
    super($http, $timeout, $q, 'folders', 'data/folders.json', AppConfig);
  }
}
Folders.$inject = ['$http', '$timeout', '$q', 'AppConfig'];

/** A fake Messages REST client API */
export class Messages extends SessionStorage {
  constructor($http, $timeout, $q, AppConfig) {
    // http://beta.json-generator.com/api/json/get/VJl5GbIze
    super($http, $timeout, $q, 'messages', 'data/messages.json', AppConfig);
  }

  byFolder(folder) {
    let searchObject = { folder: folder._id };
    let toFromAttr = ["drafts", "sent"].indexOf(folder._id) !== -1 ? "from" : "to";
    searchObject[toFromAttr] = this.AppConfig.emailAddress;
    return this.search(searchObject);
  }
}
Messages.$inject = ['$http', '$timeout', '$q', 'AppConfig'];
