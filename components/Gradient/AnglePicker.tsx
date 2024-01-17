import React, { useEffect, useState, useRef } from "react";

interface AnglePickerProps {
  className?: string;
  angle?: number;
  size?: number;
  color?: string;
  callback?: (angle: number) => void;
}

export default function AnglePicker(props: AnglePickerProps) {
  const { size = 16, color = "#fff" } = props;

  const container = useRef<HTMLDivElement>(null);

  const proto = {
    x: 0,
    y: 0,
    dragging: false
  };

  const startEvent = function (event: any) {
    if (/touch/.test(event.type)) {
      event.preventDefault();
      event.stopPropagation();
    }
    proto.x = event.offsetX || event.layerX;
    proto.y = event.offsetY || event.layerY;
    draw();
  };

  const moveEvent = function (event: any) {
    if (/touch/.test(event.type)) {
      event.preventDefault();
      event.stopPropagation();
    }
    proto.dragging = true;
    proto.x = event.offsetX || event.layerX;
    proto.y = event.offsetY || event.layerY;
    draw();
  };

  const endEvent = function (event: any) {
    if (/touch/.test(event.type)) {
      event.preventDefault();
      event.stopPropagation();
    }
    proto.dragging = false;
  };

  var draw = function () {
    const x2 = proto.x;
    const y2 = proto.y;
    const radians = Math.atan2(y2 - 15, x2 - 15);
    let angle = radians * (180 / Math.PI);
    angle = 90 + angle;
    if (angle < 0) {
      angle = 360 + angle;
    }
    angle = Math.round(angle);
    setAngle(angle);
    props.callback && props.callback(angle);
  };

  const [angle, setAngle] = useState<number>(props.angle || 0);
  useEffect(() => {
    if (container.current) {
      if ("ontouchstart" in document.documentElement) {
        container.current.addEventListener("touchstart", startEvent);
        container.current.addEventListener("touchmove", moveEvent);
        container.current.addEventListener("touchend", endEvent);
      } else {
        container.current.addEventListener("mousedown", startEvent);
        container.current.addEventListener("mousemove", moveEvent);
        container.current.addEventListener("mouseup", endEvent);
      }
      return () => {
        if ("ontouchstart" in document.documentElement && container.current) {
          container.current.removeEventListener("touchstart", startEvent);
          container.current.removeEventListener("touchmove", moveEvent);
          container.current.removeEventListener("touchend", endEvent);
        } else if (container.current) {
          container.current.removeEventListener("mousedown", startEvent);
          container.current.removeEventListener("mousemove", moveEvent);
          container.current.removeEventListener("mouseup", endEvent);
        }
      };
    }
  }, [container]);

  return (
    <div className={"angle " + (props.className || "")} ref={container}>
      <div
        className="angle-center"
        style={{ transform: `translateZ(0px) rotate(${angle}deg)` }}
      >
        <div className="angle-pointer"></div>
      </div>
      <style jsx>{`
        .angle {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 36px;
          height: 36px;
          border: 3px solid #fff;
          border-radius: 18px;
        }

        .angle-center {
          position: relative;
          width: 6px;
          height: 30px;
          pointer-events: none;
        }

        .angle-pointer {
          position: absolute;
          width: 6px;
          height: 6px;
          top: 2px;
          border-radius: 3px;
          background: #fff;
        }
      `}</style>
    </div>
  );
}
