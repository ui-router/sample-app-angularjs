import {IPromise} from "angular";

interface Message {
  read: boolean;
  subject: string;
  tag: string;
  message: string;
  senderEmail: string;
}

interface MessagesSvc {
  byFolder(folder: string): IPromise<Message[]>;
  folders(): IPromise<string[]>;
}

export {Message, MessagesSvc};