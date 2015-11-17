import {pushToArr, guid, setProp} from "./util";

/**
 * This class simulates a RESTful resource using Session Storage
 */
class SessionStorage {
  _data; // promise for all data
  _idProp = "_id";
  $q;
  $timeout;
  _eqFn = (l, r) => l[this._idProp] === r[this._idProp];

  constructor($http, $timeout, $q, sessionStorageKey, sourceUrl) {
    let data, fromSession = sessionStorage.getItem(sessionStorageKey);
    this.$q = $q;
    this.$timeout = $timeout;

    if (fromSession) {
      try {
        data = JSON.parse(fromSession);
      } catch (e) {
        console.log("Unable to parse session messages, retrieving from json-generator.com...");
      }
    }

    let stripHashKey = (obj) =>
        setProp(obj, '$$hashKey', undefined);

    this._data = (data ? $q.resolve(data) : $http.get(sourceUrl).then(resp => resp.data))
        .then(this._commit)
        .then(() => JSON.parse(sessionStorage.getItem(sessionStorageKey)))
        .then(array => array.map(stripHashKey));
  }

  _commit = (data) => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
    return $q.resolve(data);
  };

  all(thenFn) {
    return this.$timeout(() => this._data).then(thenFn);   // TODO: use DemoPrefs.delay
  }

  search(exampleItem) {
    let contains = (search, inString) =>
        ("" + inString).indexOf("" + search) !== -1;
    let matchesExample = (example, item) =>
        Object.keys(example).reduce((memo, key) => memo && contains(example[key], item[key]), true);
    return this.all(items =>
        items.filter(matchesExample.bind(null, exampleItem)));
  }

  get(id) {
    return this.all(items =>
        items.find(item => item[this._idProp] === id));
  }

  save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item);
  }

  post(item) {
    item[this._idProp] = guid();
    return this.all(items => pushToArr(items, item)).then(this._commit);
  }

  put(item, eqFn = this._eqFn) {
    return this.all(items => {
      let idx = items.findIndex(eqFn.bind(null, item));
      if (idx === -1) throw Error(`${item} not found in ${this}`);
      items[idx] = item;
      return this._commit(items);
    });
  }

  remove(item, eqFn = this._eqFn) {
    return this.all(items => {
      let idx = items.findIndex(eqFn.bind(null, item));
      if (idx === -1) throw Error(`${item} not found in ${this}`);
      items.splice(idx, 1);
      return this._commit(items);
    });
  }
}

export {SessionStorage}
