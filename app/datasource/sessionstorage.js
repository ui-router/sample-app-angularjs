import {pushToArr, guid} from "../util/util";

/**
 * This class simulates a RESTful resource using Session Storage
 */
class SessionStorage {
  _data; // promise for all data
  _id = "_id";
  _eqFn = (l, r) => l[this._id] === r[this._id];
  $q;

  constructor($http, $timeout, $q, sessionStorageKey, sourceUrl) {
    let data, fromSession = sessionStorage.getItem(sessionStorageKey);
    this.$q = $q;

    if (fromSession) {
      try {
        data = JSON.parse(fromSession);
      } catch (e) {
        console.log("Unable to parse session messages, retrieving from json-generator.com...");
      }
    }

    let initial = data ? $q.when(data) : $http.get(sourceUrl).then(resp => resp.data);
    initial = initial.then(this._commit);
    this._data = initial.then(() => JSON.parse(sessionStorage.getItem(sessionStorageKey)));
  }

  _commit = (data) => this.$q.when(sessionStorage.setItem(sessionStorageKey, JSON.stringify(data)));

  _all = (thenFn) => $timeout(() => this._data).then(thenFn);   // TODO: use DemoPrefs.delay

  _search(exampleItem) {
    let contains = (search, inString) => ("" + inString).indexOf("" + search) !== -1;
    let matchesExample = (example, item) =>
        Object.keys(example).reduce((memo, key) => memo && contains(example[key], item[key]), true);
    return this._all(items => items.filter(matchesExample.bind(null, exampleItem)));
  }

  _get = (id) => this._all(items => items.find(item => item[this._id] === id));

  _post(item) {
    item[this._id] = guid();
    return this._all(items => pushToArr(items, item)).then(this._commit);
  }

  _put = (item, eqFn = this._eqFn) => this._all(items => {
    let idx = items.findIndex(eqFn.bind(null, item));
    if (idx === -1) throw Error(`${item} not found in ${this}`);
    items[idx] = item;
    return this._commit(items);
  });

  _delete = (item, eqFn = this._eqFn) => this._all(items => {
    let idx = items.findIndex(eqFn.bind(null, item));
    if (idx === -1) throw Error(`${item} not found in ${this}`);
    items.splice(idx, 1);
    return this._commit(items);
  });
}

export {SessionStorage}
