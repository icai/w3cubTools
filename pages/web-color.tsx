// <script src="https://unpkg.com/react-jsonschema-form/dist/react-jsonschema-form.js"></script>

import React, { Fragment, Component } from "react";
import hexRgb from "@utils/hexrgb";
import colors from "@constants/color.json";
import "@styles/webcolor.css";

export default class extends Component<any, any> {
  static getInitialProps(props) {
    return {
      colors: colors.map(color => {
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
  }
  state = {
    active: "all"
  };
  switchTab = id => {
    this.setState({
      active: id
    });
  };
  render() {
    const { colors } = this.props;
    return (
      <Fragment>
        <div className="color-box">
          <ul className="color-tabs" style={{ border: 0 }}>
            {colors.map((item, ix) => {
              return (
                <li
                  key={ix}
                  style={{
                    background:
                      item.id == this.state.active
                        ? "rgb(245, 245, 245)"
                        : "none"
                  }}
                >
                  <a
                    href="javascript:"
                    data-val={item.id + "_colors"}
                    onClick={() => {
                      this.switchTab(item.id);
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
                  display: item.id == this.state.active ? "block" : "none"
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
      </Fragment>
    );
  }
}
