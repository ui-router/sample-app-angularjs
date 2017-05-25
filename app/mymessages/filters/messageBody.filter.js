/** Angular filter to format fake emails as HTML*/
messageBody.$inject = ['$sce'];
export function messageBody($sce) {
  return (msgText = '') => $sce.trustAsHtml(msgText.split(/\n/).map(p => `<p>${p}</p>`).join('\n'));
}