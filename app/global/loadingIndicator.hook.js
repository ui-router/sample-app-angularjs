/**
 * This run block registers a Transition Hook which shows a
 * Loading Indicator when a transition is in progress.
 */
loadingIndicatorHookRunBlock.$inject = ['$transitions', 'LoadingIndicatorService'];
export function loadingIndicatorHookRunBlock($transitions, LoadingIndicatorService) {
  $transitions.onStart( { /* match anything */ }, LoadingIndicatorService.showLoadingIndicator);
  $transitions.onFinish( { /* match anything */ }, LoadingIndicatorService.hideLoadingIndicator);
}
