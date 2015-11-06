import {IPromise} from "angular"
import {MessagesSvc} from "./messages_iface";

let foldersTemplate = `
  <div>
    <ul>
      <li ui-sref=".folder({folderId: folder})" ui-sref-active="active" ng-repeat="folder in folders.folders">{{folder}}</li>
    </ul>
  </div>
`;

let folders = (MessagesService: MessagesSvc) => MessagesService.folders();

class FoldersController {
  constructor(public folders: string[]) {}
}

let messagesState = {
  parent: "app",
  name: "messages",
  url: "/messages",
  resolve: { folders },
  template: foldersTemplate,
  controller: FoldersController,
  controllerAs: "folders"
};

export {messagesState}