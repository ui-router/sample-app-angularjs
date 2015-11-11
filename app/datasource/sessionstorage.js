class SessionStorage {
  _data;

  constructor($http, $timeout, $q, sessionStorageKey, sourceUrl) {
    let data, fromSession = sessionStorage.getItem(sessionStorageKey);

    if (fromSession) {
      try {
        data = JSON.parse(fromSession);
      } catch (e) {
        console.log("Unable to parse session messages, retrieving from json-generator.com...");
      }
    }

    let initial = data ? $q.when(data) : $http.get(sourceUrl).then(resp => resp.data);
    initial = initial.then(data => sessionStorage.setItem(sessionStorageKey, JSON.stringify(data)));
    this._data = initial.then(() => JSON.parse(sessionStorage.getItem(sessionStorageKey)));
  }

  //delayedGet = () => $timeout(() => this._data, 200);   // TODO: use DemoPrefs.delay
  _get = (thenFn) => $timeout(() => this._data, 200).then(thenFn);   // TODO: use DemoPrefs.delay
}

export {SessionStorage}
