// https://github.com/resin-io/triangular.js
// http://alexandros.resin.io/angular-d3-svg/
// MIT License https://opensource.org/licenses/MIT
let moduleName = "ui.router.demo.d3ng";
export default moduleName;
angular.module(moduleName, []).service("d3ng", function(easing, $rootScope) {
  return {
    animatePath: function(newValue, oldValue, duration, updateFrame) {
      let interpolate, start = null, step;
      interpolate = d3.interpolateArray(oldValue, newValue);

      step = function(now) {
        if (start == null) start = now;
        var progress = now - start;

        if (progress < duration) {
          requestAnimationFrame(step);
          let eased = easing.easeOutElastic(progress, 0, 1, duration);
          $rootScope.$apply(() => updateFrame(interpolate(eased)));
        } else {
          $rootScope.$apply(() => updateFrame(interpolate(1)));
        }
      };

      return requestAnimationFrame(step);
    }
  }
});
