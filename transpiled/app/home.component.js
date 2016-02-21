// This is a home screen for authenticated users.
// It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
"use strict";
exports.template = "\n    <div class=\"home buttons\">\n      <button ui-sref=\"mymessages\" class=\"btn btn-primary\">\n        <h1><i class=\"fa fa-envelope\"></i></h1>\n        <h1>Messages</h1>\n      </button>\n\n      <button ui-sref=\"contacts\" class=\"btn btn-primary\">\n      <h1><i class=\"fa fa-users\"></i></h1>\n      <h1>Contacts</h1>\n      </button>\n\n      <button ui-sref=\"prefs\" class=\"btn btn-primary\">\n        <h1><i class=\"fa fa-cogs\"></i></h1>\n        <h1>Preferences</h1>\n      </button>\n    </div>\n";
exports.controller = function () { };
//# sourceMappingURL=home.component.js.map