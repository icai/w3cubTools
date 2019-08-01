import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { Pane, Button, IconButton } from "evergreen-ui";
import WriteCharactorSearch from "@components/WriteCharactor/WriteCharactorSearch";

let time = 0;
let reqFrame;
let paths = [];
export default function(props) {
  const LAYOUT_SIZE = props.size || 600;
  const [char, setChar] = useState("");
  const onSearch = slug => {
    slug = slug.slice(0, 1);
    if (slug && props.dict[slug]) {
      paths = JSON.parse(JSON.stringify(props.dict[slug]));
      location.hash = "#/" + slug;
    } else {
      paths = [];
    }
    setChar(slug);
  };
  const draw = startTime => {
    if (!__CLIENT__) {
      return;
    }
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    //画田字格
    var drawBoard = function() {
      ctx.setLineDash([]);
      ctx.strokeStyle = "red";
      for (var i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0 + i * 300, 0);
        ctx.lineTo(0 + i * 300, 300 * 3 - 0);
        ctx.stroke();
        ctx.moveTo(0, 0 + i * 300);
        ctx.lineTo(300 * 3 - 0, 0 + i * 300);
        ctx.stroke();
      }
      // X
      ctx.beginPath();
      ctx.setLineDash([5, 15]);
      ctx.moveTo(0, 0);
      ctx.lineTo(600, 600);
      ctx.stroke();
      // X
      ctx.beginPath();
      ctx.setLineDash([5, 15]);
      ctx.moveTo(600, 0);
      ctx.lineTo(0, 600);
      ctx.stroke();

      ctx.closePath();
    };
    drawBoard();
    const drawWord = thepaths => {
      if (startTime !== time) {
        paths = [];
        return;
      }
      var vertices = [];
      if (thepaths.length > 0) {
        vertices = thepaths.shift();
      } else {
        return;
      }
      // calculate incremental points along the path
      var points = calcWaypoints(vertices);
      // extend the line from start to finish with animation
      // calc waypoints traveling along vertices
      function calcWaypoints(vertices) {
        var waypoints = [];
        var fps = 50;
        var len = vertices.length;
        if (len > 3) {
          fps = 40;
        }
        for (var i = 1; i < len; i++) {
          var pt0 = vertices[i - 1];
          var pt1 = vertices[i];
          var dx = pt1[0] - pt0[0];
          var dy = pt1[1] - pt0[1];
          for (var j = 0; j < fps; j++) {
            var x = pt0[0] + (dx * j) / fps;
            var y = pt0[1] + (dy * j) / fps;
            waypoints.push({
              x: x,
              y: y
            });
          }
        }
        return waypoints;
      }
      var t = 1;
      function animate() {
        if (startTime !== time) {
          cancelAnimationFrame(reqFrame);
          return;
        }
        ctx.lineCap = "round";
        ctx.lineWidth = 15;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(points[t - 1].x, points[t - 1].y);
        ctx.lineTo(points[t].x, points[t].y);
        ctx.stroke();

        if (t < points.length - 1) {
          reqFrame = requestAnimationFrame(animate);
        } else {
          drawWord(thepaths);
        }
        t++;
      }
      animate();
    };
    if (char && paths && paths.length) {
      drawWord(paths);
    }
  };
  useEffect(() => {
    let path = decodeURIComponent(location.hash.slice(2));
    onSearch(path);
    time = new Date().getTime();
    draw(time);
  }, [char]);

  return (
    <Pane>
      <WriteCharactorSearch
        char={char}
        onSearch={onSearch}
      ></WriteCharactorSearch>
      <Pane className="clearfix" paddingTop={100}>
        <canvas id="canvas" width={LAYOUT_SIZE} height={LAYOUT_SIZE}></canvas>
      </Pane>
    </Pane>
  );
}
