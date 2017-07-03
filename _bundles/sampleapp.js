webpackJsonp([0],Array(32).concat([
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTACTS_MODULE = undefined;

var _contactDetail = __webpack_require__(94);

var _contactList = __webpack_require__(95);

var _contacts = __webpack_require__(97);

var _contactView = __webpack_require__(96);

var _editContact = __webpack_require__(99);

var _contacts2 = __webpack_require__(98);

var CONTACTS_MODULE = exports.CONTACTS_MODULE = angular.module('contacts', []);

CONTACTS_MODULE.component('contactView', _contactView.contactView);
CONTACTS_MODULE.component('contacts', _contacts.contacts);
CONTACTS_MODULE.component('editContact', _editContact.editContact);
CONTACTS_MODULE.component('contactDetail', _contactDetail.contactDetail);
CONTACTS_MODULE.component('contactList', _contactList.contactList);

CONTACTS_MODULE.config(['$stateRegistryProvider', function ($stateRegistry) {
  $stateRegistry.register(_contacts2.contactsState);
  $stateRegistry.register(_contacts2.newContactState);
  $stateRegistry.register(_contacts2.viewContactState);
  $stateRegistry.register(_contacts2.editContactState);
}]);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GLOBAL_MODULE = undefined;

var _appConfig = __webpack_require__(100);

var _auth = __webpack_require__(101);

var _dataSources = __webpack_require__(102);

var _dialog = __webpack_require__(103);

var _dialog2 = __webpack_require__(63);

var _loadingIndicator = __webpack_require__(105);

var _requiresAuth = __webpack_require__(106);

var _loadingIndicator2 = __webpack_require__(104);

var GLOBAL_MODULE = exports.GLOBAL_MODULE = angular.module('global', []);

GLOBAL_MODULE.directive('dialog', _dialog.dialog);

GLOBAL_MODULE.service('AppConfig', _appConfig.AppConfig);
GLOBAL_MODULE.service('AuthService', _auth.AuthService);
GLOBAL_MODULE.service('Contacts', _dataSources.Contacts);
GLOBAL_MODULE.service('Folders', _dataSources.Folders);
GLOBAL_MODULE.service('Messages', _dataSources.Messages);
GLOBAL_MODULE.service('DialogService', _dialog2.DialogService);
GLOBAL_MODULE.service('LoadingIndicatorService', _loadingIndicator.LoadingIndicatorService);

GLOBAL_MODULE.run(_requiresAuth.authHookRunBlock);
GLOBAL_MODULE.run(_loadingIndicator2.loadingIndicatorHookRunBlock);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAIN_MODULE = undefined;

var _app = __webpack_require__(64);

var _welcome = __webpack_require__(67);

var _login = __webpack_require__(66);

var _home = __webpack_require__(65);

var _app2 = __webpack_require__(107);

var MAIN_MODULE = exports.MAIN_MODULE = angular.module('main', []);

MAIN_MODULE.config(['$uiRouterProvider', function ($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  // This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
  // Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
  $uiRouter.trace.enable(1);

  // If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
  var $urlService = $uiRouter.urlService;
  $urlService.rules.otherwise({ state: 'welcome' });

  var $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(_app2.appState);
  $stateRegistry.register(_app2.homeState);
  $stateRegistry.register(_app2.loginState);
  $stateRegistry.register(_app2.welcomeState);

  $stateRegistry.register(_app2.contactsFutureState);
  $stateRegistry.register(_app2.prefsFutureState);
  $stateRegistry.register(_app2.mymessagesFutureState);
}]);

MAIN_MODULE.component('app', _app.app);
MAIN_MODULE.component('welcome', _welcome.welcome);
MAIN_MODULE.component('login', _login.login);
MAIN_MODULE.component('home', _home.home);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MYMESSAGES_MODULE = undefined;

var _compose = __webpack_require__(108);

var _folderList = __webpack_require__(109);

var _message = __webpack_require__(113);

var _messageList = __webpack_require__(114);

var _mymessages = __webpack_require__(115);

var _messageTable = __webpack_require__(110);

var _sortMessages = __webpack_require__(111);

var _messageBody = __webpack_require__(112);

var _messagesListUI = __webpack_require__(117);

var _mymessages2 = __webpack_require__(116);

var MYMESSAGES_MODULE = exports.MYMESSAGES_MODULE = angular.module('mymessages', []);

MYMESSAGES_MODULE.directive('sortMessages', _sortMessages.sortMessages);

MYMESSAGES_MODULE.component('compose', _compose.compose);
MYMESSAGES_MODULE.component('folderList', _folderList.folderList);
MYMESSAGES_MODULE.component('message', _message.message);
MYMESSAGES_MODULE.component('messageList', _messageList.messageList);
MYMESSAGES_MODULE.component('mymessages', _mymessages.mymessages);
MYMESSAGES_MODULE.component('messageTable', _messageTable.messageTable);

MYMESSAGES_MODULE.filter('messageBody', _messageBody.messageBody);

MYMESSAGES_MODULE.service('MessageListUI', _messagesListUI.MessageListUI);

MYMESSAGES_MODULE.config(['$stateRegistryProvider', function ($stateRegistry) {
  $stateRegistry.register(_mymessages2.composeState);
  $stateRegistry.register(_mymessages2.messageState);
  $stateRegistry.register(_mymessages2.messageListState);
  $stateRegistry.register(_mymessages2.mymessagesState);
}]);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PREFS_MODULE = undefined;

var _prefs = __webpack_require__(118);

var _prefs2 = __webpack_require__(119);

var PREFS_MODULE = exports.PREFS_MODULE = angular.module('prefs', []);

PREFS_MODULE.component('prefs', _prefs.prefs);

PREFS_MODULE.config(['$stateRegistryProvider', function ($stateRegistry) {
  $stateRegistry.register(_prefs2.prefsState);
}]);

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogService = undefined;

var _angular = __webpack_require__(10);

var angular = _interopRequireWildcard(_angular);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DialogService = exports.DialogService = function DialogService($document, $compile, $rootScope) {
  _classCallCheck(this, DialogService);

  var body = $document.find("body");
  var elem = angular.element("<div class='dialog' dialog='opts'></div>");

  this.confirm = function (message) {
    var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Are you sure?";
    var yesMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Yes";
    var noMsg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "No";

    $compile(elem)(angular.extend($rootScope.$new(), { message: message, details: details, yesMsg: yesMsg, noMsg: noMsg }));
    body.append(elem);
    return elem.data("promise").finally(function () {
      return elem.removeClass('active').remove();
    });
  };
};

DialogService.$inject = ['$document', '$compile', '$rootScope'];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The controller for the `app` component.
 */
var AuthedController = function () {
  function AuthedController(AppConfig, AuthService, $state, $transitions, LoadingIndicatorService) {
    _classCallCheck(this, AuthedController);

    this.AuthService = AuthService;
    this.$state = $state;

    this.emailAddress = AppConfig.emailAddress;
    this.isAuthenticated = AuthService.isAuthenticated();
  }

  AuthedController.prototype.logout = function logout() {
    var AuthService = this.AuthService,
        $state = this.$state;

    AuthService.logout();
    // Reload states after authentication change
    return $state.go('welcome', {}, { reload: true });
  };

  AuthedController.prototype.isActive = function isActive(glob) {
    return this.$state.includes(glob);
  };

  return AuthedController;
}();

AuthedController.$inject = ['AppConfig', 'AuthService', '$state', '$transitions', 'LoadingIndicatorService'];

/**
 * This is the main app component for an authenticated user.
 * 
 * This component renders the outermost chrome (application header and tabs, the compose  and logout button)
 * It has a `ui-view` viewport for nested states to fill in.
 */
var app = exports.app = {
  controller: AuthedController,
  template: '\n    <div class="navheader">\n      <ul ng-if="::$ctrl.isAuthenticated" class="nav nav-tabs">\n    \n        <li ui-sref-active="active"> <a ui-sref="mymessages" role="button"> Messages </a> </li>\n        <li ui-sref-active="active"> <a ui-sref="contacts" role="button"> Contacts </a> </li>\n        <li ui-sref-active="active"> <a ui-sref="prefs" role="button"> Preferences </a> </li>\n    \n        <li class="navbar-right">\n          <button class="btn btn-primary fa fa-home" ui-sref="home"></button>\n          <button style="margin-right: 15px;" class="btn btn-primary" ui-sref="mymessages.compose"><i class="fa fa-envelope"></i> New Message</button>\n        </li>\n    \n        <li class="navbar-text navbar-right logged-in-user" style="margin: 0.5em 1.5em;">\n          <div>\n            {{::$ctrl.emailAddress}} <i class="fa fa-chevron-down"></i>\n            <div class="hoverdrop">\n              <button class="btn btn-primary" ng-click="$ctrl.logout()">Log Out</button>\n            </div>\n          </div>\n        </li>\n    \n      </ul>\n    </div>\n    \n    <div ui-view></div>\n    <div ui-view="mymessages" ng-show="$ctrl.isActive(\'mymessages.**\')"></div>\n    <div ui-view="contacts" ng-show="$ctrl.isActive(\'contacts.**\')"></div>\n'
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// This is a home component for authenticated users.
// It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
var home = exports.home = {
  template: "\n    <div class=\"home buttons\">\n      <button ui-sref=\"mymessages\" class=\"btn btn-primary\">\n        <h1><i class=\"fa fa-envelope\"></i></h1>\n        <h1>Messages</h1>\n      </button>\n\n      <button ui-sref=\"contacts\" class=\"btn btn-primary\">\n      <h1><i class=\"fa fa-users\"></i></h1>\n      <h1>Contacts</h1>\n      </button>\n\n      <button ui-sref=\"prefs\" class=\"btn btn-primary\">\n        <h1><i class=\"fa fa-cogs\"></i></h1>\n        <h1>Preferences</h1>\n      </button>\n    </div>\n" };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The controller for the `login` component
 *
 * The `login` method validates the credentials.
 * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
 */
var LoginController = function LoginController(AppConfig, AuthService, $state) {
  var _this = this;

  _classCallCheck(this, LoginController);

  this.usernames = AuthService.usernames;

  this.credentials = {
    username: AppConfig.emailAddress,
    password: 'password'
  };

  this.login = function (credentials) {
    _this.authenticating = true;

    var returnToOriginalState = function returnToOriginalState() {
      var state = _this.returnTo.state();
      var params = _this.returnTo.params();
      var options = _extends({}, _this.returnTo.options(), { reload: true });
      $state.go(state, params, options);
    };

    var showError = function showError(errorMessage) {
      return _this.errorMessage = errorMessage;
    };

    AuthService.authenticate(credentials.username, credentials.password).then(returnToOriginalState).catch(showError).finally(function () {
      return _this.authenticating = false;
    });
  };
};

LoginController.$inject = ['AppConfig', 'AuthService', '$state'];

/**
 * This component renders a faux authentication UI
 *
 * It prompts for the username/password (and gives hints with bouncy arrows)
 * It shows errors if the authentication failed for any reason.
 */
var login = exports.login = {
  bindings: { returnTo: '<' },

  controller: LoginController,

  template: '\n    <div class="container">\n      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">\n        <h3>Log In</h3>\n        <p>(This login screen is for demonstration only... just pick a username, enter \'password\' and click <b>"Log in"</b>)</p>\n        <hr>\n    \n        <div>\n          <label for="username">Username:</label>\n          <select class="form-control" name="username" id="username"\n            ng-model="$ctrl.credentials.username" ng-options="username for username in $ctrl.usernames"></select>\n          <i style="position: relative; bottom: 1.8em; margin-left: 10em; height: 0"\n              ng-hide="$ctrl.credentials.username" class="fa fa-arrow-left bounce-horizontal"> Choose </i>\n        </div>\n        <br>\n    \n        <div>\n          <label for="password">Password:</label>\n          <input class="form-control" type="password" name="password" ng-model="$ctrl.credentials.password">\n          <i style="position: relative; bottom: 1.8em; margin-left: 5em; height: 0"\n              ng-hide="!$ctrl.credentials.username || $ctrl.credentials.password == \'password\'" class="fa fa-arrow-left bounce-horizontal">\n            Enter \'<b>password</b>\' here\n          </i>\n        </div>\n    \n        <div ng-show="$ctrl.errorMessage" class="well error">{{ $ctrl.errorMessage }}</div>\n    \n        <hr>\n        <div>\n          <button class="btn btn-primary" type="button"\n              ng-disabled="$ctrl.authenticating" ng-click="$ctrl.login($ctrl.credentials)">\n            <i class="fa fa-spin fa-spinner" ng-show="$ctrl.authenticating"></i> <span>Log in</span>\n          </button>\n          <i ng-show="$ctrl.credentials.username && $ctrl.credentials.password == \'password\'" style="position: relative;" class="fa fa-arrow-left bounce-horizontal"> Click Me!</i>\n      </div>\n    </div>\n    '
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var welcome = exports.welcome = {
  template: "\n    <div class=\"container-fluid\">\n    \n      <h3>UI-Router Sample App</h3>\n    \n      <p>Welcome to the sample app!</p>\n      <p>This is a demonstration app intended to highlight some patterns that can be used within UI-Router.\n        These patterns should help you to to build cohesive, robust apps.  Additionally, this app uses state-vis\n        to show the tree of states, and a transition log visualizer.</p>\n    \n      <h4>App Overview</h4>\n      <p>\n        First, start exploring the application's functionality at a high level by activating\n        one of the three submodules: Messages, Contacts, or Preferences. If you are not already logged in,\n        you will be taken to an authentication screen (the authentication is fake; the password is \"password\")\n        <div>\n          <button class=\"btn btn-primary\" ui-sref=\"mymessages\"><i class=\"fa fa-envelope\"></i><span>Messages</span></button>\n          <button class=\"btn btn-primary\" ui-sref=\"contacts\"><i class=\"fa fa-users\"></i><span>Contacts</span></button>\n          <button class=\"btn btn-primary\" ui-sref=\"prefs\"><i class=\"fa fa-cogs\"></i><span>Preferences</span></button>\n        </div>\n      </p>\n    \n      <h4>Patterns and Recipes</h4>\n      <ul>\n        <li>Require Authentication</li>\n        <li>Previous State</li>\n        <li>Redirect Hook</li>\n        <li>Default Param Values</li>\n      </ul>\n    </div>"
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Some utility functions used by the application */

var setProp = exports.setProp = function setProp(obj, key, val) {
  obj[key] = val;return obj;
};
var pushToArr = exports.pushToArr = function pushToArr(array, item) {
  array.push(item);return array;
};
var uniqReduce = exports.uniqReduce = function uniqReduce(arr, item) {
  return arr.indexOf(item) !== -1 ? arr : pushToArr(arr, item);
};
var flattenReduce = exports.flattenReduce = function flattenReduce(arr, item) {
  return arr.concat(item);
};
var guidChar = function guidChar(c) {
  return c !== 'x' && c !== 'y' ? '-' : Math.floor(Math.random() * 16).toString(16).toUpperCase();
};
var guid = exports.guid = function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("").map(guidChar).join("");
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ngmodule = __webpack_require__(93);

/** Google analytics */

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-73329341-1', 'auto');
ga('send', 'pageview');

_ngmodule.ngmodule.config(['$transitionsProvider', function ($transitionsProvider) {
  $transitionsProvider.onBefore({}, function ($transition$) {
    var path = $transition$.treeChanges().to.map(function (node) {
      return node.state.self.url;
    }).filter(function (x) {
      return x != null && x !== '^';
    }).join('');

    var vpv = function vpv(path) {
      return ga('send', 'pageview', path);
    };

    var success = function success() {
      vpv(path);
    };
    var error = function error(err) {
      var errType = err && err.hasOwnProperty("type") ? err.type : '_';
      path = path.replace(/^\//, "");
      vpv('/errors/' + errType + '/' + path);
    };

    $transition$.promise.then(success, error);
  });
}]);

/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(33);

__webpack_require__(34);

__webpack_require__(32);

__webpack_require__(35);

__webpack_require__(36);

__webpack_require__(69);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ngmodule = undefined;

var _angular = __webpack_require__(10);

var angular = _interopRequireWildcard(_angular);

var _angularjs = __webpack_require__(28);

var _angularjs2 = _interopRequireDefault(_angularjs);

var _stickyStates = __webpack_require__(30);

var _dsr = __webpack_require__(29);

var _visualizer = __webpack_require__(31);

var _oclazyload = __webpack_require__(37);

var _oclazyload2 = _interopRequireDefault(_oclazyload);

var _main = __webpack_require__(34);

var _global = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Create the angular module "demo".
//
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// In bootstrap.js, the module is imported, and the components, services, and states are registered.
/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */
// External dependencies
var ngmodule = exports.ngmodule = angular.module("demo", [_angularjs2.default, _oclazyload2.default, _main.MAIN_MODULE.name, _global.GLOBAL_MODULE.name]

// These modules are lazy loaded via future states in app.states.js
// CONTACTS_MODULE.name
// MYMESSAGES_MODULE.name
// PREFS_MODULE.name
);

ngmodule.config(['$uiRouterProvider', function ($uiRouter) {
  $uiRouter.plugin(_stickyStates.StickyStatesPlugin);
  $uiRouter.plugin(_dsr.DSRPlugin);
  // Show the UI-Router Visualizer
  (0, _visualizer.visualizer)($uiRouter);
}]);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This component renders a read only view of the details for a single contact. 
 */
var contactDetail = exports.contactDetail = {
  bindings: { contact: '<' },

  template: '\n    <div class="flex-h">\n      <div class="details">\n        <h3>{{$ctrl.contact.name.first}} {{$ctrl.contact.name.last}}</h3>\n        <div><label>Company</label><div>{{$ctrl.contact.company}}</div></div>\n        <div><label>Age</label><div>{{$ctrl.contact.age}}</div></div>\n        <div><label>Phone</label><div>{{$ctrl.contact.phone}}</div></div>\n        <div><label>Email</label><div>{{$ctrl.contact.email}}</div></div>\n        <div class="flex-h">\n          <label>Address</label>\n          <div>{{$ctrl.contact.address.street}}<br>\n                {{$ctrl.contact.address.city}}, {{$ctrl.contact.address.state}} {{$ctrl.contact.address.zip}}\n          </div>\n        </div>\n      </div>\n  \n      <div class="flex nogrow">\n        <img ng-src="{{$ctrl.contact.picture}}"/>\n      </div>\n    </div>\n'
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This component renders a list of contacts.
 * 
 * At the top is a "new contact" button.
 * Each list item is a clickable link to the `contacts.contact` details substate
 */
var contactList = exports.contactList = {
  bindings: { contacts: '<' },

  template: '\n    <ul class="selectlist list-unstyled flex nogrow">\n      <li>\n        <!-- This link is a relative ui-sref to the contacts.new state. -->\n        <a ui-sref=".new">\n          <button class="btn btn-primary">\n            <i class="fa fa-pencil"></i><span>New Contact</span>\n          </button>\n        </a>\n      </li>\n  \n      <li>&nbsp;</li>\n  \n      <!-- Highlight the selected contact:\n          When the current state matches the ui-sref\'s state (and its parameters)\n          ui-sref-active applies the \'selected\' class to the li element -->\n      <li ng-repeat="contact in $ctrl.contacts" ui-sref-active="selected">\n        <a ui-sref=".contact({contactId: contact._id})">\n          {{contact.name.first}} {{contact.name.last}}\n        </a>\n      </li>\n    </ul>\n'
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This component renders details for a single contact
 * 
 * A button messages the contact by linking to `mymessages.compose` state passing the email as a state parameter.
 * Another button edits the contact by linking to `contacts.contact.edit` state.
 */

var contactView = exports.contactView = {
  bindings: { contact: '<' },

  template: '\n    <div class="contact">\n    \n      <contact-detail contact="$ctrl.contact"></contact-detail>\n      \n      <!-- This button has an ui-sref to the mymessages.compose state. The ui-sref provides the mymessages.compose\n           state with an non-url parameter, which is used as the initial message model -->\n      <button class="btn btn-primary" ui-sref="mymessages.compose({ message: { to: $ctrl.contact.email } })">\n        <i class="fa fa-envelope"></i><span>Message</span>\n      </button>\n    \n      <!-- This button has a relative ui-sref to the contacts.contact.edit state. -->\n      <button class="btn btn-primary" ui-sref=".edit">\n        <i class="fa fa-pencil"></i><span>Edit Contact</span>\n      </button>\n      \n    </div>\n' };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This component renders the contacts submodule.
 * 
 * On the left is the list of contacts.
 * On the right is the ui-view viewport where contact details appear.
 */
var contacts = exports.contacts = {
  bindings: { contacts: '<' },

  template: '\n    <div class="my-contacts flex-h">\n    \n      <contact-list contacts="$ctrl.contacts" class="flex nogrow"></contact-list>\n    \n      <div ui-view>\n        <!-- This default content is displayed when the ui-view is not filled in by a child state -->\n        <h4 style="margin: 1em 2em;">Select a contact</h4>\n      </div>\n      \n    </div>'
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newContactState = exports.editContactState = exports.viewContactState = exports.contactsState = undefined;

__webpack_require__(63);

/**
 * This state displays the contact list.
 * It also provides a nested ui-view (viewport) for child states to fill in.
 *
 * The contacts are fetched using a resolve.
 */
var contactsState = exports.contactsState = {
  parent: 'app', // declares that 'contacts' is a child of 'app'
  name: "contacts",
  url: "/contacts",
  resolve: {
    // Resolve all the contacts.  The resolved contacts are injected into the controller.
    contacts: ['Contacts', function (Contacts) {
      return Contacts.all();
    }]
  },
  data: { requiresAuth: true },
  deepStateRedirect: true,
  sticky: true,
  views: {
    contacts: 'contacts'
  }
};

/**
 * This state displays a single contact.
 * The contact to display is fetched using a resolve, based on the `contactId` parameter.
 */
var viewContactState = exports.viewContactState = {
  name: 'contacts.contact',
  url: '/:contactId',
  resolve: {
    // Resolve the contact, based on the contactId parameter value.
    // The resolved contact is provided to the contactComponent's contact binding
    contact: ['Contacts', '$transition$', function (Contacts, $transition$) {
      return Contacts.get($transition$.params().contactId);
    }]
  },
  component: 'contactView'
};

/**
 * This state allows a user to edit a contact
 *
 * The contact data to edit is injected from the parent state's resolve.
 *
 * This state uses view targeting to replace the parent ui-view (which would normally be filled
 * by 'contacts.contact') with the edit contact template/controller
 */
var editContactState = exports.editContactState = {
  name: 'contacts.contact.edit',
  url: '/edit',
  views: {
    // Relatively target the grand-parent-state's $default (unnamed) ui-view
    // This could also have been written using ui-view@state addressing: $default@contacts
    // Or, this could also have been written using absolute ui-view addressing: !$default.$default.$default
    '^.^.$default': {
      bindings: { pristineContact: "contact" },
      component: 'editContact'
    }
  }
};

/**
 * This state allows a user to create a new contact
 *
 * The contact data to edit is injected into the component from the parent state's resolve.
 */
var newContactState = exports.newContactState = {
  name: 'contacts.new',
  url: '/new',
  component: 'editContact'
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The controller for the editContact component
 *
 * This component is used by both `contacts.contact.edit` and `contacts.new` states.
 *
 * The component makes a copy of the contqct data for editing.
 * The new copy and original (pristine) copy are used to determine if the contact is "dirty" or not.
 * If the user navigates to some other state while the contact is "dirty", the `uiCanExit` component
 * hook asks the user to confirm navigation away, losing any edits.
 *
 * The Delete Contact button is wired to the `remove` method, which:
 * - asks for confirmation from the user
 * - deletes the resource from REST API
 * - navigates back to the contacts grandparent state using relative addressing `^.^`
 *   the `reload: true` option re-fetches the contacts list from the server
 *
 * The Save Contact button is wired to the `save` method which:
 * - saves the REST resource (PUT or POST, depending)
 * - navigates back to the parent state using relative addressing `^`.
 *   when editing an existing contact, this returns to the `contacts.contact` "view contact" state
 *   when creating a new contact, this returns to the `contacts` list.
 *   the `reload: true` option re-fetches the contacts resolve data from the server
 */
var EditContactController = function () {
  function EditContactController($state, DialogService, Contacts) {
    _classCallCheck(this, EditContactController);

    this.$state = $state;
    this.DialogService = DialogService;
    this.Contacts = Contacts;
  }

  EditContactController.prototype.$onInit = function $onInit() {
    // Make an editable copy of the pristineContact
    this.contact = angular.copy(this.pristineContact);
  };

  EditContactController.prototype.uiCanExit = function uiCanExit() {
    if (this.canExit || angular.equals(this.contact, this.pristineContact)) {
      return true;
    }

    var message = 'You have unsaved changes to this contact.';
    var question = 'Navigate away and lose changes?';
    return this.DialogService.confirm(message, question);
  };

  /** Ask for confirmation, then delete the contact, then go to the grandparent state ('contacts') */


  EditContactController.prototype.remove = function remove(contact) {
    var _this = this;

    this.DialogService.confirm('Delete contact: ' + contact.name.first + ' ' + contact.name.last).then(function () {
      return _this.Contacts.remove(contact);
    }).then(function () {
      return _this.canExit = true;
    }).then(function () {
      return _this.$state.go("^.^", null, { reload: true });
    });
  };

  /** Save the contact, then go to the grandparent state ('contacts') */


  EditContactController.prototype.save = function save(contact) {
    var _this2 = this;

    this.Contacts.save(contact).then(function () {
      return _this2.canExit = true;
    }).then(function () {
      return _this2.$state.go("^", null, { reload: true });
    });
  };

  return EditContactController;
}();

EditContactController.$inject = ['$state', 'DialogService', 'Contacts'];

/**
 * This component edits a single contact.
 *
 * Editable fields are bound to the contact.
 * A button cancels editing and returns to the contact view by linking to the parent state using `^` relative addressing.
 * Another button saves the contact.
 * A third button deletes the bcontact.
 */
var editContact = exports.editContact = {
  bindings: { pristineContact: '<' },

  controller: EditContactController,

  template: '\n    <div class="contact">\n      <div class="details">\n        <div><label>First</label>   <input type="text" ng-model="$ctrl.contact.name.first"></div>\n        <div><label>Last</label>    <input type="text" ng-model="$ctrl.contact.name.last"></div>\n        <div><label>Company</label> <input type="text" ng-model="$ctrl.contact.company"></div>\n        <div><label>Age</label>     <input type="text" ng-model="$ctrl.contact.age"></div>\n        <div><label>Phone</label>   <input type="text" ng-model="$ctrl.contact.phone"></div>\n        <div><label>Email</label>   <input type="text" ng-model="$ctrl.contact.email"></div>\n        <div><label>Street</label>  <input type="text" ng-model="$ctrl.contact.address.street"></div>\n        <div><label>City</label>    <input type="text" ng-model="$ctrl.contact.address.city"> </div>\n        <div><label>State</label>   <input type="text" ng-model="$ctrl.contact.address.state"></div>\n        <div><label>Zip</label>     <input type="text" ng-model="$ctrl.contact.address.zip"></div>\n        <div><label>Image</label>   <input type="text" ng-model="$ctrl.contact.picture"></div>\n      </div>\n    \n      <hr>\n    \n      <div>\n        <!-- This button\'s ui-sref relatively targets the parent state, i.e., contacts.contact -->\n        <button class="btn btn-primary" ui-sref="^"><i class="fa fa-close"></i><span>Cancel</span></button>\n        <button class="btn btn-primary" ng-click="$ctrl.save($ctrl.contact)"><i class="fa fa-save"></i><span>Save</span></button>\n        <button class="btn btn-primary" ng-click="$ctrl.remove($ctrl.contact)"><i class="fa fa-close"></i><span>Delete</span></button>\n      </div>\n    </div>\n' };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This service stores and retrieves user preferences in session storage
 */
var AppConfig = exports.AppConfig = function () {
  function AppConfig() {
    _classCallCheck(this, AppConfig);

    this.sort = '+date';
    this.emailAddress = undefined;
    this.restDelay = 100;
    this.load();
  }

  AppConfig.prototype.load = function load() {
    try {
      return angular.extend(this, angular.fromJson(sessionStorage.getItem("appConfig")));
    } catch (Error) {}

    return this;
  };

  AppConfig.prototype.save = function save() {
    sessionStorage.setItem("appConfig", angular.toJson(angular.extend({}, this)));
  };

  return AppConfig;
}();

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This service emulates an Authentication Service.
 */
var AuthService = exports.AuthService = function () {
  function AuthService(AppConfig, $q, $timeout) {
    _classCallCheck(this, AuthService);

    this.AppConfig = AppConfig;
    this.$q = $q;
    this.$timeout = $timeout;
    this.usernames = ['myself@angular.dev', 'devgal@angular.dev', 'devguy@angular.dev'];
  }

  /**
   * Returns true if the user is currently authenticated, else false
   */


  AuthService.prototype.isAuthenticated = function isAuthenticated() {
    return !!this.AppConfig.emailAddress;
  };

  /**
   * Fake authentication function that returns a promise that is either resolved or rejected.
   *
   * Given a username and password, checks that the username matches one of the known
   * usernames (this.usernames), and that the password matches 'password'.
   *
   * Delays 800ms to simulate an async REST API delay.
   */


  AuthService.prototype.authenticate = function authenticate(username, password) {
    var _this = this;

    var $timeout = this.$timeout,
        $q = this.$q,
        AppConfig = this.AppConfig;

    // checks if the username is one of the known usernames, and the password is 'password'

    var checkCredentials = function checkCredentials() {
      return $q(function (resolve, reject) {
        var validUsername = _this.usernames.indexOf(username) !== -1;
        var validPassword = password === 'password';

        return validUsername && validPassword ? resolve(username) : reject("Invalid username or password");
      });
    };

    return $timeout(checkCredentials, 800).then(function (authenticatedUser) {
      AppConfig.emailAddress = authenticatedUser;
      AppConfig.save();
    });
  };

  /** Logs the current user out */


  AuthService.prototype.logout = function logout() {
    this.AppConfig.emailAddress = undefined;
    this.AppConfig.save();
  };

  return AuthService;
}();

AuthService.$inject = ['AppConfig', '$q', '$timeout'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = exports.Folders = exports.Contacts = undefined;

var _sessionStorage = __webpack_require__(120);

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Fake REST Services (Contacts, Folders, Messages) used in the mymessages submodule.
 *
 * Each of these APIs have:
 *
 * .all()
 * .search(exampleItem)
 * .get(id)
 * .save(item)
 * .post(item)
 * .put(item)
 * .remove(item)
 *
 * See ../util/sessionStorage.js for more details, if curious
 */

/** A fake Contacts REST client API */
var Contacts = exports.Contacts = function (_SessionStorage) {
  _inherits(Contacts, _SessionStorage);

  function Contacts($http, $timeout, $q, AppConfig) {
    _classCallCheck(this, Contacts);

    // http://beta.json-generator.com/api/json/get/V1g6UwwGx
    return _possibleConstructorReturn(this, _SessionStorage.call(this, $http, $timeout, $q, "contacts", "data/contacts.json", AppConfig));
  }

  return Contacts;
}(_sessionStorage.SessionStorage);

Contacts.$inject = ['$http', '$timeout', '$q', 'AppConfig'];

/** A fake Folders REST client API */

var Folders = exports.Folders = function (_SessionStorage2) {
  _inherits(Folders, _SessionStorage2);

  function Folders($http, $timeout, $q, AppConfig) {
    _classCallCheck(this, Folders);

    return _possibleConstructorReturn(this, _SessionStorage2.call(this, $http, $timeout, $q, 'folders', 'data/folders.json', AppConfig));
  }

  return Folders;
}(_sessionStorage.SessionStorage);

Folders.$inject = ['$http', '$timeout', '$q', 'AppConfig'];

/** A fake Messages REST client API */

var Messages = exports.Messages = function (_SessionStorage3) {
  _inherits(Messages, _SessionStorage3);

  function Messages($http, $timeout, $q, AppConfig) {
    _classCallCheck(this, Messages);

    // http://beta.json-generator.com/api/json/get/VJl5GbIze
    return _possibleConstructorReturn(this, _SessionStorage3.call(this, $http, $timeout, $q, 'messages', 'data/messages.json', AppConfig));
  }

  Messages.prototype.byFolder = function byFolder(folder) {
    var searchObject = { folder: folder._id };
    var toFromAttr = ["drafts", "sent"].indexOf(folder._id) !== -1 ? "from" : "to";
    searchObject[toFromAttr] = this.AppConfig.emailAddress;
    return this.search(searchObject);
  };

  return Messages;
}(_sessionStorage.SessionStorage);

Messages.$inject = ['$http', '$timeout', '$q', 'AppConfig'];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dialog = dialog;
dialog.$inject = ['$timeout', '$q'];
function dialog($timeout, $q) {
  return {
    link: function link(scope, elem) {
      $timeout(function () {
        return elem.addClass('active');
      });
      elem.data('promise', $q(function (resolve, reject) {
        scope.yes = function () {
          return resolve(true);
        };
        scope.no = function () {
          return reject(false);
        };
      }));
    },
    template: '\n      <div class="backdrop"></div>\n      <div class=\'wrapper\'>\n        <div class="content">\n          <h4 ng-show="message">{{message}}</h4>\n          <div ng-show="details">{{details}}</div>\n    \n          <div style="padding-top: 1em;">\n            <button class="btn btn-primary" ng-click="yes()">{{yesMsg}}</button>\n            <button class="btn btn-primary" ng-click="no()">{{noMsg}}</button>\n          </div>\n        </div>\n      </div>\n'
  };
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingIndicatorHookRunBlock = loadingIndicatorHookRunBlock;
/**
 * This run block registers a Transition Hook which shows a
 * Loading Indicator when a transition is in progress.
 */
loadingIndicatorHookRunBlock.$inject = ['$transitions', 'LoadingIndicatorService'];
function loadingIndicatorHookRunBlock($transitions, LoadingIndicatorService) {
  $transitions.onStart({/* match anything */}, LoadingIndicatorService.showLoadingIndicator);
  $transitions.onFinish({/* match anything */}, LoadingIndicatorService.hideLoadingIndicator);
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingIndicatorService = undefined;

var _angular = __webpack_require__(10);

var angular = _interopRequireWildcard(_angular);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadingIndicatorService = exports.LoadingIndicatorService = function LoadingIndicatorService($document) {
  _classCallCheck(this, LoadingIndicatorService);

  var body = $document.find("body");

  this.showLoadingIndicator = function () {
    body.append(angular.element('<div id="spinner"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i></div>'));
  };

  this.hideLoadingIndicator = function () {
    var spinner = document.getElementById("spinner");
    spinner.parentElement.removeChild(spinner);
  };
};

LoadingIndicatorService.$inject = ['$document', '$compile', '$rootScope'];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authHookRunBlock = authHookRunBlock;
/**
 * This run block registers a Transition Hook which protects
 * routes that requires authentication.
 *
 * This hook redirects to /login when both:
 * - The user is not authenticated
 * - The user is navigating to a state that requires authentication
 */
authHookRunBlock.$inject = ['$transitions', 'AuthService'];
function authHookRunBlock($transitions, AuthService) {
  // Matches if the destination state's data property has a truthy 'requiresAuth' property
  var requiresAuthCriteria = {
    to: function to(state) {
      return state.data && state.data.requiresAuth;
    }
  };

  // Function that returns a redirect for the current transition to the login state
  // if the user is not currently authenticated (according to the AuthService)

  var redirectToLogin = function redirectToLogin(transition) {
    var AuthService = transition.injector().get('AuthService');
    var $state = transition.router.stateService;
    if (!AuthService.isAuthenticated()) {
      return $state.target('login', undefined, { location: false });
    }
  };

  // Register the "requires auth" hook with the TransitionsService
  $transitions.onBefore(requiresAuthCriteria, redirectToLogin, { priority: 10 });
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mymessagesFutureState = exports.prefsFutureState = exports.contactsFutureState = exports.loginState = exports.homeState = exports.welcomeState = exports.appState = undefined;

var _app = __webpack_require__(64);

var _welcome = __webpack_require__(67);

var _home = __webpack_require__(65);

var _login = __webpack_require__(66);

/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost chrome (including the navigation and logout for authenticated users)
 * 2) Provide a viewport (ui-view) for a substate to plug into
 */
var appState = exports.appState = {
  name: 'app',
  redirectTo: 'welcome',
  component: 'app'
};

/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
var welcomeState = exports.welcomeState = {
  parent: 'app',
  name: 'welcome',
  url: '/welcome',
  component: 'welcome'
};

/**
 * This is a home screen for authenticated users.
 *
 * It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
 */
var homeState = exports.homeState = {
  parent: 'app',
  name: 'home',
  url: '/home',
  component: 'home'
};

/**
 * This is the login state.  It is activated when the user navigates to /login, or if a unauthenticated
 * user attempts to access a protected state (or substate) which requires authentication. (see routerhooks/requiresAuth.js)
 *
 * It shows a fake login dialog and prompts the user to authenticate.  Once the user authenticates, it then
 * reactivates the state that the user originally came from.
 */
var loginState = exports.loginState = {
  parent: 'app',
  name: 'login',
  url: '/login',
  component: 'login',
  resolve: { returnTo: returnTo }
};

/**
 * A resolve function for 'login' state which figures out what state to return to, after a successful login.
 *
 * If the user was initially redirected to login state (due to the requiresAuth redirect), then return the toState/params
 * they were redirected from.  Otherwise, if they transitioned directly, return the fromState/params.  Otherwise
 * return the main "home" state.
 */
returnTo.$inject = ['$transition$'];
function returnTo($transition$) {
  if ($transition$.redirectedFrom() != null) {
    // The user was redirected to the login state (e.g., via the requiresAuth hook when trying to activate contacts)
    // Return to the original attempted target state (e.g., contacts)
    return $transition$.redirectedFrom().targetState();
  }

  var $state = $transition$.router.stateService;

  // The user was not redirected to the login state; they directly activated the login state somehow.
  // Return them to the state they came from.
  if ($transition$.from().name !== '') {
    return $state.target($transition$.from(), $transition$.params("from"));
  }

  // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
  return $state.target('home');
}

// Future State (Placeholder) for the contacts module
var contactsFutureState = exports.contactsFutureState = {
  parent: 'app',
  name: 'contacts.**',
  url: '/contacts',
  lazyLoad: function lazyLoad(transition) {
    var $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 32)).then(function (mod) {
      return $ocLazyLoad.load(mod.CONTACTS_MODULE);
    });
  }
};

// Future State (Placeholder) for the prefs module
var prefsFutureState = exports.prefsFutureState = {
  parent: 'app',
  name: 'prefs.**',
  url: '/prefs',
  lazyLoad: function lazyLoad(transition) {
    var $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 36)).then(function (mod) {
      return $ocLazyLoad.load(mod.PREFS_MODULE);
    });
  }
};

// Future State (Placeholder) for the mymessages module
var mymessagesFutureState = exports.mymessagesFutureState = {
  parent: 'app',
  name: 'mymessages.**',
  url: '/mymessages',
  lazyLoad: function lazyLoad(transition) {
    var $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 35)).then(function (mod) {
      return $ocLazyLoad.load(mod.MYMESSAGES_MODULE);
    });
  }
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The controller for the Compose component
 */
var ComposeController = function () {
  function ComposeController($state, DialogService, AppConfig, Messages) {
    _classCallCheck(this, ComposeController);

    this.$state = $state;
    this.DialogService = DialogService;
    this.AppConfig = AppConfig;
    this.Messages = Messages;
  }

  /**
   * Create our message's model using the current user's email address as 'message.from'
   * Then extend it with all the properties from (non-url) state parameter 'message'.
   * Keep two copies: the editable one and the original one.
   * These copies are used to check if the message is dirty.
   */


  ComposeController.prototype.$onInit = function $onInit() {
    this.pristineMessage = angular.extend({ from: this.AppConfig.emailAddress }, this.$stateParams.message);
    this.message = angular.copy(this.pristineMessage);
  };

  /**
   * Checks if the edited copy and the pristine copy are identical when the state is changing.
   * If they are not identical, the allows the user to confirm navigating away without saving.
   */


  ComposeController.prototype.uiCanExit = function uiCanExit() {
    if (this.canExit || angular.equals(this.pristineMessage, this.message)) {
      return true;
    }

    var message = 'You have not saved this message.';
    var question = 'Navigate away and lose changes?';
    return this.DialogService.confirm(message, question, "Yes", "No");
  };

  /**
   * Navigates back to the previous state.
   *
   * - Checks the $transition$ which activated this controller for a 'from state' that isn't the implicit root state.
   * - If there is no previous state (because the user deep-linked in, etc), then go to 'mymessages.messagelist'
   */


  ComposeController.prototype.gotoPreviousState = function gotoPreviousState() {
    var $transition$ = this.$transition$;
    var hasPrevious = !!$transition$.from().name;
    var state = hasPrevious ? $transition$.from() : "mymessages.messagelist";
    var params = hasPrevious ? $transition$.params("from") : {};
    this.$state.go(state, params);
  };

  /** "Send" the message (save to the 'sent' folder), and then go to the previous state */
  ComposeController.prototype.send = function send(message) {
    var _this = this;

    this.Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'sent' })).then(function () {
      return _this.canExit = true;
    }).then(function () {
      return _this.gotoPreviousState();
    });
  };

  /** Save the message to the 'drafts' folder, and then go to the previous state */
  ComposeController.prototype.save = function save(message) {
    var _this2 = this;

    this.Messages.save(angular.extend(message, { date: new Date(), read: true, folder: 'drafts' })).then(function () {
      return _this2.canExit = true;
    }).then(function () {
      return _this2.gotoPreviousState();
    });
  };

  return ComposeController;
}();

ComposeController.$inject = ['$state', 'DialogService', 'AppConfig', 'Messages'];

/**
 * This component composes a message
 *
 * The message might be new, a saved draft, or a reply/forward.
 * A Cancel button discards the new message and returns to the previous state.
 * A Save As Draft button saves the message to the "drafts" folder.
 * A Send button sends the message
 */
var compose = exports.compose = {
  bindings: { $stateParams: '<', $transition$: '<' },

  controller: ComposeController,

  template: '\n    <div class="compose">\n      <div class="header">\n        <div class="flex-h"> <label>Recipient</label> <input type="text" id="to" name="to" ng-model="$ctrl.message.to"> </div>\n        <div class="flex-h"> <label>Subject</label> <input type="text" id="subject" name="subject" ng-model="$ctrl.message.subject"> </div>\n      </div>\n    \n      <div class="body">\n        <textarea name="body" id="body" ng-model="$ctrl.message.body" cols="30" rows="20"></textarea>\n        \n        <div class="buttons">\n          <!-- Clicking this button brings the user back to the state they came from (previous state) -->\n          <button class="btn btn-primary" ng-click="$ctrl.gotoPreviousState()"><i class="fa fa-times-circle-o"></i><span>Cancel</span></button>\n          <button class="btn btn-primary" ng-click="$ctrl.save($ctrl.message)"><i class="fa fa-save"></i><span>Save as Draft</span></button>\n          <button class="btn btn-primary" ng-click="$ctrl.send($ctrl.message)"><i class="fa fa-paper-plane-o"></i><span>Send</span></button>\n        </div>\n      </div>\n    </div>\n'
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Renders a list of folders
 */
var folderList = exports.folderList = {
  bindings: { folders: '<' },

  template: '\n    <!-- Renders a list of folders -->\n    <div class="folderlist">\n      <ul class="selectlist list-unstyled">\n  \n        <!-- Highlight the selected folder:\n            When the current state matches the ui-sref\'s state (and its parameters)\n            ui-sref-active applies the \'selected\' class to the li element -->\n        <li class="folder" ui-sref-active="selected" ng-repeat="folder in $ctrl.folders" >\n          <!-- This ui-sref is a relative link to the \'mymessages.messagelist\' substate. It provides the\n              \'folderId\' parameter value from the current folder\'s .id property -->\n          <a ui-sref=".messagelist({folderId: folder._id})"><i class="fa"></i>{{folder._id}}</a>\n        </li>\n      </ul>\n    </div>\n' };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A component that displays a folder of messages as a table
 * 
 * If a row is clicked, the details of the message is shown using a relative ui-sref to `.message`.
 * 
 * ui-sref-active is used to highlight the selected row.
 * 
 * Shows/hides specific columns based on the `columns` input binding.
 */
var messageTable = exports.messageTable = {
  bindings: { columns: '<', messages: '<' },

  controller: messageTableController,

  template: '\n    <table>\n      <thead>\n        <tr>\n          <td ng-if="::$ctrl.colVisible(\'read\')"></td>\n          <td ng-if="::$ctrl.colVisible(\'from\')"     sort-messages="from">Sender</td>\n          <td ng-if="::$ctrl.colVisible(\'to\')"       sort-messages="to">Recipient</td>\n          <td ng-if="::$ctrl.colVisible(\'subject\')"  sort-messages="subject">Subject</td>\n          <td ng-if="::$ctrl.colVisible(\'date\')"     sort-messages="date">Date</td>\n        </tr>\n      </thead>\n  \n      <tbody>\n        <tr ng-repeat="message in $ctrl.messages | orderBy: $ctrl.AppConfig.sort track by message._id"\n            ui-sref=".message({messageId: message._id})" ui-sref-active="active">\n          <td ng-if="::$ctrl.colVisible(\'read\')"><i class="fa fa-circle" style="font-size: 50%" ng-show="!message.read"></td>\n          <td ng-if="::$ctrl.colVisible(\'from\')">{{ message.from }}</td>\n          <td ng-if="::$ctrl.colVisible(\'to\')">{{ message.to }}</td>\n          <td ng-if="::$ctrl.colVisible(\'subject\')">{{ message.subject }}</td>\n          <td ng-if="::$ctrl.colVisible(\'date\')">{{ message.date | date: "yyyy-MM-dd" }}</td>\n        </tr>\n      </tbody>\n  \n    </table>\n' };

messageTableController.$inject = ['AppConfig'];
function messageTableController(AppConfig) {
  var _this = this;

  this.AppConfig = AppConfig;
  this.colVisible = function (name) {
    return _this.columns.indexOf(name) !== -1;
  };
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortMessages = sortMessages;
/**
 * A directive (for a table header) which changes the app's sort order
 */
sortMessages.$inject = ['AppConfig'];
function sortMessages(AppConfig) {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs) {
      var col = attrs.sortMessages;
      if (!col) return;
      var chevron = angular.element("<i style='padding-left: 0.25em' class='fa'></i>");
      elem.append(chevron);

      elem.on("click", function (evt) {
        return AppConfig.sort = AppConfig.sort === '+' + col ? '-' + col : '+' + col;
      });
      scope.$watch(function () {
        return AppConfig.sort;
      }, function (newVal) {
        chevron.toggleClass("fa-sort-asc", newVal == '+' + col);
        chevron.toggleClass("fa-sort-desc", newVal == '-' + col);
      });
    }
  };
}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageBody = messageBody;
/** Angular filter to format fake emails as HTML*/
messageBody.$inject = ['$sce'];
function messageBody($sce) {
  return function () {
    var msgText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return $sce.trustAsHtml(msgText.split(/\n/).map(function (p) {
      return '<p>' + p + '</p>';
    }).join('\n'));
  };
}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.message = undefined;

var _util = __webpack_require__(68);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Helper function to prefix a message with "fwd: " or "re: " */
var prefixSubject = function prefixSubject(prefix, message) {
  return prefix + message.subject;
};
/** Helper function which quotes an email message */
var quoteMessage = function quoteMessage(message) {
  return "\n\n\n\n---------------------------------------\nOriginal message:\nFrom: " + message.from + "\nDate: " + message.date + "\nSubject: " + message.subject + "\n\n" + message.body;
};

/** Helper function to make a response message object */
var makeResponseMsg = function makeResponseMsg(subjectPrefix, origMsg) {
  return {
    from: origMsg.to,
    to: origMsg.from,
    subject: prefixSubject(subjectPrefix, origMsg),
    body: quoteMessage(origMsg)
  };
};

/**
 * The controller for the Message component
 */

var MessageController = function () {
  function MessageController($state, DialogService, Messages) {
    _classCallCheck(this, MessageController);

    this.$state = $state;
    this.DialogService = DialogService;
    this.Messages = Messages;
  }

  /**
   * When the user views a message, mark it as read and save (PUT) the resource.
   *
   * Apply the available actions for the message, depending on the folder the message belongs to.
   */


  MessageController.prototype.$onInit = function $onInit() {
    this.message.read = true;
    this.Messages.put(this.message);

    this.actions = this.folder.actions.reduce(function (obj, action) {
      return (0, _util.setProp)(obj, action, true);
    }, {});
  };

  /**
   * Compose a new message as a reply to this one
   */


  MessageController.prototype.reply = function reply(message) {
    var replyMsg = makeResponseMsg("Re: ", message);
    this.$state.go('mymessages.compose', { message: replyMsg });
  };

  /**
   * Compose a new message as a forward of this one.
   */
  MessageController.prototype.forward = function forward(message) {
    var fwdMsg = makeResponseMsg("Fwd: ", message);
    delete fwdMsg.to;
    this.$state.go('mymessages.compose', { message: fwdMsg });
  };

  /**
   * Continue composing this (draft) message
   */
  MessageController.prototype.editDraft = function editDraft(message) {
    this.$state.go('mymessages.compose', { message: message });
  };

  /**
   * Delete this message.
   *
   * - confirm deletion
   * - delete the message
   * - determine which message should be active
   * - show that message
   */
  MessageController.prototype.remove = function remove(message) {
    var _this = this;

    var nextMessageId = this.nextMessageGetter(message._id);
    var nextState = nextMessageId ? 'mymessages.messagelist.message' : 'mymessages.messagelist';
    var params = { messageId: nextMessageId };

    this.DialogService.confirm("Delete?", undefined).then(function () {
      return _this.Messages.remove(message);
    }).then(function () {
      return _this.$state.go(nextState, params, { reload: 'mymessages.messagelist' });
    });
  };

  return MessageController;
}();

MessageController.$inject = ['$state', 'DialogService', 'Messages'];

/**
 * This component renders a single message
 *
 * Buttons perform actions related to the message.
 * Buttons are shown/hidden based on the folder's context.
 * For instance, a "draft" message can be edited, but can't be replied to.
 */
var message = exports.message = {
  bindings: { folder: '<', message: '<', nextMessageGetter: '<' },

  controller: MessageController,

  template: "\n    <div class=\"message\">\n    \n      <div class=\"header\">\n        <div>\n          <h4>{{$ctrl.message.subject}}</h4>\n          <h5>{{$ctrl.message.from}} <i class=\"fa fa-long-arrow-right\"></i> {{$ctrl.message.to}}</h5>\n        </div>\n    \n        <div class=\"line2\">\n          <div>{{$ctrl.message.date | date: 'longDate'}} {{$ctrl.message.date | date: 'mediumTime'}}</div>\n          <div>\n            <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.edit\" ng-click=\"$ctrl.editDraft($ctrl.message)\"><i class=\"fa fa-pencil\"></i> <span>Edit Draft</span></button>\n            <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.reply\" ng-click=\"$ctrl.reply($ctrl.message)\"><i class=\"fa fa-reply\"></i> <span>Reply</span></button>\n            <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.forward\" ng-click=\"$ctrl.forward($ctrl.message)\"><i class=\"fa fa-forward\" ></i> <span>Forward</span></button>\n            <button class=\"btn btn-primary\" ng-show=\"$ctrl.actions.delete\" ng-click=\"$ctrl.remove($ctrl.message)\"><i class=\"fa fa-close\"></i> <span>Delete</span></button>\n          </div>\n        </div>\n      </div>\n    \n      <!-- Pass the raw (plain text) message body through the messageBody filter to format slightly nicer. -->\n      <div class=\"body\" ng-bind-html=\"::$ctrl.message.body | messageBody\"></div>\n    </div>\n" };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This component renders a list of messages using the `messageTable` component
 */
var messageList = exports.messageList = {
  bindings: { folder: '<', messages: '<' },
  template: '\n    <div class="messages">\n      <message-table columns="$ctrl.folder.columns" messages="$ctrl.messages"></message-table>\n    </div>\n' };

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The main mymessages component.
 *
 * Renders a list of folders, and has two viewports:
 * - messageList: filled with the list of messages for a folder
 * - messagecontent: filled with the contents of a single message.
 */
var mymessages = exports.mymessages = {
  bindings: { folders: '<' },

  template: '\n    <div class="my-messages">\n    \n      <!-- Show message folders -->\n      <folder-list folders="$ctrl.folders"></folder-list>\n    \n      <!-- A named view for the list of messages in this folder.  This will be  filled in by the \'mymessages.messagelist\' child state -->\n      <div ui-view="messagelist" class="messagelist"> </div>\n    \n    </div>\n    \n    <!-- A named ui-view for a message\'s contents.  The \'mymessages.messagelist.message\' grandchild state plugs into this ui-view -->\n    <div ui-view="messagecontent"></div>\n' };

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The mymessages state. This is the main state for the mymessages submodule.
 *
 * This state shows the list of folders for the current user. It retrieves the folders from the
 * Folders service.  If a user navigates directly to this state, the state redirects to the 'mymessages.messagelist'.
 */
var mymessagesState = exports.mymessagesState = {
  parent: 'app',
  name: "mymessages",
  url: "/mymessages",
  resolve: {
    // All the folders are fetched from the Folders service
    folders: ['Folders', function (Folders) {
      return Folders.all();
    }]
  },
  views: {
    mymessages: 'mymessages'
  },
  // Mark this state as requiring authentication.  See ../routerhooks/requiresAuth.js.
  data: { requiresAuth: true },
  // If mymessages state is directly activated, redirect the transition to the most recent
  // child state that was previously activated, or 'mymessages.messagelist' (by default)
  deepStateRedirect: {
    default: { state: 'mymessages.messagelist' }
  },
  sticky: true
};

/**
 * This state shows the contents (a message list) of a single folder
 */
var messageListState = exports.messageListState = {
  name: 'mymessages.messagelist',
  url: '/:folderId',
  // The folderId parameter is part of the URL.  This params block sets 'inbox' as the default value.
  // If no parameter value for folderId is provided on the transition, then it will be defaulted to 'inbox'
  params: { folderId: "inbox" },
  resolve: {
    // Fetch the current folder from the Folders service, using the folderId parameter
    folder: ['Folders', '$stateParams', function (Folders, $stateParams) {
      return Folders.get($stateParams.folderId);
    }],

    // The resolved folder object (from the resolve above) is injected into this resolve
    // The list of message for the folder are fetched from the Messages service
    messages: ['Messages', 'folder', function (Messages, folder) {
      return Messages.byFolder(folder);
    }]
  },
  views: {
    // This targets the "messagelist" named ui-view added to the DOM in the parent state 'mymessages'
    messagelist: 'messageList'
  }
};

/**
 * This state shows the contents of a single message.
 * It also has UI to reply, forward, delete, or edit an existing draft.
 */
var messageState = exports.messageState = {
  name: 'mymessages.messagelist.message',
  url: '/:messageId',
  resolve: {
    // Fetch the message from the Messages service using the messageId parameter
    message: ['Messages', '$stateParams', function (Messages, $stateParams) {
      return Messages.get($stateParams.messageId);
    }],
    // Provide the component with a function it can query that returns the closest message id
    nextMessageGetter: ['MessageListUI', 'messages', function (MessageListUI, messages) {
      return MessageListUI.proximalMessageId.bind(MessageListUI, messages);
    }]
  },
  views: {
    // Relatively target the parent-state's parent-state's 'messagecontent' ui-view
    // This could also have been written using ui-view@state addressing: 'messagecontent@mymessages'
    // Or, this could also have been written using absolute ui-view addressing: '!$default.mymessages.messagecontent'
    "^.^.messagecontent": 'message'
  }
};

/**
 * This state allows the user to compose a new message, edit a drafted message, send a message,
 * or save an unsent message as a draft.
 *
 * This state uses view-targeting to take over the ui-view that would normally be filled by the 'mymessages' state.
 */
var composeState = exports.composeState = {
  name: 'mymessages.compose',
  url: '/compose',
  // Declares that this state has a 'message' parameter, that defaults to an empty object.
  // Note the parameter does not appear in the URL.
  params: {
    message: {}
  },
  views: {
    // Absolutely targets the ui-view named 'mymessages' (which is nested inside an unnamed ui-view) with the 'compose' component.
    // Absolute targeting finds the nested ui-view in the DOM, using view names.
    '!$default.mymessages': 'compose'
  }
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Provides services related to a message list */
var MessageListUI = exports.MessageListUI = function () {
  function MessageListUI($filter, AppConfig) {
    _classCallCheck(this, MessageListUI);

    this.$filter = $filter;
    this.AppConfig = AppConfig;
  }

  /** This is a UI helper which finds the nearest messageId in the messages list to the messageId parameter */


  MessageListUI.prototype.proximalMessageId = function proximalMessageId(messages, messageId) {
    var sorted = this.$filter("orderBy")(messages, this.AppConfig.sort);
    var idx = sorted.findIndex(function (msg) {
      return msg._id === messageId;
    });
    var proximalIdx = sorted.length > idx + 1 ? idx + 1 : idx - 1;
    return proximalIdx >= 0 ? sorted[proximalIdx]._id : undefined;
  };

  return MessageListUI;
}();

MessageListUI.$inject = ['$filter', 'AppConfig'];

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The controller for the prefs component.
 */
var PrefsController = function () {
  function PrefsController(AppConfig) {
    _classCallCheck(this, PrefsController);

    this.AppConfig = AppConfig;
  }

  PrefsController.prototype.$onInit = function $onInit() {
    this.prefs = {
      restDelay: this.AppConfig.restDelay
    };
  };

  /** Clear out the session storage */


  PrefsController.prototype.reset = function reset() {
    sessionStorage.clear();
    document.location.reload(true);
  };

  /** After saving preferences to session storage, reload the entire application */


  PrefsController.prototype.savePrefs = function savePrefs() {
    angular.extend(this.AppConfig, { restDelay: this.prefs.restDelay }).save();
    document.location.reload(true);
  };

  return PrefsController;
}();

PrefsController.$inject = ['AppConfig'];

/**
 * A component which shows and updates app preferences
 */
var prefs = exports.prefs = {
  controller: PrefsController,

  template: '\n    <div>\n      <button class="btn btn-primary" ng-click="$ctrl.reset()"><i class="fa fa-recycle"></i> <span>Reset All Data</span></button>\n    </div>\n    \n    <div>\n      <label for="restDelay">Simulated REST API delay (ms)</label>\n      <input type="text" name="restDelay" ng-model="$ctrl.prefs.restDelay">\n      <button class="btn btn-primary" ng-click="$ctrl.savePrefs()">Save</button>\n    </div>\n' };

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This state allows the user to set their application preferences
 */
var prefsState = exports.prefsState = {
  parent: 'app',
  name: 'prefs',
  url: '/prefs',
  component: 'prefs',
  // Mark this state as requiring authentication.  See ../global/requiresAuth.hook.js.
  data: { requiresAuth: true }
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionStorage = undefined;

var _util = __webpack_require__(68);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class simulates a RESTful resource, but the API calls fetch data from
 * Session Storage instead of an HTTP call.
 *
 * Once configured, it loads the initial (pristine) data from the URL provided (using HTTP).
 * It exposes GET/PUT/POST/DELETE-like API that operates on the data.  All the data is also
 * stored in Session Storage.  If any data is modified in memory, session storage is updated.
 * If the browser is refreshed, the SessionStorage object will try to fetch the existing data from
 * the session, before falling back to re-fetching the initial data using HTTP.
 *
 * For an example, please see dataSources.js
 */
var SessionStorage = exports.SessionStorage = function () {
  /**
   * Creates a new SessionStorage object
   *
   * @param $http Pass in the $http service
   * @param $timeout Pass in the $timeout service
   * @param $q Pass in the $q service
   * @param sessionStorageKey The session storage key. The data will be stored in browser's session storage under this key.
   * @param sourceUrl The url that contains the initial data.
   * @param AppConfig Pass in the AppConfig object
   */
  function SessionStorage($http, $timeout, $q, sessionStorageKey, sourceUrl, AppConfig) {
    var _this = this;

    _classCallCheck(this, SessionStorage);

    var data = void 0,
        fromSession = sessionStorage.getItem(sessionStorageKey);
    // A promise for *all* of the data.
    this._data = undefined;

    // For each data object, the _idProp defines which property has that object's unique identifier
    this._idProp = "_id";

    // A basic triple-equals equality checker for two values
    this._eqFn = function (l, r) {
      return l[_this._idProp] === r[_this._idProp];
    };

    // Services required to implement the fake REST API
    this.$q = $q;
    this.$timeout = $timeout;
    this.sessionStorageKey = sessionStorageKey;
    this.AppConfig = AppConfig; // Used to get the REST latency simulator,

    if (fromSession) {
      try {
        // Try to parse the existing data from the Session Storage API
        data = JSON.parse(fromSession);
      } catch (e) {
        console.log("Unable to parse session messages, retrieving intial data.");
      }
    }

    var stripHashKey = function stripHashKey(obj) {
      return (0, _util.setProp)(obj, '$$hashKey', undefined);
    };

    // Create a promise for the data; Either the existing data from session storage, or the initial data via $http request
    this._data = (data ? $q.resolve(data) : $http.get(sourceUrl).then(function (resp) {
      return resp.data;
    })).then(this._commit.bind(this)).then(function () {
      return JSON.parse(sessionStorage.getItem(sessionStorageKey));
    }).then(function (array) {
      return array.map(stripHashKey);
    });
  }

  /** Saves all the data back to the session storage */


  SessionStorage.prototype._commit = function _commit(data) {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(data));
    return this.$q.resolve(data);
  };

  /** Helper which simulates a delay, then provides the `thenFn` with the data */


  SessionStorage.prototype.all = function all(thenFn) {
    var _this2 = this;

    return this.$timeout(function () {
      return _this2._data;
    }, this.AppConfig.restDelay).then(thenFn);
  };

  /** Given a sample item, returns a promise for all the data for items which have the same properties as the sample */


  SessionStorage.prototype.search = function search(exampleItem) {
    var contains = function contains(search, inString) {
      return ("" + inString).indexOf("" + search) !== -1;
    };
    var matchesExample = function matchesExample(example, item) {
      return Object.keys(example).reduce(function (memo, key) {
        return memo && contains(example[key], item[key]);
      }, true);
    };
    return this.all(function (items) {
      return items.filter(matchesExample.bind(null, exampleItem));
    });
  };

  /** Returns a promise for the item with the given identifier */


  SessionStorage.prototype.get = function get(id) {
    var _this3 = this;

    return this.all(function (items) {
      return items.find(function (item) {
        return item[_this3._idProp] === id;
      });
    });
  };

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */


  SessionStorage.prototype.save = function save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item);
  };

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */


  SessionStorage.prototype.post = function post(item) {
    item[this._idProp] = (0, _util.guid)();
    return this.all(function (items) {
      return (0, _util.pushToArr)(items, item);
    }).then(this._commit.bind(this));
  };

  /** Returns a promise to save (PUT) an existing item. */


  SessionStorage.prototype.put = function put(item) {
    var _this4 = this;

    var eqFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._eqFn;

    return this.all(function (items) {
      var idx = items.findIndex(eqFn.bind(null, item));
      if (idx === -1) throw Error(item + " not found in " + _this4);
      items[idx] = item;
      return _this4._commit(items).then(function () {
        return item;
      });
    });
  };

  /** Returns a promise to remove (DELETE) an item. */


  SessionStorage.prototype.remove = function remove(item) {
    var _this5 = this;

    var eqFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._eqFn;

    return this.all(function (items) {
      var idx = items.findIndex(eqFn.bind(null, item));
      if (idx === -1) throw Error(item + " not found in " + _this5);
      items.splice(idx, 1);
      return _this5._commit(items).then(function () {
        return item;
      });
    });
  };

  return SessionStorage;
}();

SessionStorage.$inject = ['$http', '$timeout', '$q', 'sessionStorageKey', 'sourceUrl', 'AppConfig'];

/***/ })
]),[92]);
//# sourceMappingURL=sampleapp.js.map