"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sessionStorage_1 = require("../util/sessionStorage");
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
var Contacts = (function (_super) {
    __extends(Contacts, _super);
    function Contacts($http, $timeout, $q, AppConfig) {
        // http://beta.json-generator.com/api/json/get/V1g6UwwGx
        _super.call(this, $http, $timeout, $q, "contacts", "data/contacts.json", AppConfig);
    }
    return Contacts;
}(sessionStorage_1.SessionStorage));
exports.Contacts = Contacts;
/** A fake Folders REST client API */
var Folders = (function (_super) {
    __extends(Folders, _super);
    function Folders($http, $timeout, $q, AppConfig) {
        _super.call(this, $http, $timeout, $q, 'folders', 'data/folders.json', AppConfig);
    }
    return Folders;
}(sessionStorage_1.SessionStorage));
exports.Folders = Folders;
/** A fake Messages REST client API */
var Messages = (function (_super) {
    __extends(Messages, _super);
    function Messages($http, $timeout, $q, AppConfig) {
        // http://beta.json-generator.com/api/json/get/VJl5GbIze
        _super.call(this, $http, $timeout, $q, 'messages', 'data/messages.json', AppConfig);
    }
    Messages.prototype.byFolder = function (folder) {
        var searchObject = { folder: folder._id };
        var toFromAttr = ["drafts", "sent"].indexOf(folder) !== -1 ? "from" : "to";
        searchObject[toFromAttr] = this.AppConfig.emailAddress;
        return this.search(searchObject);
    };
    return Messages;
}(sessionStorage_1.SessionStorage));
exports.Messages = Messages;
//# sourceMappingURL=dataSources.service.js.map