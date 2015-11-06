import {IPromise} from "angular";

import {folderState} from "./folder";
import {messagesState} from "./folders"
import {MessagesService} from "./messages_service";

export interface Message {
  read: boolean;
  subject: string;
  tag: string;
  message: string;
  senderEmail: string;
}

export interface MessagesSvc {
  byFolder(folder: string): IPromise<Message[]>;
  folders(): IPromise<string[]>;
}

let states = [messagesState, folderState];
let services = [MessagesService];
export {states, services};

