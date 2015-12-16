// https://github.com/resin-io/triangular.js
// http://alexandros.resin.io/angular-d3-svg/
// MIT License https://opensource.org/licenses/MIT

/** This animation code was taken from trangular.js, and is used to interpolate 2 arrays of values using an easing fn */
let moduleName = "ui.router.demo.d3ng";
export default moduleName;
angular.module(moduleName, []).service("d3ng", function(easing, $rootScope) {
  return {
    animatePath: function(newValue, oldValue, duration, updateFrame, finishFn = function() {}, easeFn = easing.easeOutElastic) {
      let start = null, interpolate = d3.interpolateArray(oldValue, newValue);

      let step = function(now) {
        if (duration === -1) return finishFn();
        if (start == null) start = now;
        let progress = now - start, percent = 1;
        if (progress < duration) {
          requestAnimationFrame(step);
          percent = easeFn(progress, 0, 1, duration);
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
