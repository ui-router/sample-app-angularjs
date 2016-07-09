"use strict";
/** Provides services related to a message list */
var MessageListUI = (function () {
    function MessageListUI($filter, AppConfig) {
        this.$filter = $filter;
        this.AppConfig = AppConfig;
    }
    /** This is a UI helper which finds the nearest messageId in the messages list to the messageId parameter */
    MessageListUI.prototype.proximalMessageId = function (messages, messageId) {
        var sorted = this.$filter("orderBy")(messages, this.AppConfig.sort);
        var idx = sorted.findIndex(function (msg) { return msg._id === messageId; });
        var proximalIdx = sorted.length > idx + 1 ? idx + 1 : idx - 1;
        return proximalIdx >= 0 ? sorted[proximalIdx]._id : undefined;
    };
    return MessageListUI;
}());
exports.MessageListUI = MessageListUI;
//# sourceMappingURL=messagesListUI.service.js.map