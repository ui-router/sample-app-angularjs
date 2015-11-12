import {uniqReduce} from "../util/util";
import {SessionStorage} from "../util/sessionstorage"
import {app} from "../app_module"

class MessagesService extends SessionStorage {
  constructor($http, $timeout, $q) {
    super($http, $timeout, $q, 'messages', 'http://beta.json-generator.com/api/json/get/VJl5GbIze');
  }

  byFolder = (folder) => this._search({ tag: folder });
  folders = () => this._all(msgs => msgs.map(msg => msg.tag).reduce(uniqReduce, []))
}

app.service("Messages", MessagesService);
