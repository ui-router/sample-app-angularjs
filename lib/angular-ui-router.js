(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ui.router"] = factory();
	else
		root["ui.router"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var common = __webpack_require__(2);
	exports.common = common;
	var params = __webpack_require__(24);
	exports.params = params;
	var path = __webpack_require__(30);
	exports.path = path;
	var resolve = __webpack_require__(31);
	exports.resolve = resolve;
	var state = __webpack_require__(32);
	exports.state = state;
	var transition = __webpack_require__(44);
	exports.transition = transition;
	var url = __webpack_require__(45);
	exports.url = url;
	var view = __webpack_require__(49);
	exports.view = view;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "ui.router";
	//# sourceMappingURL=ui-router.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var angular1 = __webpack_require__(3);
	exports.angular1 = angular1;
	var common = __webpack_require__(4);
	exports.common = common;
	var queue = __webpack_require__(5);
	exports.queue = queue;
	var trace = __webpack_require__(6);
	exports.trace = trace;
	//# sourceMappingURL=module.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	var app = angular.module("ui.router.angular1", []);
	exports.runtime = {
	    setRuntimeInjector: function ($injector) {
	        exports.runtime.$injector = $injector;
	        exports.runtime.$q = $injector.get("$q");
	    },
	    $injector: undefined,
	    $q: undefined
	};
	function annotateController(controllerExpression) {
	    var $injector = exports.runtime.$injector;
	    var $controller = $injector.get("$controller");
	    var oldInstantiate = $injector.instantiate;
	    try {
	        var deps;
	        $injector.instantiate = function fakeInstantiate(constructorFunction) {
	            $injector.instantiate = oldInstantiate;
	            deps = $injector.annotate(constructorFunction);
	        };
	        $controller(controllerExpression, { $scope: {} });
	        return deps;
	    }
	    finally {
	        $injector.instantiate = oldInstantiate;
	    }
	}
	exports.annotateController = annotateController;
	runBlock.$inject = ["$injector"];
	function runBlock($injector) {
	    exports.runtime.setRuntimeInjector($injector);
	}
	app.run(runBlock);
	//# sourceMappingURL=angular1.js.map

/***/ },
/* 4 */
/***/ function(module, exports) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var isDefined = angular.isDefined, isFunction = angular.isFunction, isNumber = angular.isNumber, isString = angular.isString, isObject = angular.isObject, isArray = angular.isArray, forEach = angular.forEach, extend = angular.extend, copy = angular.copy, noop = angular.noop, toJson = angular.toJson, fromJson = angular.fromJson, equals = angular.equals, identity = angular.identity;
	exports.isDefined = isDefined;
	exports.isFunction = isFunction;
	exports.isNumber = isNumber;
	exports.isString = isString;
	exports.isObject = isObject;
	exports.isArray = isArray;
	exports.forEach = forEach;
	exports.extend = extend;
	exports.copy = copy;
	exports.noop = noop;
	exports.toJson = toJson;
	exports.fromJson = fromJson;
	exports.equals = equals;
	exports.identity = identity;
	exports.abstractKey = 'abstract';
	function curry(fn) {
	    var initial_args = [].slice.apply(arguments, [1]);
	    var func_args_length = fn.length;
	    function curried(args) {
	        if (args.length >= func_args_length)
	            return fn.apply(null, args);
	        return function () {
	            return curried(args.concat([].slice.apply(arguments)));
	        };
	    }
	    return curried(initial_args);
	}
	exports.curry = curry;
	function compose() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	        var i = start, result = args[start].apply(this, arguments);
	        while (i--)
	            result = args[i].call(this, result);
	        return result;
	    };
	}
	exports.compose = compose;
	function pipe() {
	    var funcs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        funcs[_i - 0] = arguments[_i];
	    }
	    return compose.apply(null, [].slice.call(arguments).reverse());
	}
	exports.pipe = pipe;
	exports.prop = function (name) { return function (obj) { return obj && obj[name]; }; };
	exports.parse = function (name) { return pipe.apply(null, name.split(".").map(exports.prop)); };
	exports.not = function (fn) { return (function () { return !fn.apply(null, [].slice.call(arguments)); }); };
	function and(fn1, fn2) {
	    return function () {
	        return fn1.apply(null, [].slice.call(arguments)) && fn2.apply(null, [].slice.call(arguments));
	    };
	}
	exports.and = and;
	function or(fn1, fn2) {
	    return function () {
	        return fn1.apply(null, [].slice.call(arguments)) || fn2.apply(null, [].slice.call(arguments));
	    };
	}
	exports.or = or;
	exports.is = function (ctor) { return function (obj) { return (obj != null && obj.constructor === ctor || obj instanceof ctor); }; };
	exports.eq = function (val) { return function (other) { return val === other; }; };
	exports.val = function (v) { return function () { return v; }; };
	function invoke(fnName, args) {
	    return function (obj) { return obj[fnName].apply(obj, args); };
	}
	exports.invoke = invoke;
	function pattern(struct) {
	    return function (val) {
	        for (var i = 0; i < struct.length; i++) {
	            if (struct[i][0](val))
	                return struct[i][1](val);
	        }
	    };
	}
	exports.pattern = pattern;
	exports.inherit = function (parent, extra) { return extend(new (extend(function () { }, { prototype: parent }))(), extra); };
	var restArgs = function (args, idx) {
	    if (idx === void 0) { idx = 0; }
	    return Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(args, idx));
	};
	var inArray = function (array, obj) { return array.indexOf(obj) !== -1; };
	exports.removeFrom = function (array) { return function (obj) {
	    var idx = array.indexOf(obj);
	    if (idx >= 0)
	        array.splice(idx, 1);
	    return array;
	}; };
	function defaults(opts) {
	    if (opts === void 0) { opts = {}; }
	    var defaultsList = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        defaultsList[_i - 1] = arguments[_i];
	    }
	    var defaults = merge.apply(null, [{}].concat(defaultsList));
	    return extend({}, defaults, pick(opts || {}, Object.keys(defaults)));
	}
	exports.defaults = defaults;
	function merge(dst) {
	    var objs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        objs[_i - 1] = arguments[_i];
	    }
	    forEach(objs, function (obj) {
	        forEach(obj, function (value, key) {
	            if (!dst.hasOwnProperty(key))
	                dst[key] = value;
	        });
	    });
	    return dst;
	}
	exports.merge = merge;
	function ancestors(first, second) {
	    var path = [];
	    for (var n in first.path) {
	        if (first.path[n] !== second.path[n])
	            break;
	        path.push(first.path[n]);
	    }
	    return path;
	}
	exports.ancestors = ancestors;
	function equalForKeys(a, b, keys) {
	    if (keys === void 0) { keys = Object.keys(a); }
	    for (var i = 0; i < keys.length; i++) {
	        var k = keys[i];
	        if (a[k] != b[k])
	            return false;
	    }
	    return true;
	}
	exports.equalForKeys = equalForKeys;
	function pickOmitImpl(predicate, obj) {
	    var objCopy = {}, keys = restArgs(arguments, 2);
	    for (var key in obj) {
	        if (predicate(keys, key))
	            objCopy[key] = obj[key];
	    }
	    return objCopy;
	}
	function pick(obj) { return pickOmitImpl.apply(null, [inArray].concat(restArgs(arguments))); }
	exports.pick = pick;
	function omit(obj) { return pickOmitImpl.apply(null, [exports.not(inArray)].concat(restArgs(arguments))); }
	exports.omit = omit;
	function pluck(collection, propName) {
	    return map(collection, exports.prop(propName));
	}
	exports.pluck = pluck;
	function filter(collection, callback) {
	    var arr = isArray(collection), result = arr ? [] : {};
	    var accept = arr ? function (x) { return result.push(x); } : function (x, key) { return result[key] = x; };
	    forEach(collection, function (item, i) {
	        if (callback(item, i))
	            accept(item, i);
	    });
	    return result;
	}
	exports.filter = filter;
	function find(collection, callback) {
	    var result;
	    forEach(collection, function (item, i) {
	        if (result)
	            return;
	        if (callback(item, i))
	            result = item;
	    });
	    return result;
	}
	exports.find = find;
	function map(collection, callback) {
	    var result = isArray(collection) ? [] : {};
	    forEach(collection, function (item, i) { return result[i] = callback(item, i); });
	    return result;
	}
	exports.map = map;
	exports.push = function (arr, obj) { arr.push(obj); return arr; };
	exports.unnestR = function (memo, elem) { return memo.concat(elem); };
	exports.flattenR = function (memo, elem) { return isArray(elem) ? memo.concat(elem.reduce(exports.flattenR, [])) : exports.push(memo, elem); };
	exports.unnest = function (arr) { return arr.reduce(exports.unnestR, []); };
	exports.flatten = function (arr) { return arr.reduce(exports.flattenR, []); };
	function assertPredicate(fn, errMsg) {
	    if (errMsg === void 0) { errMsg = "assert failure"; }
	    return function (obj) {
	        if (!fn(obj))
	            throw new Error(errMsg);
	        return true;
	    };
	}
	exports.assertPredicate = assertPredicate;
	exports.pairs = function (object) { return Object.keys(object).map(function (key) { return [key, object[key]]; }); };
	exports.paired = function (left, right, mapFn) {
	    if (mapFn === void 0) { mapFn = identity; }
	    return left.map(function (lval, idx) { return [mapFn(lval), mapFn(right[idx])]; });
	};
	function applyPairs(obj, arrayOrKey, val) {
	    var key;
	    if (isDefined(val))
	        key = arrayOrKey;
	    if (isArray(arrayOrKey))
	        _a = arrayOrKey, key = _a[0], val = _a[1];
	    if (!isString(key))
	        throw new Error("invalid parameters to applyPairs");
	    obj[key] = val;
	    return obj;
	    var _a;
	}
	exports.applyPairs = applyPairs;
	function isInjectable(val) {
	    if (isArray(val) && val.length) {
	        var head = val.slice(0, -1), tail = val.slice(-1);
	        if (head.filter(exports.not(isString)).length || tail.filter(exports.not(isFunction)).length)
	            return false;
	    }
	    return isFunction(val);
	}
	exports.isInjectable = isInjectable;
	exports.isNull = function (o) { return o === null; };
	exports.isPromise = and(isObject, pipe(exports.prop('then'), isFunction));
	function fnToString(fn) {
	    var _fn = pattern([
	        [isArray, function (arr) { return arr.slice(-1)[0]; }],
	        [exports.val(true), identity]
	    ])(fn);
	    return _fn && _fn.toString() || "undefined";
	}
	exports.fnToString = fnToString;
	function maxLength(max, str) {
	    if (str.length <= max)
	        return str;
	    return str.substr(0, max - 3) + "...";
	}
	exports.maxLength = maxLength;
	function padString(length, str) {
	    while (str.length < length)
	        str += " ";
	    return str;
	}
	exports.padString = padString;
	angular.module('ui.router.util', ['ng']);
	angular.module('ui.router.router', ['ui.router.util']);
	angular.module('ui.router.state', ['ui.router.router', 'ui.router.util', 'ui.router.angular1']);
	angular.module('ui.router', ['ui.router.state', 'ui.router.angular1']);
	angular.module('ui.router.compat', ['ui.router']);
	//# sourceMappingURL=common.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	var Queue = (function () {
	    function Queue(_items) {
	        if (_items === void 0) { _items = []; }
	        this._items = _items;
	    }
	    Queue.prototype.enqueue = function (item) {
	        this._items.push(item);
	        return item;
	    };
	    Queue.prototype.dequeue = function () {
	        if (this.size())
	            return this._items.splice(0, 1)[0];
	    };
	    Queue.prototype.clear = function () {
	        var current = this._items;
	        this._items = [];
	        return current;
	    };
	    Queue.prototype.size = function () {
	        return this._items.length;
	    };
	    Queue.prototype.remove = function (item) {
	        var idx = this._items.indexOf(item);
	        return idx > -1 && this._items.splice(idx, 1)[0];
	    };
	    Queue.prototype.peekTail = function () {
	        return this._items[this._items.length - 1];
	    };
	    Queue.prototype.peekHead = function () {
	        if (this.size())
	            return this._items[0];
	    };
	    return Queue;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Queue;
	//# sourceMappingURL=queue.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var resolvable_1 = __webpack_require__(7);
	var transition_1 = __webpack_require__(8);
	var rejectFactory_1 = __webpack_require__(14);
	function promiseToString(p) {
	    if (common_1.is(rejectFactory_1.TransitionRejection)(p.reason))
	        return p.reason.toString();
	    return "Promise(" + JSON.stringify(p) + ")";
	}
	function functionToString(fn) {
	    var fnStr = common_1.fnToString(fn);
	    var namedFunctionMatch = fnStr.match(/^(function [^ ]+\([^)]*\))/);
	    return namedFunctionMatch ? namedFunctionMatch[1] : fnStr;
	}
	var uiViewString = function (viewData) {
	    return ("ui-view id#" + viewData.id + ", contextual name '" + viewData.name + "@" + viewData.creationContext + "', fqn: '" + viewData.fqn + "'");
	};
	var viewConfigString = function (viewConfig) {
	    return ("ViewConfig targeting ui-view: '" + viewConfig.uiViewName + "@" + viewConfig.uiViewContextAnchor + "', context: '" + viewConfig.context.name + "'");
	};
	function normalizedCat(input) {
	    return common_1.isNumber(input) ? Category[input] : Category[Category[input]];
	}
	var format = common_1.pattern([
	    [common_1.not(common_1.isDefined), common_1.val("undefined")],
	    [common_1.isNull, common_1.val("null")],
	    [common_1.isPromise, promiseToString],
	    [common_1.is(transition_1.Transition), common_1.invoke("toString")],
	    [common_1.is(resolvable_1.default), common_1.invoke("toString")],
	    [common_1.isInjectable, functionToString],
	    [common_1.val(true), common_1.identity]
	]);
	function stringify(o) {
	    return JSON.stringify(o, function (key, val) { return format(val); }).replace(/\\"/g, '"');
	}
	var Category;
	(function (Category) {
	    Category[Category["RESOLVE"] = 0] = "RESOLVE";
	    Category[Category["TRANSITION"] = 1] = "TRANSITION";
	    Category[Category["HOOK"] = 2] = "HOOK";
	    Category[Category["INVOKE"] = 3] = "INVOKE";
	    Category[Category["UIVIEW"] = 4] = "UIVIEW";
	    Category[Category["VIEWCONFIG"] = 5] = "VIEWCONFIG";
	})(Category || (Category = {}));
	var Trace = (function () {
	    function Trace() {
	        var _this = this;
	        this._enabled = {};
	        this.enable = function () {
	            var categories = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                categories[_i - 0] = arguments[_i];
	            }
	            return _this._set(true, categories);
	        };
	        this.disable = function () {
	            var categories = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                categories[_i - 0] = arguments[_i];
	            }
	            return _this._set(false, categories);
	        };
	        this.approximateDigests = 0;
	    }
	    Trace.prototype._set = function (enabled, categories) {
	        var _this = this;
	        if (!categories.length) {
	            categories = Object.keys(Category)
	                .filter(function (k) { return isNaN(parseInt(k, 10)); })
	                .map(function (key) { return Category[key]; });
	        }
	        categories.map(normalizedCat).forEach(function (category) { return _this._enabled[category] = enabled; });
	    };
	    Trace.prototype.enabled = function (category) {
	        return !!this._enabled[normalizedCat(category)];
	    };
	    Trace.prototype.traceTransitionStart = function (transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, transitionStr = stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": Started  -> " + transitionStr);
	    };
	    Trace.prototype.traceTransitionIgnored = function (transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, transitionStr = stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": Ignored  <> " + transitionStr);
	    };
	    Trace.prototype.traceHookInvocation = function (step, options) {
	        if (!this.enabled(Category.HOOK))
	            return;
	        var tid = common_1.parse("transition.$id")(options), digest = this.approximateDigests, event = common_1.parse("traceData.hookType")(options) || "internal", context = common_1.parse("traceData.context.state.name")(options) || common_1.parse("traceData.context")(options) || "unknown", name = functionToString(step.fn);
	        console.log("Transition #" + tid + " Digest #" + digest + ":   Hook -> " + event + " context: " + context + ", " + common_1.maxLength(200, name));
	    };
	    Trace.prototype.traceHookResult = function (hookResult, transitionResult, transitionOptions) {
	        if (!this.enabled(Category.HOOK))
	            return;
	        var tid = common_1.parse("transition.$id")(transitionOptions), digest = this.approximateDigests, hookResultStr = stringify(hookResult), transitionResultStr = stringify(transitionResult);
	        console.log("Transition #" + tid + " Digest #" + digest + ":   <- Hook returned: " + common_1.maxLength(200, hookResultStr) + ", transition result: " + common_1.maxLength(200, transitionResultStr));
	    };
	    Trace.prototype.traceResolvePath = function (path, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = common_1.parse("transition.$id")(options), digest = this.approximateDigests, pathStr = path && path.toString(), policyStr = options && options.resolvePolicy;
	        console.log("Transition #" + tid + " Digest #" + digest + ":         Resolving " + pathStr + " (" + policyStr + ")");
	    };
	    Trace.prototype.traceResolvePathElement = function (pathElement, resolvablePromises, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        if (!resolvablePromises.length)
	            return;
	        var tid = common_1.parse("transition.$id")(options), digest = this.approximateDigests, resolvablePromisesStr = Object.keys(resolvablePromises).join(", "), pathElementStr = pathElement && pathElement.toString(), policyStr = options && options.resolvePolicy;
	        console.log("Transition #" + tid + " Digest #" + digest + ":         Resolve " + pathElementStr + " resolvables: [" + resolvablePromisesStr + "] (" + policyStr + ")");
	    };
	    Trace.prototype.traceResolveResolvable = function (resolvable, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = common_1.parse("transition.$id")(options), digest = this.approximateDigests, resolvableStr = resolvable && resolvable.toString();
	        console.log("Transition #" + tid + " Digest #" + digest + ":               Resolving -> " + resolvableStr);
	    };
	    Trace.prototype.traceResolvableResolved = function (resolvable, options) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = common_1.parse("transition.$id")(options), digest = this.approximateDigests, resolvableStr = resolvable && resolvable.toString(), result = stringify(resolvable.data);
	        console.log("Transition #" + tid + " Digest #" + digest + ":               <- Resolved  " + resolvableStr + " to: " + common_1.maxLength(200, result));
	    };
	    Trace.prototype.tracePathElementInvoke = function (state, fn, deps, options) {
	        if (!this.enabled(Category.INVOKE))
	            return;
	        var tid = common_1.parse("transition.$id")(options), digest = this.approximateDigests, stateName = state && state.toString(), fnName = functionToString(fn);
	        console.log("Transition #" + tid + " Digest #" + digest + ":         Invoke " + options.when + ": context: " + stateName + " " + common_1.maxLength(200, fnName));
	    };
	    Trace.prototype.traceError = function (error, transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, transitionStr = stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": <- Rejected " + transitionStr + ", reason: " + error);
	    };
	    Trace.prototype.traceSuccess = function (finalState, transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, state = finalState.name, transitionStr = stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": <- Success  " + transitionStr + ", final state: " + state);
	    };
	    Trace.prototype.traceUiViewEvent = function (event, viewData, extra) {
	        if (extra === void 0) { extra = ""; }
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        console.log("ui-view: " + common_1.padString(30, event) + " " + uiViewString(viewData) + extra);
	    };
	    Trace.prototype.traceUiViewConfigUpdated = function (viewData, context) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUiViewEvent("Updating", viewData, " with ViewConfig from context='" + context + "'");
	    };
	    Trace.prototype.traceUiViewScopeCreated = function (viewData, newScope) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUiViewEvent("Created scope for", viewData, ", scope #" + newScope.$id);
	    };
	    Trace.prototype.traceUiViewFill = function (viewData, html) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUiViewEvent("Fill", viewData, " with: " + common_1.maxLength(200, html));
	    };
	    Trace.prototype.traceViewServiceEvent = function (event, viewConfig) {
	        if (!this.enabled(Category.VIEWCONFIG))
	            return;
	        console.log("$view.ViewConfig: " + event + " " + viewConfigString(viewConfig));
	    };
	    Trace.prototype.traceViewServiceUiViewEvent = function (event, viewData) {
	        if (!this.enabled(Category.VIEWCONFIG))
	            return;
	        console.log("$view.ViewConfig: " + event + " " + uiViewString(viewData));
	    };
	    return Trace;
	})();
	var trace = new Trace();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = trace;
	watchDigests.$inject = ['$rootScope'];
	function watchDigests($rootScope) {
	    $rootScope.$watch(function () { trace.approximateDigests++; });
	}
	angular.module("ui.router").run(watchDigests);
	angular.module("ui.router").service("$trace", function () { return trace; });
	//# sourceMappingURL=trace.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(6);
	var angular1_1 = __webpack_require__(3);
	var Resolvable = (function () {
	    function Resolvable(name, resolveFn, state) {
	        this.promise = undefined;
	        this.name = name;
	        this.resolveFn = resolveFn;
	        this.state = state;
	        this.deps = angular1_1.runtime.$injector.annotate(resolveFn);
	    }
	    Resolvable.prototype.resolveResolvable = function (resolveContext, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var _a = this, state = _a.state, name = _a.name, deps = _a.deps, resolveFn = _a.resolveFn;
	        trace_1.default.traceResolveResolvable(this, options);
	        var deferred = angular1_1.runtime.$q.defer();
	        this.promise = deferred.promise;
	        var ancestorsByName = resolveContext.getResolvables(null, { omitOwnLocals: [name] });
	        var depResolvables = common_1.pick(ancestorsByName, deps);
	        var depPromises = common_1.map(depResolvables, function (resolvable) {
	            return resolvable.get(resolveContext, options);
	        });
	        return angular1_1.runtime.$q.all(depPromises).then(function (locals) {
	            try {
	                var result = angular1_1.runtime.$injector.invoke(resolveFn, state, locals);
	                deferred.resolve(result);
	            }
	            catch (error) {
	                deferred.reject(error);
	            }
	            return _this.promise;
	        }).then(function (data) {
	            _this.data = data;
	            trace_1.default.traceResolvableResolved(_this, options);
	            return _this.promise;
	        });
	    };
	    Resolvable.prototype.get = function (resolveContext, options) {
	        return this.promise || this.resolveResolvable(resolveContext, options);
	    };
	    Resolvable.prototype.toString = function () {
	        return "Resolvable(name: " + this.name + ", state: " + this.state.name + ", requires: [" + this.deps + "])";
	    };
	    return Resolvable;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Resolvable;
	//# sourceMappingURL=resolvable.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var angular1_1 = __webpack_require__(3);
	var trace_1 = __webpack_require__(6);
	var transitionService_1 = __webpack_require__(9);
	var hookRegistry_1 = __webpack_require__(10);
	var hookBuilder_1 = __webpack_require__(12);
	var transitionRunner_1 = __webpack_require__(15);
	var rejectFactory_1 = __webpack_require__(14);
	var pathFactory_1 = __webpack_require__(16);
	var targetState_1 = __webpack_require__(18);
	var common_1 = __webpack_require__(4);
	var transitionCount = 0, REJECT = new rejectFactory_1.RejectFactory();
	var stateSelf = common_1.prop("self");
	var Transition = (function () {
	    function Transition(fromPath, targetState) {
	        var _this = this;
	        this._deferred = angular1_1.runtime.$q.defer();
	        this.promise = this._deferred.promise;
	        this.treeChanges = function () { return _this._treeChanges; };
	        this.isActive = function () { return _this === _this._options.current(); };
	        if (!targetState.valid()) {
	            throw new Error(targetState.error());
	        }
	        hookRegistry_1.HookRegistry.mixin(new hookRegistry_1.HookRegistry(), this);
	        this._options = common_1.extend({ current: common_1.val(this) }, targetState.options());
	        this.$id = transitionCount++;
	        var toPath = pathFactory_1.default.buildToPath(fromPath, targetState);
	        this._treeChanges = pathFactory_1.default.treeChanges(fromPath, toPath, this._options.reloadState);
	    }
	    Transition.prototype.$from = function () {
	        return this._treeChanges.from.last().state;
	    };
	    Transition.prototype.$to = function () {
	        return this._treeChanges.to.last().state;
	    };
	    Transition.prototype.from = function () {
	        return this.$from().self;
	    };
	    Transition.prototype.to = function () {
	        return this.$to().self;
	    };
	    Transition.prototype.is = function (compare) {
	        if (compare instanceof Transition) {
	            return this.is({ to: compare.$to().name, from: compare.$from().name });
	        }
	        return !((compare.to && !hookRegistry_1.matchState(this.$to(), compare.to)) ||
	            (compare.from && !hookRegistry_1.matchState(this.$from(), compare.from)));
	    };
	    Transition.prototype.params = function (pathname) {
	        if (pathname === void 0) { pathname = "to"; }
	        return this._treeChanges[pathname].last().paramValues;
	    };
	    Transition.prototype.previous = function () {
	        return this._options.previous || null;
	    };
	    Transition.prototype.options = function () {
	        return this._options;
	    };
	    Transition.prototype.entering = function () {
	        return this._treeChanges.entering.states().map(stateSelf);
	    };
	    Transition.prototype.exiting = function () {
	        return this._treeChanges.exiting.states().map(stateSelf).reverse();
	    };
	    Transition.prototype.retained = function () {
	        return this._treeChanges.retained.states().map(stateSelf);
	    };
	    Transition.prototype.views = function (pathname, state) {
	        if (pathname === void 0) { pathname = "entering"; }
	        var path = this._treeChanges[pathname];
	        return state ? path.nodeForState(state).views : common_1.unnest(path.nodes().map(common_1.prop("views")));
	    };
	    Transition.prototype.redirect = function (targetState) {
	        var newOptions = common_1.extend({}, this.options(), targetState.options(), { previous: this });
	        targetState = new targetState_1.default(targetState.identifier(), targetState.$state(), targetState.params(), newOptions);
	        var redirectTo = new Transition(this._treeChanges.from, targetState);
	        var redirectedPath = this.treeChanges().to;
	        var matching = redirectTo.treeChanges().to.matching(redirectedPath);
	        matching.nodes().forEach(function (node, idx) { return node.ownResolvables = redirectedPath.nodes()[idx].ownResolvables; });
	        return redirectTo;
	    };
	    Transition.prototype.ignored = function () {
	        var _a = this._treeChanges, to = _a.to, from = _a.from;
	        var _b = [to, from].map(function (path) { return path.last().state; }), toState = _b[0], fromState = _b[1];
	        var _c = [to, from].map(function (path) { return path.last().paramValues; }), toParams = _c[0], fromParams = _c[1];
	        return !this._options.reload &&
	            toState === fromState &&
	            toState.params.$$filter(common_1.not(common_1.prop('dynamic'))).$$equals(toParams, fromParams);
	    };
	    Transition.prototype.hookBuilder = function () {
	        var baseHookOptions = {
	            transition: this,
	            current: this._options.current
	        };
	        return new hookBuilder_1.default(transitionService_1.default, this, baseHookOptions);
	    };
	    Transition.prototype.run = function () {
	        var _this = this;
	        if (!this.valid()) {
	            var error = new Error(this.error());
	            this._deferred.reject(error);
	            throw error;
	        }
	        trace_1.default.traceTransitionStart(this);
	        if (this.ignored()) {
	            trace_1.default.traceTransitionIgnored(this);
	            var ignored = REJECT.ignored();
	            this._deferred.reject(ignored.reason);
	            return this.promise;
	        }
	        var resolve = function () {
	            _this._deferred.resolve(_this);
	            trace_1.default.traceSuccess(_this.$to(), _this);
	        };
	        var reject = function (error) {
	            _this._deferred.reject(error);
	            trace_1.default.traceError(error, _this);
	            return angular1_1.runtime.$q.reject(error);
	        };
	        new transitionRunner_1.default(this, resolve, reject).run();
	        return this.promise;
	    };
	    Transition.prototype.valid = function () {
	        return !this.error();
	    };
	    Transition.prototype.error = function () {
	        var state = this._treeChanges.to.last().state;
	        if (state.self[common_1.abstractKey])
	            return "Cannot transition to abstract state '" + state.name + "'";
	        if (!state.params.$$validates(this.params()))
	            return "Param values not valid for state '" + state.name + "'";
	    };
	    Transition.prototype.toString = function () {
	        var fromStateOrName = this.from();
	        var toStateOrName = this.to();
	        var avoidEmptyHash = function (params) {
	            return (params["#"] !== null && params["#"] !== undefined) ? params : common_1.omit(params, "#");
	        };
	        var id = this.$id, from = common_1.isObject(fromStateOrName) ? fromStateOrName.name : fromStateOrName, fromParams = common_1.toJson(avoidEmptyHash(this._treeChanges.from.last().paramValues)), toValid = this.valid() ? "" : "(X) ", to = common_1.isObject(toStateOrName) ? toStateOrName.name : toStateOrName, toParams = common_1.toJson(avoidEmptyHash(this.params()));
	        return "Transition#" + id + "( '" + from + "'" + fromParams + " -> " + toValid + "'" + to + "'" + toParams + " )";
	    };
	    return Transition;
	})();
	exports.Transition = Transition;
	//# sourceMappingURL=transition.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var transition_1 = __webpack_require__(8);
	var hookRegistry_1 = __webpack_require__(10);
	exports.defaultTransOpts = {
	    location: true,
	    relative: null,
	    inherit: false,
	    notify: true,
	    reload: false,
	    custom: {},
	    current: function () { return null; }
	};
	var TransitionService = (function () {
	    function TransitionService() {
	        this._defaultErrorHandler = function $defaultErrorHandler($error$) {
	            if ($error$ instanceof Error)
	                console.log($error$);
	        };
	        this._reinit();
	    }
	    TransitionService.prototype.defaultErrorHandler = function (handler) {
	        if (arguments.length)
	            this._defaultErrorHandler = handler;
	        return this._defaultErrorHandler;
	    };
	    TransitionService.prototype._reinit = function () {
	        hookRegistry_1.HookRegistry.mixin(new hookRegistry_1.HookRegistry(), this);
	    };
	    TransitionService.prototype.create = function (fromPath, targetState) {
	        return new transition_1.Transition(fromPath, targetState);
	    };
	    return TransitionService;
	})();
	var $transitions = new TransitionService();
	$TransitionProvider.prototype = $transitions;
	function $TransitionProvider() {
	    this._reinit.bind($transitions)();
	    this.$get = function $get() {
	        return $transitions;
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = $transitions;
	exports.$transitionsProvider = $TransitionProvider;
	angular.module('ui.router.state')
	    .provider('$transitions', exports.$transitionsProvider);
	//# sourceMappingURL=transitionService.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var glob_1 = __webpack_require__(11);
	function matchState(state, matchCriteria) {
	    var toMatch = common_1.isString(matchCriteria) ? [matchCriteria] : matchCriteria;
	    function matchGlobs(_state) {
	        for (var i = 0; i < toMatch.length; i++) {
	            var glob = glob_1.default.fromString(toMatch[i]);
	            if ((glob && glob.matches(_state.name)) || (!glob && toMatch[i] === _state.name)) {
	                return true;
	            }
	        }
	        return false;
	    }
	    var matchFn = (common_1.isFunction(toMatch) ? toMatch : matchGlobs);
	    return !!matchFn(state);
	}
	exports.matchState = matchState;
	var EventHook = (function () {
	    function EventHook(matchCriteria, callback, options) {
	        if (options === void 0) { options = {}; }
	        this.callback = callback;
	        this.matchCriteria = common_1.extend({ to: common_1.val(true), from: common_1.val(true) }, matchCriteria);
	        this.priority = options.priority || 0;
	    }
	    EventHook.prototype.matches = function (to, from) {
	        return matchState(to, this.matchCriteria.to) && matchState(from, this.matchCriteria.from);
	    };
	    return EventHook;
	})();
	exports.EventHook = EventHook;
	function makeHookRegistrationFn(hooks, name) {
	    return function (matchObject, callback, options) {
	        if (options === void 0) { options = {}; }
	        var eventHook = new EventHook(matchObject, callback, options);
	        hooks[name].push(eventHook);
	        return function deregisterEventHook() {
	            common_1.removeFrom(hooks[name])(eventHook);
	        };
	    };
	}
	var HookRegistry = (function () {
	    function HookRegistry() {
	        var _this = this;
	        this._transitionEvents = {
	            onBefore: [], onStart: [], onEnter: [], onRetain: [], onExit: [], onFinish: [], onSuccess: [], onError: []
	        };
	        this.getHooks = function (name) { return _this._transitionEvents[name]; };
	        this.onBefore = makeHookRegistrationFn(this._transitionEvents, "onBefore");
	        this.onStart = makeHookRegistrationFn(this._transitionEvents, "onStart");
	        this.onEnter = makeHookRegistrationFn(this._transitionEvents, "onEnter");
	        this.onRetain = makeHookRegistrationFn(this._transitionEvents, "onRetain");
	        this.onExit = makeHookRegistrationFn(this._transitionEvents, "onExit");
	        this.onFinish = makeHookRegistrationFn(this._transitionEvents, "onFinish");
	        this.onSuccess = makeHookRegistrationFn(this._transitionEvents, "onSuccess");
	        this.onError = makeHookRegistrationFn(this._transitionEvents, "onError");
	    }
	    HookRegistry.mixin = function (source, target) {
	        Object.keys(source._transitionEvents).concat(["getHooks"]).forEach(function (key) { return target[key] = source[key]; });
	    };
	    return HookRegistry;
	})();
	exports.HookRegistry = HookRegistry;
	//# sourceMappingURL=hookRegistry.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	var Glob = (function () {
	    function Glob(text) {
	        this.text = text;
	        this.glob = text.split('.');
	    }
	    Glob.prototype.matches = function (name) {
	        var segments = name.split('.');
	        for (var i = 0, l = this.glob.length; i < l; i++) {
	            if (this.glob[i] === '*')
	                segments[i] = '*';
	        }
	        if (this.glob[0] === '**') {
	            segments = segments.slice(segments.indexOf(this.glob[1]));
	            segments.unshift('**');
	        }
	        if (this.glob[this.glob.length - 1] === '**') {
	            segments.splice(segments.indexOf(this.glob[this.glob.length - 2]) + 1, Number.MAX_VALUE);
	            segments.push('**');
	        }
	        if (this.glob.length != segments.length)
	            return false;
	        return segments.join('') === this.glob.join('');
	    };
	    Glob.is = function (text) {
	        return text.indexOf('*') > -1;
	    };
	    Glob.fromString = function (text) {
	        if (!this.is(text))
	            return null;
	        return new Glob(text);
	    };
	    return Glob;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Glob;
	//# sourceMappingURL=glob.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var transitionHook_1 = __webpack_require__(13);
	var successErrorOptions = {
	    async: false,
	    rejectIfSuperseded: false
	};
	var HookBuilder = (function () {
	    function HookBuilder($transitions, transition, baseHookOptions) {
	        var _this = this;
	        this.$transitions = $transitions;
	        this.transition = transition;
	        this.baseHookOptions = baseHookOptions;
	        this.getOnBeforeHooks = function () { return _this._getTransitionHooks("onBefore", _this.treeChanges.from); };
	        this.getOnStartHooks = function () { return _this._getTransitionHooks("onStart", _this.treeChanges.to); };
	        this.getOnExitHooks = function () { return _this._getNodeHooks("onExit", _this.treeChanges.exiting.reverse(), function (node) { return _this._toFrom({ from: node.state }); }); };
	        this.getOnRetainHooks = function () { return _this._getNodeHooks("onRetain", _this.treeChanges.retained, function (node) { return _this._toFrom(); }); };
	        this.getOnEnterHooks = function () { return _this._getNodeHooks("onEnter", _this.treeChanges.entering, function (node) { return _this._toFrom({ to: node.state }); }); };
	        this.getOnFinishHooks = function () { return _this._getTransitionHooks("onFinish", _this.treeChanges.to, { $treeChanges$: _this.treeChanges }); };
	        this.getOnSuccessHooks = function () { return _this._getTransitionHooks("onSuccess", _this.treeChanges.to, {}, successErrorOptions); };
	        this.getOnErrorHooks = function () { return _this._getTransitionHooks("onError", _this.treeChanges.to, {}, successErrorOptions); };
	        this.treeChanges = transition.treeChanges();
	        this.toState = this.treeChanges.to.last().state;
	        this.fromState = this.treeChanges.from.last().state;
	        this.transitionOptions = transition.options();
	        this.transitionLocals = { $transition$: transition };
	    }
	    HookBuilder.prototype._toFrom = function (toFromOverride) {
	        return common_1.extend({ to: this.toState, from: this.fromState }, toFromOverride);
	    };
	    HookBuilder.prototype._getTransitionHooks = function (hookType, context, locals, options) {
	        var _this = this;
	        if (locals === void 0) { locals = {}; }
	        if (options === void 0) { options = {}; }
	        var node = this.treeChanges.to.last();
	        var toFrom = this._toFrom();
	        options.traceData = { hookType: hookType, context: context };
	        var transitionHook = function (eventHook) { return _this.buildHook(node, eventHook.callback, locals, options); };
	        return this._matchingHooks(hookType, toFrom).map(transitionHook);
	    };
	    HookBuilder.prototype._getNodeHooks = function (hookType, path, toFromFn, locals, options) {
	        var _this = this;
	        if (locals === void 0) { locals = {}; }
	        if (options === void 0) { options = {}; }
	        var hooksForNode = function (node) {
	            var toFrom = toFromFn(node);
	            options.traceData = { hookType: hookType, context: node };
	            locals.$state$ = node.state;
	            var transitionHook = function (eventHook) { return _this.buildHook(node, eventHook.callback, locals, options); };
	            return _this._matchingHooks(hookType, toFrom).map(transitionHook);
	        };
	        return path.nodes().map(hooksForNode);
	    };
	    HookBuilder.prototype.buildHook = function (node, fn, moreLocals, options) {
	        if (options === void 0) { options = {}; }
	        var locals = common_1.extend({}, this.transitionLocals, moreLocals);
	        var _options = common_1.extend({}, this.baseHookOptions, options);
	        return new transitionHook_1.default(node.state, fn, locals, node.resolveContext, _options);
	    };
	    HookBuilder.prototype._matchingHooks = function (hookName, matchCriteria) {
	        var matchFilter = function (hook) { return hook.matches(matchCriteria.to, matchCriteria.from); };
	        var prioritySort = function (l, r) { return r.priority - l.priority; };
	        return [this.transition, this.$transitions]
	            .map(function (reg) { return reg.getHooks(hookName); })
	            .filter(common_1.assertPredicate(common_1.isArray, "broken event named: " + hookName))
	            .reduce(common_1.unnestR)
	            .filter(matchFilter)
	            .sort(prioritySort);
	    };
	    return HookBuilder;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = HookBuilder;
	//# sourceMappingURL=hookBuilder.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(6);
	var rejectFactory_1 = __webpack_require__(14);
	var transition_1 = __webpack_require__(8);
	var resolvable_1 = __webpack_require__(7);
	var REJECT = new rejectFactory_1.RejectFactory();
	var defaultOptions = {
	    async: true,
	    rejectIfSuperseded: true,
	    current: common_1.noop,
	    transition: null,
	    traceData: {}
	};
	var TransitionHook = (function () {
	    function TransitionHook(state, fn, locals, resolveContext, options) {
	        var _this = this;
	        this.state = state;
	        this.fn = fn;
	        this.locals = locals;
	        this.resolveContext = resolveContext;
	        this.options = options;
	        this.isSuperseded = function () { return _this.options.current() !== _this.options.transition; };
	        this.mapHookResult = common_1.pattern([
	            [this.isSuperseded, function () { return REJECT.superseded(_this.options.current()); }],
	            [common_1.eq(false), common_1.val(REJECT.aborted("Hook aborted transition"))],
	            [common_1.is(transition_1.Transition), function (transition) { return REJECT.redirected(transition); }],
	            [common_1.isPromise, function (promise) { return promise.then(_this.handleHookResult.bind(_this)); }],
	            [common_1.isObject, function (obj) { return _this.resolveContext.addResolvables(_this.mapNewResolves(obj), _this.state); }]
	        ]);
	        this.invokeStep = function (moreLocals) {
	            var _a = _this, options = _a.options, fn = _a.fn, resolveContext = _a.resolveContext, state = _a.state;
	            var locals = common_1.extend({}, _this.locals, moreLocals);
	            trace_1.default.traceHookInvocation(_this, options);
	            if (options.rejectIfSuperseded && _this.isSuperseded()) {
	                return REJECT.superseded(options.current());
	            }
	            if (!options.async) {
	                var hookResult = resolveContext.invokeNow(state, fn, locals, options);
	                return _this.handleHookResult(hookResult);
	            }
	            return resolveContext.invokeLater(state, fn, locals, options).then(_this.handleHookResult.bind(_this));
	        };
	        this.options = common_1.defaults(options, defaultOptions);
	    }
	    TransitionHook.prototype.mapNewResolves = function (resolves) {
	        var _this = this;
	        var invalid = common_1.filter(resolves, common_1.not(common_1.isFunction)), keys = Object.keys(invalid);
	        if (keys.length)
	            throw new Error("Invalid resolve key/value: " + keys[0] + "/" + invalid[keys[0]]);
	        var makeResolvable = function (fn, name) { return new resolvable_1.default(name, fn, _this.state); };
	        return common_1.map(resolves, makeResolvable);
	    };
	    TransitionHook.prototype.handleHookResult = function (hookResult) {
	        if (!common_1.isDefined(hookResult))
	            return undefined;
	        trace_1.default.traceHookResult(hookResult, undefined, this.options);
	        var transitionResult = this.mapHookResult(hookResult);
	        if (transitionResult)
	            trace_1.default.traceHookResult(hookResult, transitionResult, this.options);
	        return transitionResult;
	    };
	    TransitionHook.prototype.toString = function () {
	        var _a = this, options = _a.options, fn = _a.fn;
	        var event = common_1.parse("traceData.hookType")(options) || "internal", context = common_1.parse("traceData.context.state.name")(options) || common_1.parse("traceData.context")(options) || "unknown", name = common_1.fnToString(fn);
	        return event + " context: " + context + ", " + common_1.maxLength(200, name);
	    };
	    return TransitionHook;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TransitionHook;
	//# sourceMappingURL=transitionHook.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(4);
	var angular1_1 = __webpack_require__(3);
	(function (RejectType) {
	    RejectType[RejectType["SUPERSEDED"] = 2] = "SUPERSEDED";
	    RejectType[RejectType["ABORTED"] = 3] = "ABORTED";
	    RejectType[RejectType["INVALID"] = 4] = "INVALID";
	    RejectType[RejectType["IGNORED"] = 5] = "IGNORED";
	})(exports.RejectType || (exports.RejectType = {}));
	var RejectType = exports.RejectType;
	var TransitionRejection = (function () {
	    function TransitionRejection(type, message, detail) {
	        common_1.extend(this, {
	            type: type,
	            message: message,
	            detail: detail
	        });
	    }
	    TransitionRejection.prototype.toString = function () {
	        function detailString(d) {
	            return d && d.toString !== Object.prototype.toString ? d.toString() : JSON.stringify(d);
	        }
	        var type = this.type, message = this.message, detail = detailString(this.detail);
	        return "TransitionRejection(type: " + type + ", message: " + message + ", detail: " + detail + ")";
	    };
	    return TransitionRejection;
	})();
	exports.TransitionRejection = TransitionRejection;
	var RejectFactory = (function () {
	    function RejectFactory() {
	    }
	    RejectFactory.prototype.superseded = function (detail, options) {
	        var message = "The transition has been superseded by a different transition (see detail).";
	        var reason = new TransitionRejection(RejectType.SUPERSEDED, message, detail);
	        if (options && options.redirected) {
	            reason.redirected = true;
	        }
	        return common_1.extend(angular1_1.runtime.$q.reject(reason), { reason: reason });
	    };
	    RejectFactory.prototype.redirected = function (detail) {
	        return this.superseded(detail, { redirected: true });
	    };
	    RejectFactory.prototype.invalid = function (detail) {
	        var message = "This transition is invalid (see detail)";
	        var reason = new TransitionRejection(RejectType.INVALID, message, detail);
	        return common_1.extend(angular1_1.runtime.$q.reject(reason), { reason: reason });
	    };
	    RejectFactory.prototype.ignored = function (detail) {
	        var message = "The transition was ignored.";
	        var reason = new TransitionRejection(RejectType.IGNORED, message, detail);
	        return common_1.extend(angular1_1.runtime.$q.reject(reason), { reason: reason });
	    };
	    RejectFactory.prototype.aborted = function (detail) {
	        var message = "The transition has been aborted.";
	        var reason = new TransitionRejection(RejectType.ABORTED, message, detail);
	        return common_1.extend(angular1_1.runtime.$q.reject(reason), { reason: reason });
	    };
	    return RejectFactory;
	})();
	exports.RejectFactory = RejectFactory;
	//# sourceMappingURL=rejectFactory.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var angular1_1 = __webpack_require__(3);
	var TransitionRunner = (function () {
	    function TransitionRunner(transition, _resolve, _reject) {
	        this.transition = transition;
	        this._resolve = _resolve;
	        this._reject = _reject;
	        this.hookBuilder = transition.hookBuilder();
	    }
	    TransitionRunner.prototype.run = function () {
	        var _this = this;
	        var runSuccessHooks = function () { return runSynchronousHooks(_this.success(), {}, true); };
	        var runErrorHooks = function ($error$) { return runSynchronousHooks(_this.error(), { $error$: $error$ }, true); };
	        this.transition.promise.then(runSuccessHooks, runErrorHooks);
	        var chain = runSynchronousHooks(this.before());
	        chain = this.async().reduce(function (_chain, step) { return _chain.then(step.invokeStep); }, chain);
	        return chain.then(this._resolve, this._reject);
	    };
	    TransitionRunner.prototype.before = function () {
	        return this.hookBuilder.getOnBeforeHooks();
	    };
	    TransitionRunner.prototype.async = function () {
	        var hookBuilder = this.hookBuilder;
	        var onStartHooks = hookBuilder.getOnStartHooks();
	        var onExitHooks = hookBuilder.getOnExitHooks();
	        var onRetainHooks = hookBuilder.getOnRetainHooks();
	        var onEnterHooks = hookBuilder.getOnEnterHooks();
	        var onFinishHooks = hookBuilder.getOnFinishHooks();
	        return common_1.flatten([onStartHooks, onExitHooks, onRetainHooks, onEnterHooks, onFinishHooks]).filter(common_1.identity);
	    };
	    TransitionRunner.prototype.success = function () {
	        return this.hookBuilder.getOnSuccessHooks();
	    };
	    TransitionRunner.prototype.error = function () {
	        return this.hookBuilder.getOnErrorHooks();
	    };
	    return TransitionRunner;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TransitionRunner;
	function runSynchronousHooks(hooks, locals, swallowExceptions) {
	    if (locals === void 0) { locals = {}; }
	    if (swallowExceptions === void 0) { swallowExceptions = false; }
	    function invokeSwallowExceptions(hook) {
	        try {
	            return hook.invokeStep(locals);
	        }
	        catch (exception) {
	            if (!swallowExceptions)
	                throw exception;
	            console.log("Swallowed exception during synchronous hook handler: " + exception);
	        }
	    }
	    return hooks.map(invokeSwallowExceptions)
	        .filter(common_1.isPromise)
	        .reduce(function (chain, promise) { return chain.then(common_1.val(promise)); }, angular1_1.runtime.$q.when(undefined));
	}
	exports.runSynchronousHooks = runSynchronousHooks;
	//# sourceMappingURL=transitionRunner.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var paramValues_1 = __webpack_require__(17);
	var targetState_1 = __webpack_require__(18);
	var path_1 = __webpack_require__(19);
	var resolvable_1 = __webpack_require__(7);
	var resolveContext_1 = __webpack_require__(20);
	var view_1 = __webpack_require__(22);
	var resolveInjector_1 = __webpack_require__(23);
	var PathFactory = (function () {
	    function PathFactory() {
	    }
	    PathFactory.makeParamsPath = function (ref) {
	        var states = ref ? ref.$state().path : [];
	        var params = ref ? ref.params() : {};
	        var toParamsNodeFn = PathFactory.makeParamsNode(params);
	        return new path_1.default(states.map(toParamsNodeFn));
	    };
	    PathFactory.makeTargetState = function (path) {
	        var state = path.last().state;
	        return new targetState_1.default(state, state, new paramValues_1.default(path));
	    };
	    PathFactory.makeResolveNode = function (node) {
	        var makeResolvable = function (_node) { return function (resolveFn, name) { return new resolvable_1.default(name, resolveFn, _node.state); }; };
	        var ownResolvables = common_1.map(node.state.resolve || {}, makeResolvable(node));
	        return common_1.extend({}, node, { ownResolvables: ownResolvables });
	    };
	    PathFactory.buildToPath = function (fromPath, targetState) {
	        var toParams = targetState.params();
	        var toParamsNodeFn = PathFactory.makeParamsNode(toParams);
	        var toPath = new path_1.default(targetState.$state().path.map(toParamsNodeFn));
	        if (targetState.options().inherit)
	            toPath = PathFactory.inheritParams(fromPath, toPath, Object.keys(toParams));
	        return toPath;
	    };
	    PathFactory.inheritParams = function (fromPath, toPath, toKeys) {
	        if (toKeys === void 0) { toKeys = []; }
	        function nodeParamVals(path, state) {
	            var node = path.nodeForState(state);
	            return common_1.extend({}, node && node.ownParamValues);
	        }
	        var makeInheritedParamsNode = common_1.curry(function (_fromPath, _toKeys, toNode) {
	            var toParamVals = common_1.extend({}, toNode && toNode.ownParamValues);
	            var incomingParamVals = common_1.pick(toParamVals, _toKeys);
	            toParamVals = common_1.omit(toParamVals, _toKeys);
	            var fromParamVals = nodeParamVals(_fromPath, toNode.state) || {};
	            var ownParamValues = common_1.extend(toParamVals, fromParamVals, incomingParamVals);
	            return { state: toNode.state, ownParamValues: ownParamValues };
	        });
	        return new path_1.default(toPath.nodes().map(makeInheritedParamsNode(fromPath, toKeys)));
	    };
	    PathFactory.bindTransNodesToPath = function (resolvePath) {
	        var resolveContext = new resolveContext_1.default(resolvePath);
	        var paramValues = new paramValues_1.default(resolvePath);
	        var transPath = resolvePath;
	        function makeViews(node) {
	            var context = node.state, params = node.paramValues;
	            var makeViewConfig = function (_a) {
	                var rawViewName = _a[0], viewDeclarationObj = _a[1];
	                return new view_1.ViewConfig({ rawViewName: rawViewName, viewDeclarationObj: viewDeclarationObj, context: context, params: params });
	            };
	            return common_1.pairs(node.state.views || {}).map(makeViewConfig);
	        }
	        transPath.nodes().forEach(function (node) {
	            node.resolveContext = resolveContext.isolateRootTo(node.state);
	            node.resolveInjector = new resolveInjector_1.default(node.resolveContext, node.state);
	            node.paramValues = paramValues.$isolateRootTo(node.state.name);
	            node.ownResolvables["$stateParams"] = new resolvable_1.default("$stateParams", function () { return node.paramValues; }, node.state);
	            node.views = makeViews(node);
	        });
	        return transPath;
	    };
	    PathFactory.treeChanges = function (fromPath, toPath, reloadState) {
	        function nonDynamicParams(state) {
	            return state.params.$$filter(common_1.not(common_1.prop('dynamic')));
	        }
	        var fromNodes = fromPath.nodes();
	        var toNodes = toPath.nodes();
	        var keep = 0, max = Math.min(fromNodes.length, toNodes.length);
	        var nodesMatch = function (node1, node2) {
	            return node1.state === node2.state && nonDynamicParams(node1.state).$$equals(node1.ownParamValues, node2.ownParamValues);
	        };
	        while (keep < max && fromNodes[keep].state !== reloadState && nodesMatch(fromNodes[keep], toNodes[keep])) {
	            keep++;
	        }
	        function applyToParams(retainedNode, idx) {
	            var toNodeParams = toPath.nodes()[idx].ownParamValues;
	            return common_1.extend({}, retainedNode, { ownParamValues: toNodeParams });
	        }
	        var from, retained, exiting, entering, to;
	        var retainedWithToParams, enteringResolvePath, toResolvePath;
	        from = fromPath;
	        retained = from.slice(0, keep);
	        exiting = from.slice(keep);
	        retainedWithToParams = retained.adapt(applyToParams);
	        enteringResolvePath = toPath.slice(keep).adapt(PathFactory.makeResolveNode);
	        toResolvePath = retainedWithToParams.concat(enteringResolvePath);
	        to = PathFactory.bindTransNodesToPath(toResolvePath);
	        entering = to.slice(keep);
	        return { from: from, to: to, retained: retained, exiting: exiting, entering: entering };
	    };
	    PathFactory.makeParamsNode = common_1.curry(function (params, state) {
	        return {
	            state: state,
	            ownParamValues: state.ownParams.$$values(params)
	        };
	    });
	    return PathFactory;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PathFactory;
	//# sourceMappingURL=pathFactory.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var stateNameMatches = function (stateName) { return function (node) { return node.state.name === stateName; }; };
	var ParamValues = (function () {
	    function ParamValues($$path) {
	        Object.defineProperty(this, "$$path", { value: $$path });
	        $$path.nodes().reduce(function (memo, node) { return common_1.extend(memo, node.ownParamValues); }, this);
	    }
	    ParamValues.prototype.$byState = function (stateName) {
	        var found = common_1.find(this.$$path.nodes(), stateNameMatches(stateName));
	        return found && found.ownParamValues;
	    };
	    ParamValues.prototype.$isolateRootTo = function (stateName) {
	        return new ParamValues(this.$$path.pathFromRootTo(stateName));
	    };
	    return ParamValues;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ParamValues;
	//# sourceMappingURL=paramValues.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	var TargetState = (function () {
	    function TargetState(_identifier, _definition, _params, _options) {
	        if (_params === void 0) { _params = {}; }
	        if (_options === void 0) { _options = {}; }
	        this._identifier = _identifier;
	        this._definition = _definition;
	        this._params = _params;
	        this._options = _options;
	    }
	    TargetState.prototype.name = function () {
	        return this._definition && this._definition.name || this._identifier;
	    };
	    TargetState.prototype.identifier = function () {
	        return this._identifier;
	    };
	    TargetState.prototype.params = function () {
	        return this._params;
	    };
	    TargetState.prototype.$state = function () {
	        return this._definition;
	    };
	    TargetState.prototype.state = function () {
	        return this._definition && this._definition.self;
	    };
	    TargetState.prototype.options = function () {
	        return this._options;
	    };
	    TargetState.prototype.exists = function () {
	        return !!(this._definition && this._definition.self);
	    };
	    TargetState.prototype.valid = function () {
	        return !this.error();
	    };
	    TargetState.prototype.error = function () {
	        var base = this.options().relative;
	        if (!this._definition && !!base) {
	            var stateName = base.name ? base.name : base;
	            return "Could not resolve '" + this.name() + "' from state '" + stateName + "'";
	        }
	        if (!this._definition)
	            return "No such state '" + this.name() + "'";
	        if (!this._definition.self)
	            return "State '" + this.name() + "' has an invalid definition";
	    };
	    return TargetState;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TargetState;
	//# sourceMappingURL=targetState.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	var stateMatches = function (state) { return function (node) { return node.state === state || node.state.self === state; }; };
	var stateNameMatches = function (stateName) { return function (node) { return node.state.name === stateName; }; };
	var shallowNodeCopy = function (node) { return common_1.extend({}, node); };
	var Path = (function () {
	    function Path(_nodes) {
	        this._nodes = _nodes;
	    }
	    Path.prototype.pathFromRootTo = function (toState) {
	        var predicate = common_1.isString(toState) ? stateNameMatches(toState) : stateMatches(toState);
	        var node = common_1.find(this._nodes, predicate);
	        var elementIdx = this._nodes.indexOf(node);
	        if (elementIdx === -1)
	            throw new Error("This Path does not contain the toPathElement");
	        return this.slice(0, elementIdx + 1);
	    };
	    Path.prototype.concat = function (path) {
	        return new Path(this._nodes.concat(path._nodes).map(shallowNodeCopy));
	    };
	    Path.prototype.slice = function (start, end) {
	        return new Path(this._nodes.slice(start, end).map(shallowNodeCopy));
	    };
	    Path.prototype.matching = function (otherPath) {
	        var otherNodes = otherPath._nodes;
	        var matchedCount = this._nodes.reduce(function (prev, node, i) {
	            return prev === i && i < otherNodes.length && node.state === otherNodes[i].state ? i + 1 : prev;
	        }, 0);
	        return this.slice(matchedCount);
	    };
	    Path.prototype.reverse = function () {
	        var copy = [].concat(this._nodes).map(shallowNodeCopy);
	        copy.reverse();
	        return new Path(copy);
	    };
	    Path.prototype.states = function () {
	        return this._nodes.map(common_1.prop("state"));
	    };
	    Path.prototype.nodeForState = function (state) {
	        var propName = (common_1.isString(state) ? "state.name" : "state");
	        return common_1.find(this._nodes, common_1.pipe(common_1.parse(propName), common_1.eq(state)));
	    };
	    Path.prototype.nodes = function () {
	        return [].concat(this._nodes);
	    };
	    Path.prototype.last = function () {
	        return this._nodes.length ? this._nodes[this._nodes.length - 1] : null;
	    };
	    Path.prototype.adapt = function (nodeMapper) {
	        var adaptedNodes = this._nodes.map(nodeMapper);
	        return new Path(adaptedNodes);
	    };
	    Path.prototype.toString = function () {
	        var elements = this._nodes.map(function (e) { return e.state.name; }).join(", ");
	        return "Path([" + elements + "])";
	    };
	    return Path;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Path;
	//# sourceMappingURL=path.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(6);
	var angular1_1 = __webpack_require__(3);
	var interface_1 = __webpack_require__(21);
	var defaultResolvePolicy = interface_1.ResolvePolicy[interface_1.ResolvePolicy.LAZY];
	var ResolveContext = (function () {
	    function ResolveContext(_path) {
	        this._path = _path;
	    }
	    ResolveContext.prototype.getResolvables = function (state, options) {
	        options = common_1.defaults(options, { omitOwnLocals: [] });
	        var path = (state ? this._path.pathFromRootTo(state) : this._path);
	        var last = path.last();
	        return path.nodes().reduce(function (memo, node) {
	            var omitProps = (node === last) ? options.omitOwnLocals : [];
	            var filteredResolvables = common_1.omit(node.ownResolvables, omitProps);
	            return common_1.extend(memo, filteredResolvables);
	        }, {});
	    };
	    ResolveContext.prototype.getResolvablesForFn = function (fn, resolveContext) {
	        if (resolveContext === void 0) { resolveContext = this; }
	        var deps = angular1_1.runtime.$injector.annotate(fn);
	        return common_1.pick(resolveContext.getResolvables(), deps);
	    };
	    ResolveContext.prototype.isolateRootTo = function (state) {
	        return new ResolveContext(this._path.pathFromRootTo(state));
	    };
	    ResolveContext.prototype.addResolvables = function (resolvables, state) {
	        var node = this._path.nodeForState(state);
	        common_1.extend(node.ownResolvables, resolvables);
	    };
	    ResolveContext.prototype.getOwnResolvables = function (state) {
	        return common_1.extend({}, this._path.nodeForState(state).ownResolvables);
	    };
	    ResolveContext.prototype.resolvePath = function (options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        trace_1.default.traceResolvePath(this._path, options);
	        var promiseForNode = function (node) { return _this.resolvePathElement(node.state, options); };
	        return angular1_1.runtime.$q.all(common_1.map(this._path.nodes(), promiseForNode)).then(common_1.noop);
	    };
	    ResolveContext.prototype.resolvePathElement = function (state, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var policy = options && options.resolvePolicy;
	        var policyOrdinal = interface_1.ResolvePolicy[policy || defaultResolvePolicy];
	        var resolvables = this.getOwnResolvables(state);
	        var matchesRequestedPolicy = function (resolvable) { return getPolicy(state.resolvePolicy, resolvable) >= policyOrdinal; };
	        var matchingResolves = common_1.filter(resolvables, matchesRequestedPolicy);
	        var getResolvePromise = function (resolvable) { return resolvable.get(_this.isolateRootTo(state), options); };
	        var resolvablePromises = common_1.map(matchingResolves, getResolvePromise);
	        trace_1.default.traceResolvePathElement(this, matchingResolves, options);
	        return angular1_1.runtime.$q.all(resolvablePromises).then(common_1.noop);
	    };
	    ResolveContext.prototype.invokeLater = function (state, fn, locals, options) {
	        if (locals === void 0) { locals = {}; }
	        if (options === void 0) { options = {}; }
	        var isolateCtx = this.isolateRootTo(state);
	        var resolvables = this.getResolvablesForFn(fn, isolateCtx);
	        trace_1.default.tracePathElementInvoke(state, fn, Object.keys(resolvables), common_1.extend({ when: "Later" }, options));
	        var getPromise = function (resolvable) { return resolvable.get(isolateCtx, options); };
	        var promises = common_1.map(resolvables, getPromise);
	        return angular1_1.runtime.$q.all(promises).then(function () {
	            try {
	                return isolateCtx.invokeNow(state, fn, locals, options);
	            }
	            catch (error) {
	                return angular1_1.runtime.$q.reject(error);
	            }
	        });
	    };
	    ResolveContext.prototype.invokeNow = function (state, fn, locals, options) {
	        if (options === void 0) { options = {}; }
	        var isolateCtx = this.isolateRootTo(state);
	        var resolvables = this.getResolvablesForFn(fn, isolateCtx);
	        trace_1.default.tracePathElementInvoke(state, fn, Object.keys(resolvables), common_1.extend({ when: "Now  " }, options));
	        var resolvedLocals = common_1.map(resolvables, common_1.prop("data"));
	        var combinedLocals = common_1.extend({}, locals, resolvedLocals);
	        return angular1_1.runtime.$injector.invoke(fn, state, combinedLocals);
	    };
	    return ResolveContext;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ResolveContext;
	function getPolicy(stateResolvePolicyConf, resolvable) {
	    var stateLevelPolicy = (common_1.isString(stateResolvePolicyConf) ? stateResolvePolicyConf : null);
	    var resolveLevelPolicies = (common_1.isObject(stateResolvePolicyConf) ? stateResolvePolicyConf : {});
	    var policyName = resolveLevelPolicies[resolvable.name] || stateLevelPolicy || defaultResolvePolicy;
	    return interface_1.ResolvePolicy[policyName];
	}
	//# sourceMappingURL=resolveContext.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	(function (ResolvePolicy) {
	    ResolvePolicy[ResolvePolicy["JIT"] = 0] = "JIT";
	    ResolvePolicy[ResolvePolicy["LAZY"] = 1] = "LAZY";
	    ResolvePolicy[ResolvePolicy["EAGER"] = 2] = "EAGER";
	})(exports.ResolvePolicy || (exports.ResolvePolicy = {}));
	var ResolvePolicy = exports.ResolvePolicy;
	//# sourceMappingURL=interface.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(6);
	function normalizeUiViewTarget(rawViewName) {
	    if (rawViewName === void 0) { rawViewName = ""; }
	    var viewAtContext = rawViewName.split("@");
	    var uiViewName = viewAtContext[0] || "$default";
	    var uiViewContextAnchor = common_1.isString(viewAtContext[1]) ? viewAtContext[1] : "^";
	    var relativeViewNameSugar = /^(\^(?:\.\^)*)\.(.*$)/.exec(uiViewName);
	    if (relativeViewNameSugar) {
	        uiViewContextAnchor = relativeViewNameSugar[1];
	        uiViewName = relativeViewNameSugar[2];
	    }
	    if (uiViewName.charAt(0) === '!') {
	        uiViewName = uiViewName.substr(1);
	        uiViewContextAnchor = "";
	    }
	    return { uiViewName: uiViewName, uiViewContextAnchor: uiViewContextAnchor };
	}
	var ViewConfig = (function () {
	    function ViewConfig(stateViewConfig) {
	        var _a = normalizeUiViewTarget(stateViewConfig.rawViewName), uiViewName = _a.uiViewName, uiViewContextAnchor = _a.uiViewContextAnchor;
	        var relativeMatch = /^(\^(?:\.\^)*)$/;
	        if (relativeMatch.exec(uiViewContextAnchor)) {
	            var anchor = uiViewContextAnchor.split(".").reduce((function (anchor, x) { return anchor.parent; }), stateViewConfig.context);
	            uiViewContextAnchor = anchor.name;
	        }
	        common_1.extend(this, common_1.pick(stateViewConfig, "viewDeclarationObj", "params", "context", "locals"), { uiViewName: uiViewName, uiViewContextAnchor: uiViewContextAnchor });
	        this.controllerAs = stateViewConfig.viewDeclarationObj.controllerAs;
	    }
	    ViewConfig.prototype.hasTemplate = function () {
	        var viewDef = this.viewDeclarationObj;
	        return !!(viewDef.template || viewDef.templateUrl || viewDef.templateProvider);
	    };
	    ViewConfig.prototype.getTemplate = function ($factory, injector) {
	        return $factory.fromConfig(this.viewDeclarationObj, this.params, injector.invokeLater.bind(injector));
	    };
	    ViewConfig.prototype.getController = function (injector) {
	        var provider = this.viewDeclarationObj.controllerProvider;
	        return common_1.isInjectable(provider) ? injector.invokeLater(provider, {}) : this.viewDeclarationObj.controller;
	    };
	    return ViewConfig;
	})();
	exports.ViewConfig = ViewConfig;
	$View.$inject = ['$rootScope', '$templateFactory', '$q', '$timeout'];
	function $View($rootScope, $templateFactory, $q, $timeout) {
	    var uiViews = [];
	    var viewConfigs = [];
	    var match = function (obj1) {
	        var keys = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            keys[_i - 1] = arguments[_i];
	        }
	        return function (obj2) { return keys.reduce((function (memo, key) { return memo && obj1[key] === obj2[key]; }), true); };
	    };
	    this.rootContext = function (context) {
	        return context ? this._rootContext = context : this._rootContext;
	    };
	    this.load = function load(viewConfig, injector) {
	        if (!viewConfig.hasTemplate())
	            throw new Error("No template configuration specified for '" + viewConfig.uiViewName + "@" + viewConfig.uiViewContextAnchor + "'");
	        var promises = {
	            template: $q.when(viewConfig.getTemplate($templateFactory, injector)),
	            controller: $q.when(viewConfig.getController(injector))
	        };
	        return $q.all(promises).then(function (results) {
	            trace_1.default.traceViewServiceEvent("Loaded", viewConfig);
	            return common_1.extend(viewConfig, results);
	        });
	    };
	    this.reset = function reset(viewConfig) {
	        trace_1.default.traceViewServiceEvent("<- Removing", viewConfig);
	        viewConfigs.filter(match(viewConfig, "uiViewName", "context")).forEach(common_1.removeFrom(viewConfigs));
	    };
	    this.registerStateViewConfig = function (viewConfig) {
	        trace_1.default.traceViewServiceEvent("-> Registering", viewConfig);
	        viewConfigs.push(viewConfig);
	    };
	    this.sync = function () {
	        var uiViewsByFqn = uiViews.map(function (uiv) { return [uiv.fqn, uiv]; }).reduce(common_1.applyPairs, {});
	        var matches = common_1.curry(function (uiView, viewConfig) {
	            var vcSegments = viewConfig.uiViewName.split(".");
	            var uivSegments = uiView.fqn.split(".");
	            if (!angular.equals(vcSegments, uivSegments.slice(0 - vcSegments.length)))
	                return false;
	            var negOffset = (1 - vcSegments.length) || undefined;
	            var fqnToFirstSegment = uivSegments.slice(0, negOffset).join(".");
	            var uiViewContext = uiViewsByFqn[fqnToFirstSegment].creationContext;
	            return viewConfig.uiViewContextAnchor === (uiViewContext && uiViewContext.name);
	        });
	        function uiViewDepth(uiView) {
	            return uiView.fqn.split(".").length;
	        }
	        function viewConfigDepth(config) {
	            var context = config.context, count = 0;
	            while (++count && context.parent)
	                context = context.parent;
	            return count;
	        }
	        var depthCompare = common_1.curry(function (depthFn, posNeg, left, right) { return posNeg * (depthFn(left) - depthFn(right)); });
	        var matchingConfigPair = function (uiView) {
	            var matchingConfigs = viewConfigs.filter(matches(uiView));
	            if (matchingConfigs.length > 1)
	                matchingConfigs.sort(depthCompare(viewConfigDepth, -1));
	            return [uiView, matchingConfigs[0]];
	        };
	        var configureUiView = function (_a) {
	            var uiView = _a[0], viewConfig = _a[1];
	            if (uiViews.indexOf(uiView) !== -1)
	                uiView.configUpdated(viewConfig);
	        };
	        uiViews.sort(depthCompare(uiViewDepth, 1)).map(matchingConfigPair).forEach(configureUiView);
	    };
	    this.registerUiView = function register(uiView) {
	        trace_1.default.traceViewServiceUiViewEvent("-> Registering", uiView);
	        var fqnMatches = function (uiv) { return uiv.fqn === uiView.fqn; };
	        if (uiViews.filter(fqnMatches).length)
	            trace_1.default.traceViewServiceUiViewEvent("!!!! duplicate uiView named:", uiView);
	        uiViews.push(uiView);
	        this.sync();
	        return function () {
	            var idx = uiViews.indexOf(uiView);
	            if (idx <= 0) {
	                trace_1.default.traceViewServiceUiViewEvent("Tried removing non-registered uiView", uiView);
	                return;
	            }
	            trace_1.default.traceViewServiceUiViewEvent("<- Deregistering", uiView);
	            common_1.removeFrom(uiViews)(uiView);
	        };
	    };
	    this.available = function () { return uiViews.map(common_1.prop("fqn")); };
	    this.active = function () { return uiViews.filter(common_1.prop("$config")).map(common_1.prop("name")); };
	}
	angular.module('ui.router.state').service('$view', $View);
	//# sourceMappingURL=view.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var ResolveInjector = (function () {
	    function ResolveInjector(_resolveContext, _state) {
	        this._resolveContext = _resolveContext;
	        this._state = _state;
	    }
	    ResolveInjector.prototype.invokeLater = function (injectedFn, locals) {
	        return this._resolveContext.invokeLater(this._state, injectedFn, locals);
	    };
	    ResolveInjector.prototype.invokeNow = function (injectedFn, locals) {
	        return this._resolveContext.invokeNow(this._state, injectedFn, locals);
	    };
	    ResolveInjector.prototype.getLocals = function (injectedFn) {
	        var _this = this;
	        var resolve = function (r) { return r.get(_this._resolveContext); };
	        return common_1.map(this._resolveContext.getResolvablesForFn(injectedFn), resolve);
	    };
	    return ResolveInjector;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ResolveInjector;
	//# sourceMappingURL=resolveInjector.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var param = __webpack_require__(25);
	exports.param = param;
	var paramSet = __webpack_require__(29);
	exports.paramSet = paramSet;
	var paramTypes = __webpack_require__(27);
	exports.paramTypes = paramTypes;
	var paramValues = __webpack_require__(17);
	exports.paramValues = paramValues;
	var type = __webpack_require__(28);
	exports.type = type;
	//# sourceMappingURL=module.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var angular1_1 = __webpack_require__(3);
	var urlMatcherConfig_1 = __webpack_require__(26);
	var paramTypes_1 = __webpack_require__(27);
	var type_1 = __webpack_require__(28);
	var Param = (function () {
	    function Param(id, type, config, location) {
	        config = unwrapShorthand(config);
	        type = getType(config, type, location);
	        var arrayMode = getArrayMode();
	        type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
	        var isOptional = config.value !== undefined;
	        var dynamic = config.dynamic === true;
	        var squash = getSquashPolicy(config, isOptional);
	        var replace = getReplace(config, arrayMode, isOptional, squash);
	        function unwrapShorthand(config) {
	            var configKeys = ["value", "type", "squash", "array", "dynamic"].filter(function (key) {
	                return (config || {}).hasOwnProperty(key);
	            });
	            var isShorthand = configKeys.length === 0;
	            if (isShorthand)
	                config = { value: config };
	            config.$$fn = common_1.isInjectable(config.value) ? config.value : function () {
	                return config.value;
	            };
	            return config;
	        }
	        function getType(config, urlType, location) {
	            if (config.type && urlType)
	                throw new Error("Param '" + id + "' has two type configurations.");
	            if (urlType)
	                return urlType;
	            if (!config.type)
	                return (location === "config" ? paramTypes_1.default.type("any") : paramTypes_1.default.type("string"));
	            return config.type instanceof type_1.default ? config.type : paramTypes_1.default.type(config.type);
	        }
	        function getArrayMode() {
	            var arrayDefaults = { array: (location === "search" ? "auto" : false) };
	            var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
	            return common_1.extend(arrayDefaults, arrayParamNomenclature, config).array;
	        }
	        function getSquashPolicy(config, isOptional) {
	            var squash = config.squash;
	            if (!isOptional || squash === false)
	                return false;
	            if (!common_1.isDefined(squash) || squash == null)
	                return urlMatcherConfig_1.default.defaultSquashPolicy();
	            if (squash === true || common_1.isString(squash))
	                return squash;
	            throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
	        }
	        function getReplace(config, arrayMode, isOptional, squash) {
	            var replace, configuredKeys, defaultPolicy = [
	                { from: "", to: (isOptional || arrayMode ? undefined : "") },
	                { from: null, to: (isOptional || arrayMode ? undefined : "") }
	            ];
	            replace = common_1.isArray(config.replace) ? config.replace : [];
	            if (common_1.isString(squash))
	                replace.push({ from: squash, to: undefined });
	            configuredKeys = common_1.map(replace, common_1.prop("from"));
	            return common_1.filter(defaultPolicy, function (item) { return configuredKeys.indexOf(item.from) === -1; }).concat(replace);
	        }
	        common_1.extend(this, { id: id, type: type, location: location, squash: squash, replace: replace, isOptional: isOptional, dynamic: dynamic, config: config, array: arrayMode });
	    }
	    Param.prototype.isDefaultValue = function (value) {
	        return this.isOptional && this.type.equals(this.value(), value);
	    };
	    Param.prototype.value = function (value) {
	        var _this = this;
	        var $$getDefaultValue = function () {
	            if (!angular1_1.runtime.$injector)
	                throw new Error("Injectable functions cannot be called at configuration time");
	            var defaultValue = angular1_1.runtime.$injector.invoke(_this.config.$$fn);
	            if (defaultValue !== null && defaultValue !== undefined && !_this.type.is(defaultValue))
	                throw new Error("Default value (" + defaultValue + ") for parameter '" + _this.id + "' is not an instance of Type (" + _this.type.name + ")");
	            return defaultValue;
	        };
	        var hasReplaceVal = common_1.curry(function (val, obj) { return obj.from === val; });
	        var $replace = function (value) {
	            var replacement = common_1.map(common_1.filter(_this.replace, hasReplaceVal(value)), common_1.prop("to"));
	            return replacement.length ? replacement[0] : value;
	        };
	        value = $replace(value);
	        return !common_1.isDefined(value) ? $$getDefaultValue() : this.type.$normalize(value);
	    };
	    Param.prototype.toString = function () {
	        return "{Param:" + this.id + " " + this.type + " squash: '" + this.squash + "' optional: " + this.isOptional + "}";
	    };
	    return Param;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Param;
	//# sourceMappingURL=param.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var MatcherConfig = (function () {
	    function MatcherConfig() {
	        this._isCaseInsensitive = false;
	        this._isStrictMode = false;
	        this._defaultSquashPolicy = false;
	    }
	    MatcherConfig.prototype.caseInsensitive = function (value) {
	        if (!common_1.isDefined(value))
	            return this._isCaseInsensitive;
	        return this._isCaseInsensitive = value;
	    };
	    MatcherConfig.prototype.strictMode = function (value) {
	        if (!common_1.isDefined(value))
	            return this._isStrictMode;
	        return this._isStrictMode = value;
	    };
	    MatcherConfig.prototype.defaultSquashPolicy = function (value) {
	        if (!common_1.isDefined(value))
	            return this._defaultSquashPolicy;
	        if (value !== true && value !== false && !common_1.isString(value))
	            throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
	        return this._defaultSquashPolicy = value;
	    };
	    return MatcherConfig;
	})();
	var matcherConfig = new MatcherConfig();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = matcherConfig;
	//# sourceMappingURL=urlMatcherConfig.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var type_1 = __webpack_require__(28);
	var angular1_1 = __webpack_require__(3);
	function valToString(val) { return val != null ? val.toString().replace(/\//g, "%2F") : val; }
	function valFromString(val) { return val != null ? val.toString().replace(/%2F/g, "/") : val; }
	var ParamTypes = (function () {
	    function ParamTypes() {
	        this.enqueue = true;
	        this.typeQueue = [];
	        this.defaultTypes = {
	            hash: {
	                encode: valToString,
	                decode: valFromString,
	                is: function (val) { return typeof val === "string"; },
	                pattern: /.*/,
	                equals: function () { return true; }
	            },
	            string: {
	                encode: valToString,
	                decode: valFromString,
	                is: function (val) { return typeof val === "string"; },
	                pattern: /[^/]*/
	            },
	            int: {
	                encode: valToString,
	                decode: function (val) { return parseInt(val, 10); },
	                is: function (val) { return common_1.isDefined(val) && this.decode(val.toString()) === val; },
	                pattern: /\d+/
	            },
	            bool: {
	                encode: function (val) { return val ? 1 : 0; },
	                decode: function (val) { return parseInt(val, 10) !== 0; },
	                is: function (val) { return val === true || val === false; },
	                pattern: /0|1/
	            },
	            date: {
	                encode: function (val) {
	                    if (!this.is(val))
	                        return undefined;
	                    return [val.getFullYear(),
	                        ('0' + (val.getMonth() + 1)).slice(-2),
	                        ('0' + val.getDate()).slice(-2)
	                    ].join("-");
	                },
	                decode: function (val) {
	                    if (this.is(val))
	                        return val;
	                    var match = this.capture.exec(val);
	                    return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
	                },
	                is: function (val) { return val instanceof Date && !isNaN(val.valueOf()); },
	                equals: function (a, b) { return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); },
	                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
	                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
	            },
	            json: {
	                encode: common_1.toJson,
	                decode: common_1.fromJson,
	                is: common_1.isObject,
	                equals: common_1.equals,
	                pattern: /[^/]*/
	            },
	            any: {
	                encode: common_1.identity,
	                decode: common_1.identity,
	                equals: common_1.equals,
	                pattern: /.*/
	            }
	        };
	        var makeType = function (definition, name) { return new type_1.default(common_1.extend({ name: name }, definition)); };
	        this.types = common_1.inherit(common_1.map(this.defaultTypes, makeType), {});
	    }
	    ParamTypes.prototype.type = function (name, definition, definitionFn) {
	        if (!common_1.isDefined(definition))
	            return this.types[name];
	        if (this.types.hasOwnProperty(name))
	            throw new Error("A type named '" + name + "' has already been defined.");
	        this.types[name] = new type_1.default(common_1.extend({ name: name }, definition));
	        if (definitionFn) {
	            this.typeQueue.push({ name: name, def: definitionFn });
	            if (!this.enqueue)
	                this._flushTypeQueue();
	        }
	        return this;
	    };
	    ParamTypes.prototype._flushTypeQueue = function () {
	        while (this.typeQueue.length) {
	            var type = this.typeQueue.shift();
	            if (type.pattern)
	                throw new Error("You cannot override a type's .pattern at runtime.");
	            common_1.extend(this.types[type.name], angular1_1.runtime.$injector.invoke(type.def));
	        }
	    };
	    return ParamTypes;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new ParamTypes();
	//# sourceMappingURL=paramTypes.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var Type = (function () {
	    function Type(config) {
	        common_1.extend(this, config);
	    }
	    Type.prototype.is = function (val, key) {
	        return true;
	    };
	    Type.prototype.encode = function (val, key) {
	        return val;
	    };
	    Type.prototype.decode = function (val, key) {
	        return val;
	    };
	    Type.prototype.equals = function (a, b) {
	        return a == b;
	    };
	    Type.prototype.$subPattern = function () {
	        var sub = this.pattern.toString();
	        return sub.substr(1, sub.length - 2);
	    };
	    Type.prototype.toString = function () {
	        return "{Type:" + this.name + "}";
	    };
	    Type.prototype.$normalize = function (val) {
	        return this.is(val) ? val : this.decode(val);
	    };
	    Type.prototype.$asArray = function (mode, isSearch) {
	        if (!mode)
	            return this;
	        if (mode === "auto" && !isSearch)
	            throw new Error("'auto' array mode is for query parameters only");
	        function ArrayType(type, mode) {
	            function bindTo(type, callbackName) {
	                return function () {
	                    return type[callbackName].apply(type, arguments);
	                };
	            }
	            function arrayWrap(val) { return common_1.isArray(val) ? val : (common_1.isDefined(val) ? [val] : []); }
	            function arrayUnwrap(val) {
	                switch (val.length) {
	                    case 0: return undefined;
	                    case 1: return mode === "auto" ? val[0] : val;
	                    default: return val;
	                }
	            }
	            function falsey(val) { return !val; }
	            function arrayHandler(callback, allTruthyMode) {
	                return function handleArray(val) {
	                    var arr = arrayWrap(val);
	                    var result = common_1.map(arr, callback);
	                    if (allTruthyMode === true)
	                        return common_1.filter(result, falsey).length === 0;
	                    return arrayUnwrap(result);
	                };
	            }
	            function arrayEqualsHandler(callback) {
	                return function handleArray(val1, val2) {
	                    var left = arrayWrap(val1), right = arrayWrap(val2);
	                    if (left.length !== right.length)
	                        return false;
	                    for (var i = 0; i < left.length; i++) {
	                        if (!callback(left[i], right[i]))
	                            return false;
	                    }
	                    return true;
	                };
	            }
	            this.encode = arrayHandler(bindTo(type, 'encode'));
	            this.decode = arrayHandler(bindTo(type, 'decode'));
	            this.is = arrayHandler(bindTo(type, 'is'), true);
	            this.equals = arrayEqualsHandler(bindTo(type, 'equals'));
	            this.pattern = type.pattern;
	            this.$normalize = arrayHandler(bindTo(type, '$normalize'));
	            this.name = type.name;
	            this.$arrayMode = mode;
	        }
	        return new ArrayType(this, mode);
	    };
	    return Type;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Type;
	Type.prototype.pattern = /.*/;
	//# sourceMappingURL=type.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var ParamSet = (function () {
	    function ParamSet(params) {
	        common_1.extend(this, params || {});
	    }
	    ParamSet.prototype.$$new = function (params) {
	        var _this = this;
	        return common_1.inherit(common_1.inherit(this, { $$parent: function () { return _this; } }), params);
	    };
	    ParamSet.prototype.$$own = function () {
	        return common_1.extend(new ParamSet(), this);
	    };
	    ParamSet.prototype.$$keys = function () {
	        var keys = [], chain = [], parent = this, ignore = Object.keys(ParamSet.prototype);
	        while (parent) {
	            chain.push(parent);
	            parent = parent.$$parent();
	        }
	        chain.reverse();
	        common_1.forEach(chain, function (paramset) {
	            common_1.forEach(Object.keys(paramset), function (key) {
	                if (keys.indexOf(key) === -1 && ignore.indexOf(key) === -1)
	                    keys.push(key);
	            });
	        });
	        return keys;
	    };
	    ParamSet.prototype.$$values = function (paramValues) {
	        var _this = this;
	        var values = {};
	        common_1.forEach(this.$$keys(), function (key) {
	            values[key] = _this[key].value(paramValues && paramValues[key]);
	        });
	        return values;
	    };
	    ParamSet.prototype.$$equals = function (paramValues1, paramValues2) {
	        var equal = true, self = this;
	        common_1.forEach(self.$$keys(), function (key) {
	            var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
	            if (!self[key].type.equals(left, right))
	                equal = false;
	        });
	        return equal;
	    };
	    ParamSet.prototype.$$validates = function (paramValues) {
	        var keys = this.$$keys(), i, param, rawVal, normalized, encoded;
	        paramValues = paramValues || {};
	        for (i = 0; i < keys.length; i++) {
	            param = this[keys[i]];
	            rawVal = paramValues[keys[i]];
	            if ((rawVal === undefined || rawVal === null) && param.isOptional)
	                continue;
	            normalized = param.type.$normalize(rawVal);
	            if (!param.type.is(normalized))
	                return false;
	            encoded = param.type.encode(normalized);
	            if (common_1.isString(encoded) && !param.type.pattern.exec(encoded))
	                return false;
	        }
	        return true;
	    };
	    ParamSet.prototype.$$filter = function (filterFn) {
	        var self = this, subset = new ParamSet();
	        common_1.forEach(this.$$keys(), function (key) {
	            if (filterFn(self[key]))
	                subset[key] = self[key];
	        });
	        return subset;
	    };
	    ParamSet.prototype.$$parent = function () { return null; };
	    return ParamSet;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ParamSet;
	//# sourceMappingURL=paramSet.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(19);
	exports.path = path;
	var pathFactory = __webpack_require__(16);
	exports.pathFactory = pathFactory;
	//# sourceMappingURL=module.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var resolvable = __webpack_require__(7);
	exports.resolvable = resolvable;
	var resolveContext = __webpack_require__(20);
	exports.resolveContext = resolveContext;
	var resolveInjector = __webpack_require__(23);
	exports.resolveInjector = resolveInjector;
	//# sourceMappingURL=module.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var glob = __webpack_require__(11);
	exports.glob = glob;
	var state = __webpack_require__(33);
	exports.state = state;
	var stateBuilder = __webpack_require__(35);
	exports.stateBuilder = stateBuilder;
	var stateDirectives = __webpack_require__(41);
	exports.stateDirectives = stateDirectives;
	var stateEvents = __webpack_require__(42);
	exports.stateEvents = stateEvents;
	var stateFilters = __webpack_require__(43);
	exports.stateFilters = stateFilters;
	var transitionManager = __webpack_require__(37);
	exports.transitionManager = transitionManager;
	var stateMatcher = __webpack_require__(36);
	exports.stateMatcher = stateMatcher;
	var stateQueueManager = __webpack_require__(34);
	exports.stateQueueManager = stateQueueManager;
	var targetState = __webpack_require__(18);
	exports.targetState = targetState;
	//# sourceMappingURL=module.js.map

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var queue_1 = __webpack_require__(5);
	var glob_1 = __webpack_require__(11);
	var stateQueueManager_1 = __webpack_require__(34);
	var stateBuilder_1 = __webpack_require__(35);
	var stateMatcher_1 = __webpack_require__(36);
	var targetState_1 = __webpack_require__(18);
	var rejectFactory_1 = __webpack_require__(14);
	var transitionService_1 = __webpack_require__(9);
	var path_1 = __webpack_require__(19);
	var pathFactory_1 = __webpack_require__(16);
	var transitionManager_1 = __webpack_require__(37);
	function State(config) {
	    common_1.extend(this, config);
	}
	exports.State = State;
	State.prototype.is = function (ref) {
	    return this === ref || this.self === ref || this.fqn() === ref;
	};
	State.prototype.fqn = function () {
	    if (!this.parent || !(this.parent instanceof this.constructor)) {
	        return this.name;
	    }
	    var name = this.parent.fqn();
	    return name ? name + "." + this.name : this.name;
	};
	State.prototype.root = function () {
	    var result = this;
	    while (result.parent) {
	        result = result.parent;
	    }
	    return result;
	};
	State.prototype.toString = function () {
	    return this.fqn();
	};
	$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
	function $StateProvider($urlRouterProvider, $urlMatcherFactoryProvider) {
	    var root, states = {};
	    var $state = function $state() { };
	    var matcher = new stateMatcher_1.default(states);
	    var builder = new stateBuilder_1.default(function () { return root; }, matcher, $urlMatcherFactoryProvider);
	    var stateQueue = new stateQueueManager_1.default(states, builder, $urlRouterProvider, $state);
	    var transQueue = new queue_1.default();
	    var treeChangesQueue = new queue_1.default();
	    var rejectFactory = new rejectFactory_1.RejectFactory();
	    this.decorator = decorator;
	    function decorator(name, func) {
	        return builder.builder(name, func) || this;
	    }
	    this.state = state;
	    function state(name, definition) {
	        if (common_1.isObject(name)) {
	            definition = name;
	        }
	        else {
	            definition.name = name;
	        }
	        stateQueue.register(definition);
	        return this;
	    }
	    var invalidCallbacks = [];
	    this.onInvalid = onInvalid;
	    function onInvalid(callback) {
	        invalidCallbacks.push(callback);
	    }
	    this.$get = $get;
	    $get.$inject = ['$rootScope', '$q', '$injector', '$view', '$stateParams', '$urlRouter', '$transitions', '$urlMatcherFactory'];
	    function $get($rootScope, $q, $injector, $view, $stateParams, $urlRouter, _$transition, $urlMatcherFactory) {
	        function handleInvalidTargetState(fromPath, $to$) {
	            var latestThing = function () { return transQueue.peekTail() || treeChangesQueue.peekTail(); };
	            var latest = latestThing();
	            var $from$ = pathFactory_1.default.makeTargetState(fromPath);
	            var callbackQueue = new queue_1.default([].concat(invalidCallbacks));
	            var invokeCallback = function (callback) {
	                return $q.when($injector.invoke(callback, null, { $to$: $to$, $from$: $from$ }));
	            };
	            function checkForRedirect(result) {
	                if (result instanceof targetState_1.default) {
	                    var target = result;
	                    target = $state.targetState(target.identifier(), target.params(), target.options());
	                    if (!target.valid())
	                        return rejectFactory.invalid(target.error());
	                    if (latestThing() !== latest)
	                        return rejectFactory.superseded();
	                    return $state.transitionTo(target.identifier(), target.params(), target.options());
	                }
	            }
	            function invokeNextCallback() {
	                var nextCallback = callbackQueue.dequeue();
	                if (nextCallback === undefined)
	                    return rejectFactory.invalid($to$.error());
	                return invokeCallback(nextCallback).then(checkForRedirect).then(function (result) { return result || invokeNextCallback(); });
	            }
	            return invokeNextCallback();
	        }
	        var $transitions = _$transition;
	        var rootStateDef = {
	            name: '',
	            url: '^',
	            views: null,
	            params: {
	                '#': { value: null, type: 'hash' }
	            },
	            'abstract': true
	        };
	        root = stateQueue.register(rootStateDef, true);
	        root.navigable = null;
	        var rootPath = function () { return pathFactory_1.default.bindTransNodesToPath(new path_1.default([pathFactory_1.default.makeResolveNode(pathFactory_1.default.makeParamsNode({}, root))])); };
	        $view.rootContext(root);
	        common_1.extend($state, {
	            params: new StateParams(),
	            current: root.self,
	            $current: root,
	            transition: null
	        });
	        stateQueue.flush($state);
	        stateQueue.autoFlush = true;
	        $state.reload = function reload(reloadState) {
	            var reloadOpt = common_1.isDefined(reloadState) ? reloadState : true;
	            return $state.transitionTo($state.current, $stateParams, {
	                reload: reloadOpt,
	                inherit: false,
	                notify: false
	            });
	        };
	        $state.go = function go(to, params, options) {
	            var defautGoOpts = { relative: $state.$current, inherit: true };
	            var transOpts = common_1.defaults(options, defautGoOpts, transitionService_1.defaultTransOpts);
	            return $state.transitionTo(to, params, transOpts);
	        };
	        $state.targetState = function targetState(identifier, params, options) {
	            if (options === void 0) { options = {}; }
	            var stateDefinition = matcher.find(identifier, options.relative);
	            return new targetState_1.default(identifier, stateDefinition, params, options);
	        };
	        $state.transitionTo = function transitionTo(to, toParams, options) {
	            if (options === void 0) { options = {}; }
	            toParams = toParams || {};
	            options = common_1.defaults(options, transitionService_1.defaultTransOpts);
	            options = common_1.extend(options, { current: transQueue.peekTail.bind(transQueue) });
	            if (common_1.isObject(options.reload) && !options.reload.name)
	                throw new Error('Invalid reload state object');
	            options.reloadState = options.reload === true ? $state.$current.path[0] : matcher.find(options.reload, options.relative);
	            if (options.reload && !options.reloadState)
	                throw new Error("No such reload state '" + (common_1.isString(options.reload) ? options.reload : options.reload.name) + "'");
	            var ref = $state.targetState(to, toParams, options);
	            var latestTreeChanges = treeChangesQueue.peekTail();
	            var currentPath = latestTreeChanges ? latestTreeChanges.to : rootPath();
	            if (!ref.exists())
	                return handleInvalidTargetState(currentPath, ref);
	            if (!ref.valid())
	                return $q.reject(ref.error());
	            var transition = $transitions.create(currentPath, ref);
	            if (!transition.valid())
	                return $q.reject(transition.error());
	            var tMgr = new transitionManager_1.default(transition, $transitions, $urlRouter, $view, $state, $stateParams, $q, transQueue, treeChangesQueue);
	            tMgr.registerHooks();
	            return common_1.extend(tMgr.runTransition(), { transition: transition });
	        };
	        $state.is = function is(stateOrName, params, options) {
	            options = common_1.defaults(options, { relative: $state.$current });
	            var state = matcher.find(stateOrName, options.relative);
	            if (!common_1.isDefined(state))
	                return undefined;
	            if ($state.$current !== state)
	                return false;
	            return common_1.isDefined(params) && params !== null ? state.params.$$equals($stateParams, params) : true;
	        };
	        $state.includes = function includes(stateOrName, params, options) {
	            options = common_1.defaults(options, { relative: $state.$current });
	            var glob = common_1.isString(stateOrName) && glob_1.default.fromString(stateOrName);
	            if (glob) {
	                if (!glob.matches($state.$current.name))
	                    return false;
	                stateOrName = $state.$current.name;
	            }
	            var state = matcher.find(stateOrName, options.relative), include = $state.$current.includes;
	            if (!common_1.isDefined(state))
	                return undefined;
	            if (!common_1.isDefined(include[state.name]))
	                return false;
	            return params ? common_1.equalForKeys(state.params.$$values(params), $stateParams, Object.keys(params)) : true;
	        };
	        $state.href = function href(stateOrName, params, options) {
	            var defaultHrefOpts = {
	                lossy: true,
	                inherit: true,
	                absolute: false,
	                relative: $state.$current
	            };
	            options = common_1.defaults(options, defaultHrefOpts);
	            var state = matcher.find(stateOrName, options.relative);
	            if (!common_1.isDefined(state))
	                return null;
	            if (options.inherit)
	                params = $stateParams.$inherit(params || {}, $state.$current, state);
	            var nav = (state && options.lossy) ? state.navigable : state;
	            if (!nav || nav.url === undefined || nav.url === null) {
	                return null;
	            }
	            return $urlRouter.href(nav.url, state.params.$$values(params), {
	                absolute: options.absolute
	            });
	        };
	        $state.get = function (stateOrName, base) {
	            if (arguments.length === 0)
	                return Object.keys(states).map(function (name) { return states[name].self; });
	            var found = matcher.find(stateOrName, base || $state.$current);
	            return found && found.self || null;
	        };
	        return $state;
	    }
	}
	function StateParams() { }
	exports.StateParams = StateParams;
	$StateParamsProvider.$inject = [];
	function $StateParamsProvider() {
	    function stateParamsFactory() {
	        var observers = {}, current = {};
	        function unhook(key, func) {
	            return function () {
	                common_1.forEach(key.split(" "), function (k) {
	                    observers[k].splice(observers[k].indexOf(func), 1);
	                });
	            };
	        }
	        function observeChange(key, val) {
	            if (!observers[key] || !observers[key].length)
	                return;
	            common_1.forEach(observers[key], function (func) {
	                func(val);
	            });
	        }
	        StateParams.prototype.$digest = function () {
	            function updateValue(val, key) {
	                if (val === current[key] || !this.hasOwnProperty(key))
	                    return;
	                current[key] = val;
	                observeChange(key, val);
	            }
	            common_1.forEach(this, updateValue, this);
	        };
	        StateParams.prototype.$inherit = function (newParams, $current, $to) {
	            var parents = common_1.ancestors($current, $to), parentParams, inherited = {}, inheritList = [];
	            for (var i in parents) {
	                if (!parents[i].params)
	                    continue;
	                parentParams = Object.keys(parents[i].params);
	                if (!parentParams.length)
	                    continue;
	                for (var j in parentParams) {
	                    if (inheritList.indexOf(parentParams[j]) >= 0)
	                        continue;
	                    inheritList.push(parentParams[j]);
	                    inherited[parentParams[j]] = this[parentParams[j]];
	                }
	            }
	            return common_1.extend({}, inherited, newParams);
	        };
	        StateParams.prototype.$set = function (params, url) {
	            var hasChanged = false, abort = false;
	            if (url) {
	                common_1.forEach(params, function (val, key) {
	                    if ((url.parameters(key) || {}).dynamic !== true)
	                        abort = true;
	                });
	            }
	            if (abort)
	                return false;
	            function updateValue(val, key) {
	                if (val !== this[key]) {
	                    this[key] = val;
	                    observeChange(key);
	                    hasChanged = true;
	                }
	            }
	            common_1.forEach(params, updateValue, this);
	            this.$sync();
	            return hasChanged;
	        };
	        StateParams.prototype.$sync = function () {
	            common_1.copy(this, current);
	            return this;
	        };
	        StateParams.prototype.$off = function () {
	            observers = {};
	            return this;
	        };
	        StateParams.prototype.$raw = function () {
	            var raw = {};
	            for (var key in this) {
	                if (!StateParams.prototype.hasOwnProperty(key))
	                    raw[key] = this[key];
	            }
	            return raw;
	        };
	        StateParams.prototype.$localize = function (state, params) {
	            var localized = new StateParams();
	            params = params || this;
	            common_1.forEach(state.params, function (val, key) {
	                localized[key] = params[key];
	            });
	            return localized;
	        };
	        StateParams.prototype.$observe = function (key, func) {
	            common_1.forEach(key.split(" "), function (k) {
	                (observers[k] || (observers[k] = [])).push(func);
	            });
	            return unhook(key, func);
	        };
	        return new StateParams();
	    }
	    var global = stateParamsFactory();
	    this.$get = $get;
	    $get.$inject = ['$rootScope'];
	    function $get($rootScope) {
	        $rootScope.$watch(function () {
	            global.$digest();
	        });
	        return global;
	    }
	}
	angular.module('ui.router.state')
	    .provider('$stateParams', $StateParamsProvider)
	    .provider('$state', $StateProvider)
	    .run(['$state', function ($state) { }]);
	//# sourceMappingURL=state.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var state_1 = __webpack_require__(33);
	function StateQueueManager(states, builder, $urlRouterProvider, $state) {
	    var queue = [];
	    var queueManager = common_1.extend(this, {
	        register: function (config, pre) {
	            var state = common_1.inherit(new state_1.State(), common_1.extend({}, config, {
	                self: config,
	                resolve: config.resolve || {},
	                toString: function () { return config.name; }
	            }));
	            if (!common_1.isString(state.name))
	                throw new Error("State must have a valid name");
	            if (states.hasOwnProperty(state.name) || common_1.pluck(queue, 'name').indexOf(state.name) !== -1)
	                throw new Error("State '" + state.name + "' is already defined");
	            queue[pre ? "unshift" : "push"](state);
	            if (queueManager.autoFlush) {
	                queueManager.flush($state);
	            }
	            return state;
	        },
	        flush: function ($state) {
	            var result, state, orphans = [], orphanIdx, previousQueueLength = {};
	            while (queue.length > 0) {
	                state = queue.shift();
	                result = builder.build(state);
	                orphanIdx = orphans.indexOf(state);
	                if (result) {
	                    if (states.hasOwnProperty(state.name))
	                        throw new Error("State '" + name + "' is already defined");
	                    states[state.name] = state;
	                    this.attachRoute($state, state);
	                    if (orphanIdx >= 0)
	                        orphans.splice(orphanIdx, 1);
	                    continue;
	                }
	                var prev = previousQueueLength[state.name];
	                previousQueueLength[state.name] = queue.length;
	                if (orphanIdx >= 0 && prev === queue.length) {
	                    throw new Error("Cannot register orphaned state '" + state.name + "'");
	                }
	                else if (orphanIdx < 0) {
	                    orphans.push(state);
	                }
	                queue.push(state);
	            }
	            return states;
	        },
	        autoFlush: false,
	        attachRoute: function ($state, state) {
	            if (state[common_1.abstractKey] || !state.url)
	                return;
	            $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
	                    if ($state.$current.navigable !== state || !common_1.equalForKeys($match, $stateParams)) {
	                        $state.transitionTo(state, $match, { inherit: true, location: false });
	                    }
	                }]);
	        }
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StateQueueManager;
	//# sourceMappingURL=stateQueueManager.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var paramSet_1 = __webpack_require__(29);
	var param_1 = __webpack_require__(25);
	function StateBuilder(root, matcher, $urlMatcherFactoryProvider) {
	    var self = this, builders = {
	        parent: function (state) {
	            return matcher.find(self.parentName(state));
	        },
	        data: function (state) {
	            if (state.parent && state.parent.data) {
	                state.data = state.self.data = common_1.extend({}, state.parent.data, state.data);
	            }
	            return state.data;
	        },
	        url: function (state) {
	            var url = state.url, config = { params: state.params || {} };
	            var parent = state.parent;
	            if (common_1.isString(url)) {
	                if (url.charAt(0) === '^')
	                    return $urlMatcherFactoryProvider.compile(url.substring(1), config);
	                return ((parent && parent.navigable) || root()).url.concat(url, config);
	            }
	            if (!url || $urlMatcherFactoryProvider.isMatcher(url))
	                return url;
	            throw new Error("Invalid url '" + url + "' in state '" + state + "'");
	        },
	        navigable: function (state) {
	            return (state !== root()) && state.url ? state : (state.parent ? state.parent.navigable : null);
	        },
	        ownParams: function (state) {
	            var params = state.url && state.url.params.$$own() || new paramSet_1.default();
	            common_1.forEach(state.params || {}, function (config, id) {
	                if (!params[id])
	                    params[id] = new param_1.default(id, null, config, "config");
	            });
	            if (state.reloadOnSearch === false) {
	                common_1.forEach(params, function (param) { if (param && param.location === 'search')
	                    param.dynamic = true; });
	            }
	            return params;
	        },
	        params: function (state) {
	            var base = state.parent && state.parent.params ? state.parent.params.$$new() : new paramSet_1.default();
	            return common_1.extend(base, state.ownParams);
	        },
	        views: function (state) {
	            var views = {}, tplKeys = ['templateProvider', 'templateUrl', 'template', 'notify', 'async'], ctrlKeys = ['controller', 'controllerProvider', 'controllerAs'];
	            var allKeys = tplKeys.concat(ctrlKeys);
	            common_1.forEach(state.views || { "$default": common_1.pick(state, allKeys) }, function (config, name) {
	                name = name || "$default";
	                common_1.forEach(ctrlKeys, function (key) {
	                    if (state[key] && !config[key])
	                        config[key] = state[key];
	                });
	                if (Object.keys(config).length > 0)
	                    views[name] = config;
	            });
	            return views;
	        },
	        path: function (state) {
	            return state.parent ? state.parent.path.concat(state) : [state];
	        },
	        includes: function (state) {
	            var includes = state.parent ? common_1.extend({}, state.parent.includes) : {};
	            includes[state.name] = true;
	            return includes;
	        }
	    };
	    common_1.extend(this, {
	        builder: function (_name, _func) {
	            if (common_1.isString(_name) && !common_1.isDefined(_func))
	                return builders[_name];
	            if (!common_1.isFunction(_func) || !common_1.isString(_name))
	                return;
	            function remove(name, func) {
	                if (!builders[name].length) {
	                    delete builders[name];
	                    return;
	                }
	                builders[name].splice(builders[name].indexOf(func, 1));
	                if (builders[name].length === 1) {
	                    builders[name] = builders[name][0];
	                }
	            }
	            function add(name, func) {
	                if (!builders[name]) {
	                    builders[name] = func;
	                    return function () { remove(name, func); };
	                }
	                if (!common_1.isArray(builders[name])) {
	                    builders[name] = [builders[name]];
	                }
	                builders[name].push(func);
	                return function () { remove(name, func); };
	            }
	            return add(_name, _func);
	        },
	        build: function (state) {
	            var parent = this.parentName(state);
	            if (parent && !matcher.find(parent))
	                return null;
	            for (var key in builders) {
	                if (!builders.hasOwnProperty(key))
	                    continue;
	                var steps = common_1.isArray(builders[key]) ? builders[key].reverse() : [builders[key]];
	                var chainFns = function (memo, step) { return step(state, memo); };
	                state[key] = steps.reduce(chainFns, common_1.noop);
	            }
	            return state;
	        },
	        parentName: function (state) {
	            var name = state.name || "";
	            if (name.indexOf('.') !== -1)
	                return name.substring(0, name.lastIndexOf('.'));
	            if (!state.parent)
	                return "";
	            return common_1.isString(state.parent) ? state.parent : state.parent.name;
	        },
	        name: function (state) {
	            var name = state.name;
	            if (name.indexOf('.') !== -1 || !state.parent)
	                return name;
	            var parentName = common_1.isString(state.parent) ? state.parent : state.parent.name;
	            return parentName ? parentName + "." + name : name;
	        }
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StateBuilder;
	//# sourceMappingURL=stateBuilder.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var StateMatcher = (function () {
	    function StateMatcher(_states) {
	        this._states = _states;
	    }
	    StateMatcher.prototype.isRelative = function (stateName) {
	        stateName = stateName || "";
	        return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
	    };
	    StateMatcher.prototype.find = function (stateOrName, base) {
	        if (!stateOrName && stateOrName !== "")
	            return undefined;
	        var isStr = common_1.isString(stateOrName);
	        var name = isStr ? stateOrName : stateOrName.name;
	        if (this.isRelative(name))
	            name = this.resolvePath(name, base);
	        var state = this._states[name];
	        if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
	            return state;
	        }
	        return undefined;
	    };
	    StateMatcher.prototype.resolvePath = function (name, base) {
	        if (!base)
	            throw new Error("No reference point given for path '" + name + "'");
	        var baseState = this.find(base);
	        var splitName = name.split("."), i = 0, pathLength = splitName.length, current = baseState;
	        for (; i < pathLength; i++) {
	            if (splitName[i] === "" && i === 0) {
	                current = baseState;
	                continue;
	            }
	            if (splitName[i] === "^") {
	                if (!current.parent)
	                    throw new Error("Path '" + name + "' not valid for state '" + baseState.name + "'");
	                current = current.parent;
	                continue;
	            }
	            break;
	        }
	        var relName = splitName.slice(i).join(".");
	        return current.name + (current.name && relName ? "." : "") + relName;
	    };
	    return StateMatcher;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StateMatcher;
	//# sourceMappingURL=stateMatcher.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var transition_1 = __webpack_require__(8);
	var rejectFactory_1 = __webpack_require__(14);
	var viewHooks_1 = __webpack_require__(38);
	var enterExitHooks_1 = __webpack_require__(39);
	var resolveHooks_1 = __webpack_require__(40);
	var TransitionManager = (function () {
	    function TransitionManager(transition, $transitions, $urlRouter, $view, $state, $stateParams, $q, activeTransQ, changeHistory) {
	        this.transition = transition;
	        this.$transitions = $transitions;
	        this.$urlRouter = $urlRouter;
	        this.$view = $view;
	        this.$state = $state;
	        this.$stateParams = $stateParams;
	        this.$q = $q;
	        this.activeTransQ = activeTransQ;
	        this.changeHistory = changeHistory;
	        this.viewHooks = new viewHooks_1.default(transition, $view);
	        this.enterExitHooks = new enterExitHooks_1.default(transition);
	        this.resolveHooks = new resolveHooks_1.default(transition);
	        this.treeChanges = transition.treeChanges();
	    }
	    TransitionManager.prototype.registerHooks = function () {
	        this.registerUpdateGlobalState();
	        this.viewHooks.registerHooks();
	        this.enterExitHooks.registerHooks();
	        this.resolveHooks.registerHooks();
	    };
	    TransitionManager.prototype.runTransition = function () {
	        var _this = this;
	        this.activeTransQ.clear();
	        this.activeTransQ.enqueue(this.transition);
	        return this.transition.run()
	            .then(function (trans) { return trans.to(); })
	            .catch(function (error) { return _this.transRejected(error); })
	            .finally(function () { return _this.activeTransQ.remove(_this.transition); });
	    };
	    TransitionManager.prototype.registerUpdateGlobalState = function () {
	        this.transition.onFinish({}, this.updateGlobalState.bind(this), { priority: -10000 });
	    };
	    TransitionManager.prototype.updateGlobalState = function () {
	        var _a = this, treeChanges = _a.treeChanges, transition = _a.transition, $state = _a.$state, changeHistory = _a.changeHistory;
	        $state.$current = transition.$to();
	        $state.current = $state.$current.self;
	        changeHistory.enqueue(treeChanges);
	        this.updateStateParams();
	    };
	    TransitionManager.prototype.transRejected = function (error) {
	        var _a = this, transition = _a.transition, $state = _a.$state, $stateParams = _a.$stateParams, $q = _a.$q;
	        if (error instanceof rejectFactory_1.TransitionRejection) {
	            if (error.type === rejectFactory_1.RejectType.IGNORED) {
	                if (!$state.$current.params.$$filter(common_1.prop('dynamic')).$$equals($stateParams, transition.params())) {
	                    this.updateStateParams();
	                }
	                return $state.current;
	            }
	            if (error.type === rejectFactory_1.RejectType.SUPERSEDED) {
	                if (error.redirected && error.detail instanceof transition_1.Transition) {
	                    var tMgr = this._redirectMgr(error.detail);
	                    tMgr.registerHooks();
	                    return tMgr.runTransition();
	                }
	            }
	        }
	        this.$transitions.defaultErrorHandler()(error);
	        return $q.reject(error);
	    };
	    TransitionManager.prototype.updateStateParams = function () {
	        var _a = this, transition = _a.transition, $urlRouter = _a.$urlRouter, $state = _a.$state, $stateParams = _a.$stateParams;
	        var options = transition.options();
	        $state.params = transition.params();
	        common_1.copy($state.params, $stateParams);
	        $stateParams.$sync().$off();
	        if (options.location && $state.$current.navigable) {
	            $urlRouter.push($state.$current.navigable.url, $stateParams, { replace: options.location === 'replace' });
	        }
	        $urlRouter.update(true);
	    };
	    TransitionManager.prototype._redirectMgr = function (redirect) {
	        var _a = this, $transitions = _a.$transitions, $urlRouter = _a.$urlRouter, $view = _a.$view, $state = _a.$state, $stateParams = _a.$stateParams, $q = _a.$q, activeTransQ = _a.activeTransQ, changeHistory = _a.changeHistory;
	        return new TransitionManager(redirect, $transitions, $urlRouter, $view, $state, $stateParams, $q, activeTransQ, changeHistory);
	    };
	    return TransitionManager;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TransitionManager;
	//# sourceMappingURL=transitionManager.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var angular1_1 = __webpack_require__(3);
	var ViewHooks = (function () {
	    function ViewHooks(transition, $view) {
	        this.transition = transition;
	        this.$view = $view;
	        this.treeChanges = transition.treeChanges();
	        this.enteringViews = transition.views("entering");
	        this.exitingViews = transition.views("exiting");
	    }
	    ViewHooks.prototype.loadAllEnteringViews = function () {
	        var _this = this;
	        var loadView = function (vc) {
	            var resolveInjector = _this.treeChanges.to.nodeForState(vc.context.name).resolveInjector;
	            return _this.$view.load(vc, resolveInjector);
	        };
	        return angular1_1.runtime.$q.all(this.enteringViews.map(loadView)).then(common_1.noop);
	    };
	    ViewHooks.prototype.loadAllControllerLocals = function () {
	        var _this = this;
	        var loadLocals = function (vc) {
	            var deps = angular1_1.annotateController(vc.controller);
	            var resolveInjector = _this.treeChanges.to.nodeForState(vc.context.name).resolveInjector;
	            function $loadControllerLocals() { }
	            $loadControllerLocals.$inject = deps;
	            return angular1_1.runtime.$q.all(resolveInjector.getLocals($loadControllerLocals)).then(function (locals) { return vc.locals = locals; });
	        };
	        var loadAllLocals = this.enteringViews.filter(function (vc) { return !!vc.controller; }).map(loadLocals);
	        return angular1_1.runtime.$q.all(loadAllLocals).then(common_1.noop);
	    };
	    ViewHooks.prototype.updateViews = function () {
	        var $view = this.$view;
	        this.exitingViews.forEach(function (viewConfig) { return $view.reset(viewConfig); });
	        this.enteringViews.forEach(function (viewConfig) { return $view.registerStateViewConfig(viewConfig); });
	        $view.sync();
	    };
	    ViewHooks.prototype.registerHooks = function () {
	        if (this.enteringViews.length) {
	            this.transition.onStart({}, this.loadAllEnteringViews.bind(this));
	            this.transition.onFinish({}, this.loadAllControllerLocals.bind(this));
	        }
	        if (this.exitingViews.length || this.enteringViews.length)
	            this.transition.onSuccess({}, this.updateViews.bind(this));
	    };
	    return ViewHooks;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ViewHooks;
	//# sourceMappingURL=viewHooks.js.map

/***/ },
/* 39 */
/***/ function(module, exports) {

	var EnterExitHooks = (function () {
	    function EnterExitHooks(transition) {
	        this.transition = transition;
	    }
	    EnterExitHooks.prototype.registerHooks = function () {
	        this.registerOnEnterHooks();
	        this.registerOnRetainHooks();
	        this.registerOnExitHooks();
	    };
	    EnterExitHooks.prototype.registerOnEnterHooks = function () {
	        var _this = this;
	        var onEnterRegistration = function (state) { return _this.transition.onEnter({ to: state.name }, state.onEnter); };
	        this.transition.entering().filter(function (state) { return !!state.onEnter; }).forEach(onEnterRegistration);
	    };
	    EnterExitHooks.prototype.registerOnRetainHooks = function () {
	        var _this = this;
	        var onRetainRegistration = function (state) { return _this.transition.onRetain({}, state.onRetain); };
	        this.transition.retained().filter(function (state) { return !!state.onRetain; }).forEach(onRetainRegistration);
	    };
	    EnterExitHooks.prototype.registerOnExitHooks = function () {
	        var _this = this;
	        var onExitRegistration = function (state) { return _this.transition.onExit({ from: state.name }, state.onExit); };
	        this.transition.exiting().filter(function (state) { return !!state.onExit; }).forEach(onExitRegistration);
	    };
	    return EnterExitHooks;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = EnterExitHooks;
	//# sourceMappingURL=enterExitHooks.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var interface_1 = __webpack_require__(21);
	var LAZY = interface_1.ResolvePolicy[interface_1.ResolvePolicy.LAZY];
	var EAGER = interface_1.ResolvePolicy[interface_1.ResolvePolicy.EAGER];
	var ResolveHooks = (function () {
	    function ResolveHooks(transition) {
	        this.transition = transition;
	    }
	    ResolveHooks.prototype.registerHooks = function () {
	        var treeChanges = this.transition.treeChanges();
	        $eagerResolvePath.$inject = ['$transition$'];
	        function $eagerResolvePath($transition$) {
	            return treeChanges.to.last().resolveContext.resolvePath(common_1.extend({ transition: $transition$ }, { resolvePolicy: EAGER }));
	        }
	        $lazyResolveEnteringState.$inject = ['$state$', '$transition$'];
	        function $lazyResolveEnteringState($state$, $transition$) {
	            var node = treeChanges.entering.nodeForState($state$);
	            return node.resolveContext.resolvePathElement(node.state, common_1.extend({ transition: $transition$ }, { resolvePolicy: LAZY }));
	        }
	        this.transition.onStart({}, $eagerResolvePath, { priority: 1000 });
	        this.transition.onEnter({}, $lazyResolveEnteringState, { priority: 1000 });
	    };
	    return ResolveHooks;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ResolveHooks;
	//# sourceMappingURL=resolveHooks.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	var transitionService_1 = __webpack_require__(9);
	function parseStateRef(ref, current) {
	    var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
	    if (preparsed)
	        ref = current + '(' + preparsed[1] + ')';
	    parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
	    if (!parsed || parsed.length !== 4)
	        throw new Error("Invalid state ref '" + ref + "'");
	    return { state: parsed[1], paramExpr: parsed[3] || null };
	}
	function stateContext(el) {
	    var stateData = el.parent().inheritedData('$uiView');
	    if (stateData && stateData.context && stateData.context.name) {
	        return stateData.context;
	    }
	}
	$StateRefDirective.$inject = ['$state', '$timeout'];
	function $StateRefDirective($state, $timeout) {
	    return {
	        restrict: 'A',
	        require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	        link: function (scope, element, attrs, uiSrefActive) {
	            var ref = parseStateRef(attrs.uiSref, $state.current.name);
	            var params = null, base = stateContext(element) || $state.$current;
	            var newHref = null, isAnchor = element.prop("tagName") === "A";
	            var isForm = element[0].nodeName === "FORM";
	            var attr = isForm ? "action" : "href", nav = true;
	            var srefOpts = scope.$eval(attrs.uiSrefOpts);
	            var defaultSrefOpts = { relative: base, inherit: true };
	            var options = common_1.defaults(srefOpts, defaultSrefOpts, transitionService_1.defaultTransOpts);
	            var update = function (newVal) {
	                if (newVal)
	                    params = common_1.copy(newVal);
	                if (!nav)
	                    return;
	                newHref = $state.href(ref.state, params, options);
	                var activeDirective = uiSrefActive[1] || uiSrefActive[0];
	                if (activeDirective) {
	                    activeDirective.$$addStateInfo(ref.state, params);
	                }
	                if (newHref === null) {
	                    nav = false;
	                    return false;
	                }
	                attrs.$set(attr, newHref);
	            };
	            if (ref.paramExpr) {
	                scope.$watch(ref.paramExpr, function (newVal) { if (newVal !== params)
	                    update(newVal); }, true);
	                params = common_1.copy(scope.$eval(ref.paramExpr));
	            }
	            update();
	            if (isForm)
	                return;
	            element.bind("click", function (e) {
	                var button = e.which || e.button;
	                if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr('target'))) {
	                    var transition = $timeout(function () {
	                        $state.go(ref.state, params, options);
	                    });
	                    e.preventDefault();
	                    var ignorePreventDefaultCount = isAnchor && !newHref ? 1 : 0;
	                    e.preventDefault = function () {
	                        if (ignorePreventDefaultCount-- <= 0)
	                            $timeout.cancel(transition);
	                    };
	                }
	            });
	        }
	    };
	}
	$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
	function $StateRefActiveDirective($state, $stateParams, $interpolate) {
	    return {
	        restrict: "A",
	        controller: ['$scope', '$element', '$attrs', '$timeout', '$transitions', function ($scope, $element, $attrs, $timeout, $transitions) {
	                var states = [], activeClass, activeEqClass;
	                activeClass = $interpolate($attrs.uiSrefActive || '', false)($scope);
	                activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);
	                this.$$addStateInfo = function (newState, newParams) {
	                    var state = $state.get(newState, stateContext($element));
	                    states.push({
	                        state: state || { name: newState },
	                        params: newParams
	                    });
	                    update();
	                };
	                var updateAfterTransition = function ($transition$) { $transition$.promise.then(update); };
	                var deregisterFn = $transitions.onStart({}, updateAfterTransition);
	                $scope.$on('$destroy', deregisterFn);
	                function update() {
	                    for (var i = 0; i < states.length; i++) {
	                        if (anyMatch(states[i].state, states[i].params)) {
	                            addClass($element, activeClass);
	                        }
	                        else {
	                            removeClass($element, activeClass);
	                        }
	                        if (exactMatch(states[i].state, states[i].params)) {
	                            addClass($element, activeEqClass);
	                        }
	                        else {
	                            removeClass($element, activeEqClass);
	                        }
	                    }
	                }
	                function addClass(el, className) { $timeout(function () { el.addClass(className); }); }
	                function removeClass(el, className) { el.removeClass(className); }
	                function anyMatch(state, params) { return $state.includes(state.name, params); }
	                function exactMatch(state, params) { return $state.is(state.name, params); }
	            }]
	    };
	}
	angular.module('ui.router.state')
	    .directive('uiSref', $StateRefDirective)
	    .directive('uiSrefActive', $StateRefActiveDirective)
	    .directive('uiSrefActiveEq', $StateRefActiveDirective);
	//# sourceMappingURL=stateDirectives.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	var state_1 = __webpack_require__(33);
	var transitionService_1 = __webpack_require__(9);
	var rejectFactory_1 = __webpack_require__(14);
	stateChangeStartHandler.$inject = ['$transition$', '$stateEvents', '$rootScope', '$urlRouter'];
	function stateChangeStartHandler($transition$, $stateEvents, $rootScope, $urlRouter) {
	    if (!$transition$.options().notify)
	        return;
	    var enabledEvents = $stateEvents.provider.enabled();
	    var toParams = $transition$.params("to");
	    var fromParams = $transition$.params("from");
	    if (enabledEvents.$stateChangeStart && $rootScope.$broadcast('$stateChangeStart', $transition$.to(), toParams, $transition$.from(), fromParams, $transition$).defaultPrevented) {
	        if (enabledEvents.$stateChangeCancel) {
	            $rootScope.$broadcast('$stateChangeCancel', $transition$.to(), toParams, $transition$.from(), fromParams, $transition$);
	        }
	        $urlRouter.update();
	        return false;
	    }
	    if (enabledEvents.$stateChangeSuccess) {
	        $transition$.promise.then(function () {
	            $rootScope.$broadcast('$stateChangeSuccess', $transition$.to(), common_1.extend(new state_1.StateParams(), toParams).$raw(), $transition$.from(), common_1.extend(new state_1.StateParams(), fromParams).$raw());
	        });
	    }
	    if (enabledEvents.$stateChangeError) {
	        $transition$.promise["catch"](function (error) {
	            if (error && (error.type === rejectFactory_1.RejectType.SUPERSEDED || error.type === rejectFactory_1.RejectType.ABORTED))
	                return;
	            var evt = $rootScope.$broadcast('$stateChangeError', $transition$.to(), common_1.extend(new state_1.StateParams(), toParams).$raw(), $transition$.from(), common_1.extend(new state_1.StateParams(), fromParams).$raw(), error);
	            if (!evt.defaultPrevented) {
	                $urlRouter.update();
	            }
	        });
	    }
	}
	stateNotFoundHandler.$inject = ['$to$', '$from$', '$state', '$rootScope', '$urlRouter'];
	function stateNotFoundHandler($to$, $from$, $state, $rootScope, $urlRouter) {
	    var redirect = { to: $to$.identifier(), toParams: $to$.params(), options: $to$.options() };
	    var e = $rootScope.$broadcast('$stateNotFound', redirect, $from$.state(), $from$.params());
	    if (e.defaultPrevented || e.retry)
	        $urlRouter.update();
	    function redirectFn() {
	        return $state.targetState(redirect.to, redirect.toParams, redirect.options);
	    }
	    if (e.defaultPrevented) {
	        return false;
	    }
	    else if (e.retry || $state.get(redirect.to)) {
	        return e.retry && common_1.isFunction(e.retry.then) ? e.retry.then(redirectFn) : redirectFn();
	    }
	}
	exports.stateNotFoundHandler = stateNotFoundHandler;
	$StateEventsProvider.$inject = ['$stateProvider'];
	function $StateEventsProvider($stateProvider) {
	    $StateEventsProvider.prototype.instance = this;
	    var runtime = false;
	    var allEvents = ['$stateChangeStart', '$stateNotFound', '$stateChangeSuccess', '$stateChangeError'];
	    var enabledStateEvents = allEvents.reduce(function (memo, key) { return common_1.applyPairs(memo, key, false); }, {});
	    function assertNotRuntime() {
	        if (runtime)
	            throw new Error("Cannot enable events at runtime (use $stateEventsProvider");
	    }
	    this.enable = function () {
	        var events = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            events[_i - 0] = arguments[_i];
	        }
	        assertNotRuntime();
	        if (!events || !events.length)
	            events = allEvents;
	        events.forEach(function (event) { return enabledStateEvents[event] = true; });
	    };
	    this.disable = function () {
	        var events = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            events[_i - 0] = arguments[_i];
	        }
	        assertNotRuntime();
	        if (!events || !events.length)
	            events = allEvents;
	        events.forEach(function (event) { return delete enabledStateEvents[event]; });
	    };
	    this.enabled = function () { return enabledStateEvents; };
	    this.$get = function () {
	        runtime = true;
	        if (enabledStateEvents["$stateNotFound"])
	            $stateProvider.onInvalid(stateNotFoundHandler);
	        if (enabledStateEvents.$stateChangeStart)
	            transitionService_1.default.onBefore({}, stateChangeStartHandler, { priority: 1000 });
	        return {
	            provider: $StateEventsProvider.prototype.instance
	        };
	    };
	}
	angular.module('ui.router.state.events', ['ui.router.state'])
	    .provider("$stateEvents", $StateEventsProvider)
	    .run(['$stateEvents', function ($stateEvents) { }]);
	//# sourceMappingURL=stateEvents.js.map

/***/ },
/* 43 */
/***/ function(module, exports) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	$IsStateFilter.$inject = ['$state'];
	function $IsStateFilter($state) {
	    return function (state) {
	        return $state.is(state);
	    };
	}
	exports.$IsStateFilter = $IsStateFilter;
	$IncludedByStateFilter.$inject = ['$state'];
	function $IncludedByStateFilter($state) {
	    return function (state) {
	        return $state.includes(state);
	    };
	}
	exports.$IncludedByStateFilter = $IncludedByStateFilter;
	angular.module('ui.router.state')
	    .filter('isState', $IsStateFilter)
	    .filter('includedByState', $IncludedByStateFilter);
	//# sourceMappingURL=stateFilters.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var hookBuilder = __webpack_require__(12);
	exports.hookBuilder = hookBuilder;
	var hookRegistry = __webpack_require__(10);
	exports.hookRegistry = hookRegistry;
	var rejectFactory = __webpack_require__(14);
	exports.rejectFactory = rejectFactory;
	var transition = __webpack_require__(8);
	exports.transition = transition;
	var transitionHook = __webpack_require__(13);
	exports.transitionHook = transitionHook;
	var transitionService = __webpack_require__(9);
	exports.transitionService = transitionService;
	//# sourceMappingURL=module.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var urlMatcher = __webpack_require__(46);
	exports.urlMatcher = urlMatcher;
	var urlMatcherConfig = __webpack_require__(26);
	exports.urlMatcherConfig = urlMatcherConfig;
	var urlMatcherFactory = __webpack_require__(47);
	exports.urlMatcherFactory = urlMatcherFactory;
	var urlRouter = __webpack_require__(48);
	exports.urlRouter = urlRouter;
	//# sourceMappingURL=module.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var urlMatcherConfig_1 = __webpack_require__(26);
	var paramTypes_1 = __webpack_require__(27);
	var paramSet_1 = __webpack_require__(29);
	var param_1 = __webpack_require__(25);
	var UrlMatcher = (function () {
	    function UrlMatcher(pattern, config, parentMatcher) {
	        config = common_1.extend({ params: {} }, common_1.isObject(config) ? config : {});
	        var placeholder = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, searchPlaceholder = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, compiled = '^', last = 0, m, segments = this.segments = [], parentParams = parentMatcher ? parentMatcher.params : {}, params = this.params = parentMatcher ? parentMatcher.params.$$new() : new paramSet_1.default(), paramNames = [];
	        function addParameter(id, type, config, location) {
	            paramNames.push(id);
	            if (parentParams[id])
	                return parentParams[id];
	            if (!/^\w+(-+\w+)*(?:\[\])?$/.test(id))
	                throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
	            if (params[id])
	                throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
	            params[id] = new param_1.default(id, type, config, location);
	            return params[id];
	        }
	        function quoteRegExp(string, pattern, squash, optional) {
	            var surroundPattern = ['', ''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
	            if (!pattern)
	                return result;
	            switch (squash) {
	                case false:
	                    surroundPattern = ['(', ')' + (optional ? "?" : "")];
	                    break;
	                case true:
	                    surroundPattern = ['?(', ')?'];
	                    break;
	                default:
	                    surroundPattern = [("(" + squash + "|"), ')?'];
	                    break;
	            }
	            return result + surroundPattern[0] + pattern + surroundPattern[1];
	        }
	        this.source = pattern;
	        function matchDetails(m, isSearch) {
	            var id, regexp, segment, type, cfg, arrayMode;
	            id = m[2] || m[3];
	            cfg = config.params[id];
	            segment = pattern.substring(last, m.index);
	            regexp = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);
	            type = paramTypes_1.default.type(regexp || "string") || common_1.inherit(paramTypes_1.default.type("string"), { pattern: new RegExp(regexp, config.caseInsensitive ? 'i' : undefined) });
	            return { id: id, regexp: regexp, segment: segment, type: type, cfg: cfg };
	        }
	        var p, param, segment;
	        while ((m = placeholder.exec(pattern))) {
	            p = matchDetails(m, false);
	            if (p.segment.indexOf('?') >= 0)
	                break;
	            param = addParameter(p.id, p.type, p.cfg, "path");
	            compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional);
	            segments.push(p.segment);
	            last = placeholder.lastIndex;
	        }
	        segment = pattern.substring(last);
	        var i = segment.indexOf('?');
	        if (i >= 0) {
	            var search = this.sourceSearch = segment.substring(i);
	            segment = segment.substring(0, i);
	            this.sourcePath = pattern.substring(0, last + i);
	            if (search.length > 0) {
	                last = 0;
	                while ((m = searchPlaceholder.exec(search))) {
	                    p = matchDetails(m, true);
	                    param = addParameter(p.id, p.type, p.cfg, "search");
	                    last = placeholder.lastIndex;
	                }
	            }
	        }
	        else {
	            this.sourcePath = pattern;
	            this.sourceSearch = '';
	        }
	        compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';
	        segments.push(segment);
	        this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);
	        this.prefix = segments[0];
	        this.$$paramNames = paramNames;
	    }
	    UrlMatcher.prototype.concat = function (pattern, config) {
	        var defaultConfig = {
	            caseInsensitive: urlMatcherConfig_1.default.caseInsensitive(),
	            strict: urlMatcherConfig_1.default.strictMode(),
	            squash: urlMatcherConfig_1.default.defaultSquashPolicy()
	        };
	        return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, common_1.extend(defaultConfig, config), this);
	    };
	    UrlMatcher.prototype.toString = function () {
	        return this.source;
	    };
	    UrlMatcher.prototype.exec = function (path, searchParams, hash) {
	        var m = this.regexp.exec(path);
	        if (!m)
	            return null;
	        searchParams = searchParams || {};
	        var paramNames = this.parameters(), nTotal = paramNames.length, nPath = this.segments.length - 1, values = {}, i, j, cfg, paramName;
	        if (nPath !== m.length - 1)
	            throw new Error("Unbalanced capture group in route '" + this.source + "'");
	        function decodePathArray(string) {
	            function reverseString(str) { return str.split("").reverse().join(""); }
	            function unquoteDashes(str) { return str.replace(/\\-/g, "-"); }
	            var split = reverseString(string).split(/-(?!\\)/);
	            var allReversed = common_1.map(split, reverseString);
	            return common_1.map(allReversed, unquoteDashes).reverse();
	        }
	        for (i = 0; i < nPath; i++) {
	            paramName = paramNames[i];
	            var param = this.params[paramName];
	            var paramVal = m[i + 1];
	            for (j = 0; j < param.replace; j++) {
	                if (param.replace[j].from === paramVal)
	                    paramVal = param.replace[j].to;
	            }
	            if (paramVal && param.array === true)
	                paramVal = decodePathArray(paramVal);
	            values[paramName] = param.value(paramVal);
	        }
	        for (; i < nTotal; i++) {
	            paramName = paramNames[i];
	            values[paramName] = this.params[paramName].value(searchParams[paramName]);
	        }
	        if (hash)
	            values["#"] = hash;
	        return values;
	    };
	    UrlMatcher.prototype.parameters = function (param) {
	        if (!common_1.isDefined(param))
	            return this.$$paramNames;
	        return this.params[param] || null;
	    };
	    UrlMatcher.prototype.validates = function (params) {
	        return this.params.$$validates(params);
	    };
	    UrlMatcher.prototype.format = function (values) {
	        var _this = this;
	        if (values === void 0) { values = {}; }
	        var url = {
	            params: this.parameters(),
	            paramSet: this.params,
	            nPath: this.segments.length - 1
	        };
	        var i, search = false, result = this.segments[0];
	        if (!this.validates(values))
	            return null;
	        function encodeDashes(str) {
	            return encodeURIComponent(str).replace(/-/g, function (c) { return ("%5C%" + c.charCodeAt(0).toString(16).toUpperCase()); });
	        }
	        url.params.map(function (name, i) {
	            var isPathParam = i < url.nPath;
	            var param = url.paramSet[name], value = param.value(values[name]);
	            var isDefaultValue = param.isDefaultValue(value);
	            var squash = isDefaultValue ? param.squash : false;
	            var encoded = param.type.encode(value);
	            if (!isPathParam) {
	                if (encoded == null || (isDefaultValue && squash !== false))
	                    return;
	                if (!common_1.isArray(encoded))
	                    encoded = [encoded];
	                encoded = common_1.map(encoded, encodeURIComponent).join("&" + name + "=");
	                result += (search ? '&' : '?') + (name + "=" + encoded);
	                search = true;
	                return;
	            }
	            result += (function (segment, result) {
	                if (squash === true)
	                    return segment.match(result.match(/\/$/) ? /\/?(.*)/ : /(.*)/)[1];
	                if (common_1.isString(squash))
	                    return squash + segment;
	                if (squash !== false)
	                    return "";
	                if (encoded == null)
	                    return segment;
	                if (common_1.isArray(encoded))
	                    return common_1.map(encoded, encodeDashes).join("-") + segment;
	                if (param.type.raw)
	                    return encoded + segment;
	                return encodeURIComponent(encoded) + segment;
	            })(_this.segments[i + 1], result);
	        });
	        if (values["#"])
	            result += "#" + values["#"];
	        return result;
	    };
	    return UrlMatcher;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UrlMatcher;
	//# sourceMappingURL=urlMatcher.js.map

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var common_1 = __webpack_require__(4);
	var urlMatcherConfig_1 = __webpack_require__(26);
	var urlMatcher_1 = __webpack_require__(46);
	var param_1 = __webpack_require__(25);
	var paramSet_1 = __webpack_require__(29);
	var paramTypes_1 = __webpack_require__(27);
	function $UrlMatcherFactory() {
	    var _this = this;
	    function getDefaultConfig() {
	        return {
	            strict: urlMatcherConfig_1.default.strictMode(),
	            caseInsensitive: urlMatcherConfig_1.default.caseInsensitive()
	        };
	    }
	    this.caseInsensitive = function (value) {
	        return urlMatcherConfig_1.default.caseInsensitive(value);
	    };
	    this.strictMode = function (value) {
	        return urlMatcherConfig_1.default.strictMode(value);
	    };
	    this.defaultSquashPolicy = function (value) {
	        return urlMatcherConfig_1.default.defaultSquashPolicy(value);
	    };
	    this.compile = function (pattern, config) {
	        return new urlMatcher_1.default(pattern, common_1.extend(getDefaultConfig(), config));
	    };
	    this.isMatcher = function (o) {
	        if (!common_1.isObject(o))
	            return false;
	        var result = true;
	        common_1.forEach(urlMatcher_1.default.prototype, function (val, name) {
	            if (common_1.isFunction(val)) {
	                result = result && (common_1.isDefined(o[name]) && common_1.isFunction(o[name]));
	            }
	        });
	        return result;
	    };
	    this.type = function (name, definition, definitionFn) {
	        var type = paramTypes_1.default.type(name, definition, definitionFn);
	        return !common_1.isDefined(definition) ? type : this;
	    };
	    this.$get = function () {
	        paramTypes_1.default.enqueue = false;
	        paramTypes_1.default._flushTypeQueue();
	        return _this;
	    };
	    this.UrlMatcher = urlMatcher_1.default;
	    this.Param = param_1.default;
	    this.ParamSet = paramSet_1.default;
	}
	angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
	angular.module('ui.router.util').run(['$urlMatcherFactory', function ($urlMatcherFactory) { }]);
	//# sourceMappingURL=urlMatcherFactory.js.map

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	$UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];
	function $UrlRouterProvider($locationProvider, $urlMatcherFactory) {
	    var rules = [], otherwise = null, interceptDeferred = false, listener;
	    function regExpPrefix(re) {
	        var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
	        return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
	    }
	    function interpolate(pattern, match) {
	        return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
	            return match[what === '$' ? 0 : Number(what)];
	        });
	    }
	    this.rule = function (rule) {
	        if (!common_1.isFunction(rule))
	            throw new Error("'rule' must be a function");
	        rules.push(rule);
	        return this;
	    };
	    this.otherwise = function (rule) {
	        if (common_1.isString(rule)) {
	            var redirect = rule;
	            rule = function () { return redirect; };
	        }
	        else if (!common_1.isFunction(rule))
	            throw new Error("'rule' must be a function");
	        otherwise = rule;
	        return this;
	    };
	    function handleIfMatch($injector, handler, match) {
	        if (!match)
	            return false;
	        var result = $injector.invoke(handler, handler, { $match: match });
	        return common_1.isDefined(result) ? result : true;
	    }
	    this.when = function (what, handler) {
	        var redirect, handlerIsString = common_1.isString(handler);
	        if (common_1.isString(what))
	            what = $urlMatcherFactory.compile(what);
	        if (!handlerIsString && !common_1.isFunction(handler) && !common_1.isArray(handler))
	            throw new Error("invalid 'handler' in when()");
	        var strategies = {
	            matcher: function (what, handler) {
	                if (handlerIsString) {
	                    redirect = $urlMatcherFactory.compile(handler);
	                    handler = ['$match', function ($match) { return redirect.format($match); }];
	                }
	                return common_1.extend(function ($injector, $location) {
	                    return handleIfMatch($injector, handler, what.exec($location.path(), $location.search(), $location.hash()));
	                }, {
	                    prefix: common_1.isString(what.prefix) ? what.prefix : ''
	                });
	            },
	            regex: function (what, handler) {
	                if (what.global || what.sticky)
	                    throw new Error("when() RegExp must not be global or sticky");
	                if (handlerIsString) {
	                    redirect = handler;
	                    handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
	                }
	                return common_1.extend(function ($injector, $location) {
	                    return handleIfMatch($injector, handler, what.exec($location.path()));
	                }, {
	                    prefix: regExpPrefix(what)
	                });
	            }
	        };
	        var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };
	        for (var n in check) {
	            if (check[n])
	                return this.rule(strategies[n](what, handler));
	        }
	        throw new Error("invalid 'what' in when()");
	    };
	    this.deferIntercept = function (defer) {
	        if (defer === undefined)
	            defer = true;
	        interceptDeferred = defer;
	    };
	    this.$get = $get;
	    $get.$inject = ['$location', '$rootScope', '$injector', '$browser', '$sniffer'];
	    function $get($location, $rootScope, $injector, $browser, $sniffer) {
	        var location = $location.url();
	        function appendBasePath(url, isHtml5, absolute) {
	            var baseHref = $browser.baseHref();
	            if (baseHref === '/')
	                return url;
	            if (isHtml5)
	                return baseHref.slice(0, -1) + url;
	            if (absolute)
	                return baseHref.slice(1) + url;
	            return url;
	        }
	        function update(evt) {
	            if (evt && evt.defaultPrevented)
	                return;
	            function check(rule) {
	                var handled = rule($injector, $location);
	                if (!handled)
	                    return false;
	                if (common_1.isString(handled))
	                    $location.replace().url(handled);
	                return true;
	            }
	            var n = rules.length, i;
	            for (i = 0; i < n; i++) {
	                if (check(rules[i]))
	                    return;
	            }
	            if (otherwise)
	                check(otherwise);
	        }
	        function listen() {
	            listener = listener || $rootScope.$on('$locationChangeSuccess', update);
	            return listener;
	        }
	        if (!interceptDeferred)
	            listen();
	        return {
	            sync: function () {
	                update();
	            },
	            listen: function () {
	                return listen();
	            },
	            update: function (read) {
	                if (read) {
	                    location = $location.url();
	                    return;
	                }
	                if ($location.url() === location)
	                    return;
	                $location.url(location);
	                $location.replace();
	            },
	            push: function (urlMatcher, params, options) {
	                $location.url(urlMatcher.format(params || {}));
	                if (options && options.replace)
	                    $location.replace();
	            },
	            href: function (urlMatcher, params, options) {
	                if (!urlMatcher.validates(params))
	                    return null;
	                var isHtml5 = $locationProvider.html5Mode();
	                if (common_1.isObject(isHtml5)) {
	                    isHtml5 = isHtml5.enabled;
	                }
	                isHtml5 = isHtml5 && $sniffer.history;
	                var url = urlMatcher.format(params);
	                options = options || {};
	                if (!isHtml5 && url !== null) {
	                    url = "#" + $locationProvider.hashPrefix() + url;
	                }
	                url = appendBasePath(url, isHtml5, options.absolute);
	                if (!options.absolute || !url) {
	                    return url;
	                }
	                var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();
	                port = (port === 80 || port === 443 ? '' : ':' + port);
	                return [$location.protocol(), '://', $location.host(), port, slash, url].join('');
	            }
	        };
	    }
	}
	angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);
	//# sourceMappingURL=urlRouter.js.map

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var templateFactory = __webpack_require__(50);
	exports.templateFactory = templateFactory;
	var view = __webpack_require__(22);
	exports.view = view;
	var viewDirective = __webpack_require__(51);
	exports.viewDirective = viewDirective;
	var viewScroll = __webpack_require__(52);
	exports.viewScroll = viewScroll;
	//# sourceMappingURL=module.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	$TemplateFactory.$inject = ['$http', '$templateCache'];
	function $TemplateFactory($http, $templateCache) {
	    this.fromConfig = function (config, params, injectFn) {
	        return (common_1.isDefined(config.template) ? this.fromString(config.template, params) :
	            common_1.isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
	                common_1.isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, injectFn) :
	                    null);
	    };
	    this.fromString = function (template, params) {
	        return common_1.isFunction(template) ? template(params) : template;
	    };
	    this.fromUrl = function (url, params) {
	        if (common_1.isFunction(url))
	            url = url(params);
	        if (url == null)
	            return null;
	        return $http.get(url, { cache: $templateCache, headers: { Accept: 'text/html' } }).then(common_1.prop("data"));
	    };
	    this.fromProvider = function (provider, params, injectFn) {
	        return injectFn(provider);
	    };
	}
	angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);
	//# sourceMappingURL=templateFactory.js.map

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='../../typings/angularjs/angular.d.ts' />
	var common_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(6);
	$ViewDirective.$inject = ['$view', '$animate', '$uiViewScroll', '$interpolate', '$q'];
	function $ViewDirective($view, $animate, $uiViewScroll, $interpolate, $q) {
	    function getRenderer(attrs, scope) {
	        return {
	            enter: function (element, target, cb) {
	                if (angular.version.minor > 2) {
	                    $animate.enter(element, null, target).then(cb);
	                }
	                else {
	                    $animate.enter(element, null, target, cb);
	                }
	            },
	            leave: function (element, cb) {
	                if (angular.version.minor > 2) {
	                    $animate.leave(element).then(cb);
	                }
	                else {
	                    $animate.leave(element, cb);
	                }
	            }
	        };
	    }
	    function configsEqual(config1, config2) {
	        return config1 === config2;
	    }
	    var rootData = {
	        context: $view.rootContext()
	    };
	    var directive = {
	        count: 0,
	        restrict: 'ECA',
	        terminal: true,
	        priority: 400,
	        transclude: 'element',
	        compile: function (tElement, tAttrs, $transclude) {
	            return function (scope, $element, attrs) {
	                var previousEl, currentEl, currentScope, unregister, onloadExp = attrs.onload || '', autoScrollExp = attrs.autoscroll, renderer = getRenderer(attrs, scope), viewConfig = undefined, inherited = $element.inheritedData('$uiView') || rootData, name = $interpolate(attrs.uiView || attrs.name || '')(scope) || '$default';
	                var viewData = {
	                    id: directive.count++,
	                    name: name,
	                    fqn: inherited.name ? inherited.fqn + "." + name : name,
	                    config: null,
	                    configUpdated: configUpdatedCallback,
	                    get creationContext() { return inherited.context; }
	                };
	                trace_1.default.traceUiViewEvent("Linking", viewData);
	                function configUpdatedCallback(config) {
	                    if (configsEqual(viewConfig, config))
	                        return;
	                    trace_1.default.traceUiViewConfigUpdated(viewData, config && config.context);
	                    viewConfig = config;
	                    updateView(config);
	                }
	                $element.data('$uiView', viewData);
	                updateView();
	                unregister = $view.registerUiView(viewData);
	                scope.$on("$destroy", function () {
	                    trace_1.default.traceUiViewEvent("Destroying/Unregistering", viewData);
	                    unregister();
	                });
	                function cleanupLastView() {
	                    if (previousEl) {
	                        trace_1.default.traceUiViewEvent("Removing    (previous) el", viewData);
	                        previousEl.remove();
	                        previousEl = null;
	                    }
	                    if (currentScope) {
	                        trace_1.default.traceUiViewEvent("Destroying  (previous) scope", viewData);
	                        currentScope.$destroy();
	                        currentScope = null;
	                    }
	                    if (currentEl) {
	                        trace_1.default.traceUiViewEvent("Animate out (previous)", viewData);
	                        renderer.leave(currentEl, function () {
	                            previousEl = null;
	                        });
	                        previousEl = currentEl;
	                        currentEl = null;
	                    }
	                }
	                function updateView(config) {
	                    config = config || {};
	                    var newScope = scope.$new();
	                    trace_1.default.traceUiViewScopeCreated(viewData, newScope);
	                    common_1.extend(viewData, {
	                        context: config.context,
	                        $template: config.template,
	                        $controller: config.controller,
	                        $controllerAs: config.controllerAs,
	                        $locals: config.locals
	                    });
	                    var cloned = $transclude(newScope, function (clone) {
	                        renderer.enter(clone.data('$uiView', viewData), $element, function onUiViewEnter() {
	                            if (currentScope) {
	                                currentScope.$emit('$viewContentAnimationEnded');
	                            }
	                            if (common_1.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
	                                $uiViewScroll(clone);
	                            }
	                        });
	                        cleanupLastView();
	                    });
	                    currentEl = cloned;
	                    currentScope = newScope;
	                    currentScope.$emit('$viewContentLoaded', config || viewConfig);
	                    currentScope.$eval(onloadExp);
	                }
	            };
	        }
	    };
	    return directive;
	}
	$ViewDirectiveFill.$inject = ['$compile', '$controller', '$interpolate', '$injector', '$q'];
	function $ViewDirectiveFill($compile, $controller, $interpolate, $injector, $q) {
	    return {
	        restrict: 'ECA',
	        priority: -400,
	        compile: function (tElement) {
	            var initial = tElement.html();
	            return function (scope, $element) {
	                var data = $element.data('$uiView');
	                if (!data)
	                    return;
	                $element.html(data.$template || initial);
	                trace_1.default.traceUiViewFill(data, $element.html());
	                var link = $compile($element.contents());
	                var controller = data.$controller;
	                var controllerAs = data.$controllerAs;
	                if (controller) {
	                    var locals = data.$locals;
	                    var controllerInstance = $controller(controller, common_1.extend(locals, { $scope: scope }));
	                    if (controllerAs)
	                        scope[controllerAs] = controllerInstance;
	                    $element.data('$ngControllerController', controllerInstance);
	                    $element.children().data('$ngControllerController', controllerInstance);
	                }
	                link(scope);
	            };
	        }
	    };
	}
	angular.module('ui.router.state').directive('uiView', $ViewDirective);
	angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);
	//# sourceMappingURL=viewDirective.js.map

/***/ },
/* 52 */
/***/ function(module, exports) {

	function $ViewScrollProvider() {
	    var useAnchorScroll = false;
	    this.useAnchorScroll = function () {
	        useAnchorScroll = true;
	    };
	    this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
	            if (useAnchorScroll) {
	                return $anchorScroll;
	            }
	            return function ($element) {
	                return $timeout(function () {
	                    $element[0].scrollIntoView();
	                }, 0, false);
	            };
	        }];
	}
	angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);
	//# sourceMappingURL=viewScroll.js.map

/***/ }
/******/ ])
});
;