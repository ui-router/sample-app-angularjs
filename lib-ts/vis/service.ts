/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

import angular from "angular";

let moduleName = "ui.router.demo.vissvc";
export default moduleName;
let app = angular.module(moduleName, ['ui.router']);

app.service("uirStateVisService", ($state, $interval) => {
  let nodes = [];

  const nodeForState = (state) => nodes.filter(node => node.name === state.name)[0];

  const pollStates = () => {
    let all = (<any[]> $state.get()).map((s: any) => s.$$state());
    let known = nodes.map(Object.getPrototypeOf);
    let toAdd = all.filter(s => known.indexOf(s) === -1);
    let toDel = known.filter(s => all.indexOf(s) === -1);

    if (toAdd.length || toDel.length) {
      toAdd.map(s => Object.create(s)).forEach(n => nodes.push(n));
      // todo: del.forEach(blah)

      // Rebuild each node's children array
      nodes.forEach((n: any) => n.children = []);
      nodes.forEach((n: any) => {
        if (!n || !n.parent) return;
        let parentNode = nodeForState(n.parent);
        if (!parentNode) return;
        parentNode.children.push(n);
        n._parent = parentNode;
      });
    }
  };

  pollStates();
  let cancel = $interval(pollStates, 50);

  return {
    nodes: nodes,
    cancel: cancel
  };
});
