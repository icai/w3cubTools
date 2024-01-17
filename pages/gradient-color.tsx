import React, { useState } from "react";
import { CodeIcon, DownloadIcon, toaster } from "evergreen-ui";
import AnglePicker from "@components/Gradient/AnglePicker";
import copy from "@utils/copy";
import gradients from "@constants/gradients.json";
import { env } from "process";

interface GradientItemProps {
  item: string[];
  copyCode: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  bgDownload: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const GradientItem: React.FC<GradientItemProps> = ({
  item,
  copyCode,
  bgDownload,
}) => {
  const [angle, setAngle] = useState(135);
  return (
    <div className="ch-gradient-brick">
      <div
        className="ch-gradient"
        style={{
          backgroundImage: `linear-gradient(${angle}deg, ${item[0]} 10%, ${item[1]} 100%)`
        }}
      >
        <div className="ch-actions">
          <AnglePicker
            className="ch-angle"
            callback={(c: number) => {
              setAngle(c);
            }}
            angle={angle}
          ></AnglePicker>
          <a
            className="ch-code"
            data-color-angle={angle}
            data-color-from={item[0]}
            data-color-to={item[1]}
            onClick={copyCode}
          >
            <CodeIcon color="white" />
          </a>
          <a
            className="ch-grab"
            data-color-angle={angle}
            data-color-from={item[0]}
            data-color-to={item[1]}
            onClick={bgDownload}
          >
            <DownloadIcon color="white" />
          </a>
        </div>
      </div>
      <div className="ch-colors">
        <span className="ch-color-from">{item[0]}</span>
        <span className="ch-color-to" style={{ color: item[1] }}>
          {item[1]}
        </span>
      </div>
      <style jsx>{`
        .ch-gradient-brick {
          width: 180px;
          display: inline-block;
          margin: 25px;
          box-shadow: 0px 0px 51px 0px rgba(0, 0, 0, 0.08),
            0px 6px 18px 0px rgba(0, 0, 0, 0.05);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0px);
        }

        .ch-gradient-brick:hover {
          box-shadow: 0px 0px 114px 0px rgba(0, 0, 0, 0.08),
            0px 30px 25px 0px rgba(0, 0, 0, 0.05);
          transform: translateY(-5px);
        }

        .ch-gradient {
          width: 100%;
          height: 180px;
          position: relative;
          background-color: #cfd8dc;
        }

        .ch-actions {
          display: none;
          position: absolute;
          right: 5px;
          bottom: 5px;
        }

        .ch-gradient-brick:hover .ch-actions {
          display: block;
          animation: micro-move 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ch-actions :global(.ch-angle) {
          top: -95px;
          right: -25px;
        }

        .ch-code,
        .ch-grab {
          width: 26px;
          height: 26px;
          display: inline-block;
          background-repeat: no-repeat;
          cursor: pointer;
          vertical-align: middle;
          margin: 3px;
          transform: translateY(0px);
          transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.7;
        }

        @keyframes micro-move {
          from {
            transform: translateY(5px);
          }
          to {
            transform: translateY(0px);
          }
        }

        .ch-code:hover,
        .ch-grab:hover {
          opacity: 1;
          transform: translateY(-4px);
        }

        .ch-code:active,
        .ch-grab:active {
          opacity: 1;
          transform: translateY(-2px);
        }

        .ch-code {
          background-position: -26px 0px;
        }

        .ch-grab {
          background-position: 0px 0px;
        }

        .ch-colors {
          padding: 12px;
          text-align: left;
          text-transform: uppercase;
          font-size: 18px;
        }

        .ch-color-from {
          margin-bottom: 3px;
        }

        .ch-color-from,
        .ch-color-to {
          color: #929197;
          display: block;
          padding: 0px;
        }
      `}</style>
    </div>
  );
}

const Gradient: React.FC = () => {
  const backgroundImage = "background-image: ";
  const gradientStart = " 10%, ";
  const gradientEnd = " 100%)";

  const copyCode = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const eventColorFrom = event.currentTarget.dataset.colorFrom || "";
    const eventColorTo = event.currentTarget.dataset.colorTo || "";
    const eventColorAngle = event.currentTarget.dataset.colorAngle || 0;
    const gradientType = `linear-gradient( ${eventColorAngle}deg, `;
    const eventResult =
      backgroundImage +
      gradientType +
      eventColorFrom +
      gradientStart +
      eventColorTo +
      gradientEnd +
      ";";

    const isCopied = copy(eventResult);
    if (isCopied) {
      toaster.success("CSS3 Code Copied! 👍", {
        duration: 2,
      });
    }
  };

  const bgDownload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const eventColorFrom = event.currentTarget.dataset.colorFrom || "";
    const eventColorTo = event.currentTarget.dataset.colorTo || "";
    const eventColorAngle = event.currentTarget.dataset.colorAngle || 0;
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d")!;
    // @ts-ignore
    const angle = Math.abs(eventColorAngle - 450) % 360;


    function degreetoPoint(width: number, height: number, angleDegrees: number) {
      var angleRadians = Math.atan(height / width);
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      
      angleDegrees = Math.abs((360 - angleDegrees) * (Math.PI / 180));
      
      var isCloseTo180 = Math.abs(angleDegrees - Math.PI) < angleRadians;
      var isCloseTo360 = angleDegrees > 2 * Math.PI - angleRadians || angleDegrees < angleRadians;
      var isCloseTo90 = Math.abs(angleDegrees - (Math.PI / 2)) <= Math.abs((Math.PI / 2) - angleRadians);
      var isCloseTo270 = Math.abs(angleDegrees - (3 * Math.PI / 2)) <= Math.abs((Math.PI / 2) - angleRadians);
      
      var offsetX = (isCloseTo180 ? -1 : 0) + (isCloseTo360 ? 1 : 0);
      var offsetY = (isCloseTo270 ? -1 : 0) + (isCloseTo90 ? 1 : 0);
      
      var x, y;
      
      if (offsetX) {
        x = halfWidth + (width / 2) * offsetX;
        y = halfHeight + (width / 2) * (Math.tan(angleDegrees) * offsetX);
      } else {
        x = halfWidth + (height / 2) * (offsetY / Math.tan(angleDegrees));
        y = halfHeight + (height / 2) * offsetY;
      }
      
      x = Math.round(x);
      y = Math.round(y);
      
      var deltaX = width - x;
      var deltaY = height - y;
      
      return {
        x0: deltaX,
        y0: deltaY,
        x1: x,
        y1: y
      };
    }
    const points = degreetoPoint(canvas.width, canvas.width, angle);
    const tempGradient = ctx.createLinearGradient(
      points.x0,
      points.y0,
      points.x1,
      points.y1
    );
    tempGradient.addColorStop(0.1, eventColorFrom);
    tempGradient.addColorStop(1, eventColorTo);
    ctx.fillStyle = tempGradient;
    ctx.fillRect(0, 0, 1000, 1000);

    const dataURL = canvas.toDataURL();
    event.currentTarget.href = dataURL;
    const fileName =
      "gradient-" + eventColorFrom.slice(1, 7) + "-" + eventColorTo.slice(1, 7);
    event.currentTarget.setAttribute("download", fileName);
  };

  return (
    <div className="ch-paper">
      {gradients.map((item, ix) => (
        <GradientItem
          item={item}
          key={ix}
          copyCode={copyCode}
          bgDownload={bgDownload}
        />
      ))}
      <style jsx>{`
        .ch-paper {
          text-align: center;
          margin: 0px auto;
          font-family: "Source Sans Pro", sans-serif;
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
};

export default Gradient;
