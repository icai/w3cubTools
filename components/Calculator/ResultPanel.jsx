import React from "react";
import PropTypes from "prop-types";

var replacement = [
  {
    reg: /\*/g,
    dest: "×"
  },
  {
    reg: /\//g,
    dest: "÷"
  }
];

export default class ResultPanel extends React.Component {
  static propTypes = {
    exp: PropTypes.object
  };
  static defaultProps = {
    exp: 0
  };
  constructor() {
    super();
  }
  render() {
    var exp = this.props.exp;
    var cur, last;
    replacement.forEach(item => {
      exp.cur = exp.cur.replace(item.reg, item.dest);
      exp.last = exp.last.replace(item.reg, item.dest);
    });
    return (
      <div className="result-panel">
        <div className="last-row">{exp.last}</div>
        <div className="cur-row">{exp.cur}</div>
        <style jsx>{`
          .result-panel {
            display: flex;
            padding-top: 40px;
            flex: 2;
            flex-direction: column;
            background-color: #e3e7e9;
            text-align: right;
            padding: 0px 30px;
            line-height: 80px;
            border: 1px solid #e3e7e9;
            border-right: 0;
            border-bottom: 0;

            .last-row {
              flex: 1;
              color: #969ba3;
              font-size: 30px;
              align-items: flex-end;
              display: flex;
              justify-content: flex-end;
              overflow: auto;
              max-width: 100%;
            }
            .cur-row {
              flex: 1;
              color: #46494d;
              font-size: 40px;
              overflow: auto;
              max-width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}
