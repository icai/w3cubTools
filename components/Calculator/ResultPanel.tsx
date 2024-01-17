import React, { useEffect } from "react";

interface ResultPanelProps {
  exp: {
    cur: string;
    last: string;
  };
}

const replacement = [
  {
    reg: /\*/g,
    dest: "×"
  },
  {
    reg: /\//g,
    dest: "÷"
  }
];

const ResultPanel: React.FC<ResultPanelProps> = ({ exp }) => {
  useEffect(() => {
    replacement.forEach((item) => {
      exp.cur = exp.cur.replace(item.reg, item.dest);
      exp.last = exp.last.replace(item.reg, item.dest);
    });
  }, [exp]);

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
};



ResultPanel.defaultProps = {
  exp: { cur: "", last: "" },
};

export default ResultPanel;
