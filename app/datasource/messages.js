import {uniqReduce} from "../util/util";
import {SessionStorage} from "./sessionstorage"
import {app} from "../app_module"

let sessionKey = 'messages';
let srcUrl = "http://beta.json-generator.com/api/json/get/VJl5GbIze";

class MessagesService extends SessionStorage {
  constructor($http, $timeout, $q) {
    super($http, $timeout, $q, sessionKey, srcUrl);
  }

  byFolder = (folder) => this._search({ tag: folder });
  folders = () => this._all(msgs => msgs.map(msg => msg.tag).reduce(uniqReduce, []))
}

app.service("Messages", MessagesService);
