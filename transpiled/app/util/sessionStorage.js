"use strict";
var util_1 = require("./util");
/**
 * This class simulates a RESTful resource, but the API calls fetch data from
 * Session Storage instead of an HTTP call.
 *
 * Once configured, it loads the initial (pristine) data from the URL provided (using HTTP).
 * It exposes GET/PUT/POST/DELETE-like API that operates on the data.  All the data is also
 * stored in Session Storage.  If any data is modified in memory, session storage is updated.
 * If the browser is refreshed, the SessionStorage object will try to fetch the existing data from
 * the session, before falling back to re-fetching the initial data using HTTP.
 *
 * For an example, please see dataSources.js
 */
var SessionStorage = (function () {
    /**
     * Creates a new SessionStorage object
     *
     * @param $http Pass in the $http service
     * @param $timeout Pass in the $timeout service
     * @param $q Pass in the $q service
     * @param sessionStorageKey The session storage key. The data will be stored in browser's session storage under this key.
     * @param sourceUrl The url that contains the initial data.
     * @param AppConfig Pass in the AppConfig object
     */
    function SessionStorage($http, $timeout, $q, sessionStorageKey, sourceUrl, AppConfig) {
        var _this = this;
        var data, fromSession = sessionStorage.getItem(sessionStorageKey);
        // A promise for *all* of the data.
        this._data = undefined;
        // For each data object, the _idProp defines which property has that object's unique identifier
        this._idProp = "_id";
        // A basic triple-equals equality checker for two values
        this._eqFn = function (l, r) { return l[_this._idProp] === r[_this._idProp]; };
        // Services required to implement the fake REST API
        this.$q = $q;
        this.$timeout = $timeout;
        this.sessionStorageKey = sessionStorageKey;
        this.AppConfig = AppConfig; // Used to get the REST latency simulator,
        if (fromSession) {
            try {
                // Try to parse the existing data from the Session Storage API
                data = JSON.parse(fromSession);
            }
            catch (e) {
                console.log("Unable to parse session messages, retrieving intial data.");
            }
        }
        var stripHashKey = function (obj) {
            return util_1.setProp(obj, '$$hashKey', undefined);
        };
        // Create a promise for the data; Either the existing data from session storage, or the initial data via $http request
        this._data = (data ? $q.resolve(data) : $http.get(sourceUrl).then(function (resp) { return resp.data; }))
            .then(this._commit.bind(this))
            .then(function () { return JSON.parse(sessionStorage.getItem(sessionStorageKey)); })
            .then(function (array) { return array.map(stripHashKey); });
    }
    /** Saves all the data back to the session storage */
    SessionStorage.prototype._commit = function (data) {
        sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(data));
        return this.$q.resolve(data);
    };
    /** Helper which simulates a delay, then provides the `thenFn` with the data */
    SessionStorage.prototype.all = function (thenFn) {
        var _this = this;
        return this.$timeout(function () { return _this._data; }, this.AppConfig.restDelay).then(thenFn);
    };
    /** Given a sample item, returns a promise for all the data for items which have the same properties as the sample */
    SessionStorage.prototype.search = function (exampleItem) {
        var contains = function (search, inString) {
            return ("" + inString).indexOf("" + search) !== -1;
        };
        var matchesExample = function (example, item) {
            return Object.keys(example).reduce(function (memo, key) { return memo && contains(example[key], item[key]); }, true);
        };
        return this.all(function (items) {
            return items.filter(matchesExample.bind(null, exampleItem));
        });
    };
    /** Returns a promise for the item with the given identifier */
    SessionStorage.prototype.get = function (id) {
        var _this = this;
        return this.all(function (items) {
            return items.find(function (item) { return item[_this._idProp] === id; });
        });
    };
    /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
    SessionStorage.prototype.save = function (item) {
        return item[this._idProp] ? this.put(item) : this.post(item);
    };
    /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
    SessionStorage.prototype.post = function (item) {
        item[this._idProp] = util_1.guid();
        return this.all(function (items) { return util_1.pushToArr(items, item); }).then(this._commit.bind(this));
    };
    /** Returns a promise to save (PUT) an existing item. */
    SessionStorage.prototype.put = function (item, eqFn) {
        var _this = this;
        if (eqFn === void 0) { eqFn = this._eqFn; }
        return this.all(function (items) {
            var idx = items.findIndex(eqFn.bind(null, item));
            if (idx === -1)
                throw Error(item + " not found in " + _this);
            items[idx] = item;
            return _this._commit(items).then(function () { return item; });
        });
    };
    /** Returns a promise to remove (DELETE) an item. */
    SessionStorage.prototype.remove = function (item, eqFn) {
        var _this = this;
        if (eqFn === void 0) { eqFn = this._eqFn; }
        return this.all(function (items) {
            var idx = items.findIndex(eqFn.bind(null, item));
            if (idx === -1)
                throw Error(item + " not found in " + _this);
            items.splice(idx, 1);
            return _this._commit(items).then(function () { return item; });
        });
    };
    return SessionStorage;
}());
exports.SessionStorage = SessionStorage;
//# sourceMappingURL=sessionStorage.js.map