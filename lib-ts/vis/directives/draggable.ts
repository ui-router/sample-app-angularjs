import angular from "angular";
import {app} from "../statevis.module.ts";

app.directive('draggable', ($document) => ({
  restrict: "A",
  link: function (scope, elem) {
    let isDragging = false;
    let mx = 0, my = 0;
    let x = 0, y = 0;

    elem.on("mousedown", (e) => {
      isDragging = true;
      mx = e.pageX;
      my = e.pageY;
      x = elem[0].offsetLeft;
      y = elem[0].offsetTop;
    });

    elem.on("mousemove", (e) => {
      if (!isDragging) return;

      elem[0].style.left = (x + (e.pageX - mx)) + 'px';
      elem[0].style.top = (y + (e.pageY - my)) + 'px';
    });

    elem.on("mouseup", () => { isDragging = false; });
    $document.on("mouseup", () => { isDragging = false; });
  }
}));
