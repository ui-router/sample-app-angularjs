// https://github.com/resin-io/triangular.js
// http://alexandros.resin.io/angular-d3-svg/
// MIT License https://opensource.org/licenses/MIT
let moduleName = "ui.router.demo.d3ng";
export default moduleName;
angular.module(moduleName, []).service("d3ng", function(easing, $rootScope) {
  return {
    animatePath: function(newValue, oldValue, duration, updateFrame) {
      let start = null, interpolate = d3.interpolateArray(oldValue, newValue);

      let step = function(now) {
        if (duration === -1) return;
        if (start == null) start = now;
        let progress = now - start, percent = 1;
        if (progress < duration) {
          requestAnimationFrame(step);
          percent = easing.easeOutElastic(progress, 0, 1, duration);
        }
        $rootScope.$apply(() => updateFrame(interpolate(percent)));
      };

      requestAnimationFrame(step);

      return function cancel() {
        duration = -1;
      }
    }
  }
});
