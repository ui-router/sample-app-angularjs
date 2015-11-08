/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

import angular from "angular";

let moduleName = "ui.router.demo.vissvc";
export default moduleName;
let app = angular.module(moduleName, ['ui.router']);

/**
 * This service watches for state lifecycle (added/removed).  It maintains an array of states (wrapped as nodes).
 * When transitions occur, it applies transition metadata to the nodes.
 */
app.service("uirStateVisService", ($state, $interval) => {
  let nodes = [];

  const nodeForState: (any) => INode = (state) => nodes.filter(node => node.name === state.name)[0];

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
    nodeForState: nodeForState,
    nodes: nodes,
    cancel: cancel
  };
});


export interface INode {
  label:      string;
  highlight:     boolean;
  active:     boolean;
  retained:   boolean;
  exited:     boolean;
  entered:    boolean;
  inactive:   boolean;
}

app.run(($rootScope, $injector, uirStateVisService) => {
  let nodes: INode[] = uirStateVisService.nodes;
  let nodeForState = uirStateVisService.nodeForState;

  let $transitions = $injector.get("$transitions");

  let resetMetadata = {
    label: '',
    highlight: false,
    active: false,
    retained: false,
    entered: false,
    exited: false,
    inactive: true
  };

  let applyClasses = (node) => {
    let classes = ["entered", "retained", "exited", "active", "inactive", "highlight"];
    node._classes = classes.reduce((str, clazz) => (str + (node[clazz] ? ` ${clazz} ` : '')), '');
  };

  if ($transitions) {
    $transitions.onSuccess({}, ($transition$) => {
      let tc = $transition$.treeChanges();
      const getNode = node => nodeForState(node.state);
      nodes.forEach(n => angular.extend(n, resetMetadata));

      tc.retained.concat(tc.entering).map(getNode).forEach((n: INode) => n.entered = true);
      tc.retained.map(getNode).forEach((n: INode) => n.retained = true);
      tc.exiting.map(getNode).forEach((n: INode)=> n.exited = true);
      tc.to.slice(-1).map(getNode).forEach((n: INode)=> { n.active = true; n.label = "active"});

      nodes.forEach(applyClasses)
    });

  } else {
    $rootScope.$on("$stateChangeSuccess", (evt, toState, toParams) => {
      nodes.forEach(n => angular.extend(n, resetMetadata));
      nodeForState(toState).active = true;
    })
  }
});