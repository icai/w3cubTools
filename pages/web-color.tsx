import React, { Fragment, useState } from "react";
import hexRgb from "@utils/hexrgb";
import allcolors from "@constants/color.json";
import Mdloader from "@components/Mdloader";

export default function WebColor() {
  const state = {
    colors: allcolors.map(color => {
      return {
        ...color,
        datas: color.datas.map(item => {
          return {
            color: item.color,
            rgb: hexRgb(item.color)
          };
        })
      };
    })
  };
  const [active, setActive] = useState("all");
  const switchTab = id => {
    setActive(id);
  };
  const { colors } = state;
  return (
    <Fragment>
      <div className="color-box">
        <ul className="color-tabs" style={{ border: 0 }}>
          {colors.map((item, ix) => {
            return (
              <li
                key={ix}
                style={{
                  background: item.id == active ? "rgb(245, 245, 245)" : "none"
                }}
              >
                <a
                  href="javascript:void(0);"
                  data-val={item.id + "_colors"}
                  onClick={() => {
                    switchTab(item.id);
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        {colors.map((item, index) => {
          return (
            <div
              key={"tab" + index}
              style={{
                display: item.id == active ? "block" : "none"
              }}
              id={item.id + "_colors"}
              className="color-row"
            >
              <h2>{item.title}</h2>
              {item.datas.map((color, ci) => {
                return (
                  <div className="color color-col" key={"c" + ci}>
                    <span
                      className="swatch"
                      style={{ backgroundColor: color.color }}
                    />
                    <h3>
                      <span className="html">
                        <b className="fr">HTML</b>
                        <b>{color.color} </b>
                      </span>
                      <span className="rgb">
                        <b>RGB</b>
                        <span className="red">{color.rgb.red}</span>
                        <span className="green">{color.rgb.green}</span>
                        <span className="blue">{color.rgb.blue}</span>
                      </span>
                    </h3>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Mdloader />
      <style jsx>{`
        .color-tabs {
          width: 1170px;
          font-size: 12px;
          background: #fff none repeat scroll 0% 0%;
          overflow: auto;
          display: block;
          list-style: none;
        }

        .color-tabs li {
          line-height: 30px;
          cursor: pointer;
          text-align: left;
          float: left;
        }

        .color-tabs li a {
          color: #747d87;
          display: inline-block;
          padding: 0px 10px;
        }

        .color-tabs li a:hover {
          text-decoration: none;
          background: #f5f5f5;
          color: #747d87;
        }

        .color-tabs li.bg-blue03 a {
          color: #fff;
        }

        .color-tabs li.bg-blue03 a:hover {
          color: #fff;
          background-color: #55a7e3;
        }

        .pusmall .color-tabs {
          width: 980px;
        }

        .color-box {
          padding-left: 15px;
          overflow: hidden;
        }

        .color-box h2 {
          padding-bottom: 10px;
          margin-bottom: 10px;
          text-align: right;
          width: 98%;
          border-bottom: 1px solid #c6cede;
          clear: both;
        }

        .color {
          padding-bottom: 1em;
          text-align: center;
        }

        .color-col {
          width: 14.2%;
          _width: 14.5%;
          padding: 0px 1% 1% 0px;
          height: auto;
          box-sizing: border-box;
          float: left;
          overflow: hidden;
        }

        .color-row {
          overflow: hidden;
        }

        .color .swatch {
          height: 120px;
          width: 100%;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .color .swatch,
        .color h3 {
          display: block;
          width: 100%;
          height: 80px;
          box-sizing: border-box;
        }

        .color h3 {
          border: 1px solid #e6e6e6;
          margin-top: 0;
        }

        .color h3 {
          width: 100%;
          height: 50px;
          border-top: 0px none;
          padding: 0.5em;
          _padding: 0;
          font-size: 0.8em;
          margin-bottom: 0px;
          background: #fafafa none repeat scroll 0% 0%;
        }

        .color h3 .html,
        .color h3 .rgb {
          display: block;
          font-size: 1em;
          height: 20px;
          line-height: 20px;
        }

        .color h3 .html b {
          float: left;
        }

        .color h3 .html b,
        .color h3 .rgb b {
          display: block;
          padding-right: 0.25em;
          color: #333;
          box-sizing: border-box;
          font-weight: normal;
        }

        .color h3 .html b {
          width: 45%;
          text-align: left;
        }

        .color h3 .rgb b {
          float: right;
        }
        .color h3 .html span,
        .color h3 .rgb span {
          box-sizing: border-box;
          float: left;
          padding-right: 0.25em;
          font-weight: normal;
        }

        .color h3 .html b.fr,
        .color h3 .rgb b {
          text-align: right;
        }
      `}</style>
    </Fragment>
  );
}
