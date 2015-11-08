import {uniqReduce} from "../util/util";
import {app} from "../app_module"

const propEq = (propName, value) => (obj) =>
    obj[propName] === value;

class MessagesService {
  _messages;

  constructor($http) {
    this._messages = $http.get("http://beta.json-generator.com/api/json/get/VJl5GbIze").then(resp => resp.data);
  }

  byId = (messageId) => this._messages.then(msgs => msgs.find(propEq('_id', messageId)));
  byFolder = (folder) => this._messages.then(msgs => msgs.filter(propEq('tag', folder)));
  folders = () => this._messages.then(msgs => msgs.map(msg => msg.tag).reduce(uniqReduce, []))
}

app.service("Messages", MessagesService);
export {MessagesService}
