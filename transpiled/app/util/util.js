/** Some utility functions used by the application */
"use strict";
exports.setProp = function (obj, key, val) { obj[key] = val; return obj; };
exports.pushToArr = function (array, item) { array.push(item); return array; };
exports.uniqReduce = function (arr, item) { return arr.indexOf(item) !== -1 ? arr : exports.pushToArr(arr, item); };
exports.flattenReduce = function (arr, item) { return arr.concat(item); };
var guidChar = function (c) { return c !== 'x' && c !== 'y' ? '-' : Math.floor(Math.random() * 16).toString(16).toUpperCase(); };
exports.guid = function () { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("").map(guidChar).join(""); };
//# sourceMappingURL=util.js.map