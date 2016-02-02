import {ngmodule} from "../../ngmodule";

// Angular filter to format fake emails as HTML
ngmodule.filter('messageBody', ($sce) => (msgText) => $sce.trustAsHtml(msgText.split(/\n/).map(p => `<p>${p}</p>`).join('\n')));
