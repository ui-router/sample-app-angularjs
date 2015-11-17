import d3 from "d3";
import angular from "angular";
import d3ng from "./d3ng";
import easing from "./easing";
import visSvc from "./service"

let moduleName = "statevis";
export let app = angular.module(moduleName, ['ui.router', visSvc, d3ng, easing]);
export default moduleName;
