export let pushToArr = (array, item) => { array.push(item); return array; };
export let uniqReduce = (arr, item) => arr.indexOf(item) !== -1 ? arr : pushToArr(arr, item);
export let flattenReduce = (arr, item) => arr.concat(item);
