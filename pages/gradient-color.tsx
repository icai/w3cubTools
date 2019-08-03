import gradients from "@constants/gradients.json";
import { Icon, toaster } from "evergreen-ui";
import AnglePicker from "@components/Gradient/AnglePicker";
import { useState } from "react";

function GradientItem({ item, copyCode, bgDownload }) {
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
          ></AnglePicker>
          <a
            className="ch-code"
            data-color-angle={angle}
            data-color-from={item[0]}
            data-color-to={item[1]}
            onClick={copyCode}
          >
            <Icon icon="code" color="white" />
          </a>
          <a
            className="ch-grab"
            data-color-angle={angle}
            data-color-from={item[0]}
            data-color-to={item[1]}
            onClick={bgDownload}
          >
            <Icon icon="download" color="white" />
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

export default function Gradient() {
  var backgroundImage = "background-image: ";
  var gradientStart = " 10%, ";
  var gradientEnd = " 100%)";

  var copyCode = function(event) {
    var eventColorFrom = event.currentTarget.dataset.colorFrom;
    var eventColorTo = event.currentTarget.dataset.colorTo;
    var eventColorAngle = event.currentTarget.dataset.colorAngle;
    var gradientType = `linear-gradient( ${eventColorAngle}deg, `;
    var eventResult =
      backgroundImage +
      gradientType +
      eventColorFrom +
      gradientStart +
      eventColorTo +
      gradientEnd +
      ";";
    function dynamicNode() {
      var node = document.createElement("pre");
      node.style.position = "fixed";
      node.style.fontSize = "0px";
      node.textContent = eventResult;
      return node;
    }

    var node = dynamicNode();
    document.body.appendChild(node);

    var selection = getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
    document.body.removeChild(node);
    toaster.success("CSS3 Code Copied! 👍", {
      duration: 2
    });
  };
  var bgDownload = function(event) {
    //Grab Palette
    var eventColorFrom = event.currentTarget.dataset.colorFrom;
    var eventColorTo = event.currentTarget.dataset.colorTo;
    var eventColorAngle = event.currentTarget.dataset.colorAngle;
    var canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.width = 1000;
    canvas.height = 1000;
    var ctx = canvas.getContext("2d");

    const maxLength = Math.sqrt(
      canvas.width * canvas.width + canvas.height * canvas.height
    );

    var angle = eventColorAngle;
    var tempGradient = ctx.createLinearGradient(
      canvas.width / 2 + Math.cos(angle) * maxLength * 0.5,
      canvas.height / 2 + Math.sin(angle) * maxLength * 0.5,
      canvas.width / 2 - Math.cos(angle) * maxLength * 0.5,
      canvas.height / 2 - Math.sin(angle) * maxLength * 0.5
    );
    // var tempGradient = ctx.createLinearGradient(0, 0, 1000, 1000);
    tempGradient.addColorStop(0, eventColorFrom);
    tempGradient.addColorStop(1, eventColorTo);
    ctx.fillStyle = tempGradient;
    ctx.fillRect(0, 0, 1000, 1000);
    var dataURL = canvas.toDataURL();
    event.currentTarget.href = dataURL;
    var fileName =
      "gradient-" + eventColorFrom.slice(1, 7) + "-" + eventColorTo.slice(1, 7);
    event.currentTarget.setAttribute("download", fileName);
  };
  return (
    <div className="ch-paper">
      {gradients.map((item, ix) => {
        return (
          <GradientItem
            item={item}
            key={ix}
            copyCode={copyCode}
            bgDownload={bgDownload}
          ></GradientItem>
        );
      })}
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
}
