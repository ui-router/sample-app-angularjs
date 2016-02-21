"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sessionStorage_1 = require("../util/sessionStorage");
var ngmodule_1 = require("../bootstrap/ngmodule");
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
var ContactsService = (function (_super) {
    __extends(ContactsService, _super);
    function ContactsService($http, $timeout, $q, AppConfig) {
        // http://beta.json-generator.com/api/json/get/V1g6UwwGx
        _super.call(this, $http, $timeout, $q, "contacts", "data/contacts.json", AppConfig);
    }
    return ContactsService;
}(sessionStorage_1.SessionStorage));
/** A fake Folders REST client API */
var FoldersService = (function (_super) {
    __extends(FoldersService, _super);
    function FoldersService($http, $timeout, $q, AppConfig) {
        _super.call(this, $http, $timeout, $q, 'folders', 'data/folders.json', AppConfig);
    }
    return FoldersService;
}(sessionStorage_1.SessionStorage));
/** A fake Messages REST client API */
var MessagesService = (function (_super) {
    __extends(MessagesService, _super);
    function MessagesService($http, $timeout, $q, AppConfig) {
        // http://beta.json-generator.com/api/json/get/VJl5GbIze
        _super.call(this, $http, $timeout, $q, 'messages', 'data/messages.json', AppConfig);
    }
    MessagesService.prototype.byFolder = function (folder) {
        var searchObject = { folder: folder._id };
        var toFromAttr = ["drafts", "sent"].indexOf(folder) !== -1 ? "from" : "to";
        searchObject[toFromAttr] = this.AppConfig.emailAddress;
        return this.search(searchObject);
    };
    return MessagesService;
}(sessionStorage_1.SessionStorage));
ngmodule_1.ngmodule.service("Contacts", ContactsService);
ngmodule_1.ngmodule.service("Folders", FoldersService);
ngmodule_1.ngmodule.service("Messages", MessagesService);
//# sourceMappingURL=dataSources.js.map