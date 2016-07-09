/** Provides services related to a message list */
export class MessageListUI {
  constructor($filter, AppConfig) {
    this.$filter = $filter;
    this.AppConfig = AppConfig;
  }

  /** This is a UI helper which finds the nearest messageId in the messages list to the messageId parameter */
  proximalMessageId(messages, messageId) {
    let sorted = this.$filter("orderBy")(messages, this.AppConfig.sort);
    let idx = sorted.findIndex(msg => msg._id === messageId);
    var proximalIdx = sorted.length > idx + 1 ? idx + 1 : idx - 1;
    return proximalIdx >= 0 ? sorted[proximalIdx]._id : undefined;
  }
}