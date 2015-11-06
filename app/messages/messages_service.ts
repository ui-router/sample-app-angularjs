import {app} from '../module';
import {uniqReduce} from "../util/util";
import {Message, MessagesSvc} from "./messages_iface";
import IPromise = angular.IPromise;

class MessagesService implements MessagesSvc {
  private _messages: IPromise<Message[]>;

  constructor($http) {
    this._messages = $http.get("http://beta.json-generator.com/api/json/get/VJl5GbIze").then(resp => resp.data);
  }

  byFolder = (folder: string) => this._messages.then(messages => messages.filter(msg => msg.tag === folder));
  folders = () => this._messages.then(messages => messages.map(msg => msg.tag).reduce(uniqReduce, []))
}

app.service("MessagesService", MessagesService);

export {MessagesService}
