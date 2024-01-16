// Bezier Curves through N points
export class BezierCurves {
  static calculateControlPoint(points: any[], smoothValue: number) {
    const [p0, p1, p2, p3] = points;

    const xc1 = (p0.x + p1.x) / 2.0;
    const yc1 = (p0.y + p1.y) / 2.0;
    const xc2 = (p1.x + p2.x) / 2.0;
    const yc2 = (p1.y + p2.y) / 2.0;
    const xc3 = (p2.x + p3.x) / 2.0;
    const yc3 = (p2.y + p3.y) / 2.0;

    const len1 = Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2);
    const len2 = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    const len3 = Math.sqrt((p3.x - p2.x) ** 2 + (p3.y - p2.y) ** 2);

    const k1 = len1 / (len1 + len2);
    const k2 = len2 / (len2 + len3);

    const xm1 = xc1 + (xc2 - xc1) * k1;
    const ym1 = yc1 + (yc2 - yc1) * k1;

    const xm2 = xc2 + (xc3 - xc2) * k2;
    const ym2 = yc2 + (yc3 - yc2) * k2;

    const outPoints = [
      { x: p1.x, y: p1.y },
      {
        x: xm1 + (xc2 - xm1) * smoothValue + p1.x - xm1,
        y: ym1 + (yc2 - ym1) * smoothValue + p1.y - ym1
      },
      {
        x: xm2 + (xc2 - xm2) * smoothValue + p2.x - xm2,
        y: ym2 + (yc2 - ym2) * smoothValue + p2.y - ym2
      },
      { x: p2.x, y: p2.y }
    ];

    return outPoints;
  }

  static curve4(points: any[] | { x: any; y: any }[], numSteps = 20) {
    const [p0, p1, p2, p3] = points;

    const dx1 = p1.x - p0.x;
    const dy1 = p1.y - p0.y;
    const dx2 = p2.x - p1.x;
    const dy2 = p2.y - p1.y;
    const dx3 = p3.x - p2.x;
    const dy3 = p3.y - p2.y;

    const subdivStep = 1.0 / (numSteps + 1);
    const subdivStep2 = subdivStep * subdivStep;
    const subdivStep3 = subdivStep * subdivStep * subdivStep;

    const pre1 = 3.0 * subdivStep;
    const pre2 = 3.0 * subdivStep2;
    const pre4 = 6.0 * subdivStep2;
    const pre5 = 6.0 * subdivStep3;

    let tmp1x = p0.x - p1.x * 2.0 + p2.x;
    let tmp1y = p0.y - p1.y * 2.0 + p2.y;

    let tmp2x = (p1.x - p2.x) * 3.0 - p0.x + p3.x;
    let tmp2y = (p1.y - p2.y) * 3.0 - p0.y + p3.y;

    let fx = p0.x;
    let fy = p0.y;

    let dfx = (p1.x - p0.x) * pre1 + tmp1x * pre2 + tmp2x * subdivStep3;
    let dfy = (p1.y - p0.y) * pre1 + tmp1y * pre2 + tmp2y * subdivStep3;

    let ddfx = tmp1x * pre4 + tmp2x * pre5;
    let ddfy = tmp1y * pre4 + tmp2y * pre5;

    let dddfx = tmp2x * pre5;
    let dddfy = tmp2y * pre5;

    const result = [];

    for (let step = numSteps; step > 0; step--) {
      fx += dfx;
      fy += dfy;
      dfx += ddfx;
      dfy += ddfy;
      ddfx += dddfx;
      ddfy += dddfy;
      result.push({ x: fx, y: fy });
    }

    result.push({ x: p3.x, y: p3.y }); // Last step must go exactly to p3

    return result;
  }

  static getPolyline(
    list: any[],
    smoothValue: number,
    numSteps: number,
    isLoop: boolean,
    isOpen: boolean
  ) {
    const temp = list.slice();
    // if list only as 2 points, then calcWaypoints
    if (list.length === 2) {
      return BezierCurves.calcWaypoints(list, 60);
    }

    if (isLoop) {
      temp.unshift(list[list.length - 1]);
      temp.push(temp[1]);
      temp.push(temp[2]);
    } else {
      temp.unshift(temp[0]);
      temp.push(temp[temp.length - 1]);
      temp.push(temp[0]);
      temp.push(temp[0]);
    }
    const result = [list[0]]; // first point
    for (let i = 0; i < (!isOpen ? list.length : list.length - 1); i++) {

      const points = BezierCurves.calculateControlPoint(
        // @ts-ignore
        temp.slice(i, i + 4),
        smoothValue
      );
      result.push(...BezierCurves.curve4(points, numSteps));
    }
    return result;
  }
  static calcWaypoints(vertices: any[], fps: number) {
    var waypoints = [];
    var len = vertices.length;
    // Include the start point
    waypoints.push({
      x: vertices[0].x,
      y: vertices[0].y
    });

    for (var i = 1; i < len; i++) {
      var pt0 = vertices[i - 1];
      var pt1 = vertices[i];
      var dx = pt1.x - pt0.x;
      var dy = pt1.y - pt0.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      // 200 pixels per second
      var segmentFps = Math.ceil((distance / 200) * fps);
      segmentFps = Math.max(segmentFps, 10);
      for (var j = 1; j <= segmentFps; j++) {
        var t = j / segmentFps;
        var x = pt0.x + t * dx;
        var y = pt0.y + t * dy;
        waypoints.push({
          x: x,
          y: y
        });
      }
    }
    // Include the end point
    waypoints.push({
      x: vertices[len - 1].x,
      y: vertices[len - 1].y
    });
    return waypoints;
  }
}
