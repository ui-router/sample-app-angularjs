import {uniqReduce} from "../util/util";
import {SessionStorage} from "./sessionstorage"
import {app} from "../app_module"

const propEq = (propName, value) => (obj) => obj[propName] === value;

let sessionKey = 'messages';
let srcUrl = "http://beta.json-generator.com/api/json/get/VJl5GbIze";

class MessagesService extends SessionStorage {
  constructor($http, $timeout, $q) {
    super($http, $timeout, $q, sessionKey, srcUrl);
  }

  byId = (messageId) => this._get(msgs => msgs.find(propEq('_id', messageId)));
  byFolder = (folder) => this._get(msgs => msgs.filter(propEq('tag', folder)));
  folders = () => this._get(msgs => msgs.map(msg => msg.tag).reduce(uniqReduce, []))
}

app.service("Messages", MessagesService);
export {MessagesService}
