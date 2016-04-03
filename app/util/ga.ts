import {ngmodule} from "../bootstrap/ngmodule";

/** Google analytics */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-73329341-1', 'auto');
ga('send', 'pageview');


ngmodule.config($transitionsProvider => {
  $transitionsProvider.onBefore({}, $transition$ => {
    let path = $transition$.treeChanges().to
        .map(node=>node.state.self.url)
        .filter(x => x != null && x !== '^')
        .join('');

    let vpv = (path) => ga('send', 'pageview', path);

    let success = () => { vpv(path); };
    let error = (err) => {
      let errType = err && err.hasOwnProperty("type") ? err.type : '_';
      path = path.replace(/^\//, "");
      vpv(`/errors/${errType}/${path}`)
    };

    $transition$.promise.then(success, error);
  })
});
