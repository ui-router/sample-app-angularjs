import {uniqReduce} from "../util/util";
import {SessionStorage} from "../util/sessionstorage"
import {app} from "../app_module"

class MessagesService extends SessionStorage {
  constructor($http, $timeout, $q) {
    // http://beta.json-generator.com/api/json/get/VJl5GbIze
    super($http, $timeout, $q, 'messages', 'data/messages.json');
  }

  byFolder = (folder) => this._search({ tag: folder });
  folders = () => this._all(msgs => msgs.map(msg => msg.tag).reduce(uniqReduce, []))
}

app.service("Messages", MessagesService);
