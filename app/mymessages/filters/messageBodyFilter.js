import {app} from "../../app.module";

// Angular filter to format fake emails as HTML
app.filter('messageBody', ($sce) => (msgText) => $sce.trustAsHtml(msgText.split(/\n/).map(p => `<p>${p}</p>`).join('\n')));
