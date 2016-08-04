/** Angular filter to format fake emails as HTML*/
export const messageBody = function($sce) {
  return (msgText = '') => $sce.trustAsHtml(msgText.split(/\n/).map(p => `<p>${p}</p>`).join('\n'));
};