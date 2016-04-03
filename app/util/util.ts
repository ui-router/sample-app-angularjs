/** Some utility functions used by the application */

export let setProp = (obj, key, val) => { obj[key] = val; return obj; };
export let pushToArr = (array, item) => { array.push(item); return array; };
export let uniqReduce = (arr, item) => arr.indexOf(item) !== -1 ? arr : pushToArr(arr, item);
export let flattenReduce = (arr, item) => arr.concat(item);
let guidChar = (c) => c !== 'x' && c !== 'y' ? '-' : Math.floor(Math.random()*16).toString(16).toUpperCase();
export let guid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("").map(guidChar).join("");
