import React, { useState } from "react";
import ResultPanel from "./ResultPanel";
import ButtonPanel from "./ButtonPanel";

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [state, setState] = useState({
    last: "",
    cur: "0",
  });

  const onButtonClick = (type: string) => {
    var cur;
    var lastLetter;
    switch (type) {
      case "c":
        setState({
          last: "",
          cur: "0",
        });
        break;
      case "back":
        setState({
          ...state,
          cur:
            state.cur === "0" ? state.cur : state.cur.slice(0, -1) || "0",
        });
        break;
      case "=":
        try {
          setState({
            last: state.cur + "=",
            cur: eval(state.cur) + "",
          });
        } catch (e) {
          setState({
            last: state.cur + "=",
            cur: "NaN",
          });
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        cur = state.cur;
        lastLetter = cur.slice(-1);
        if (
          lastLetter === "+" ||
          lastLetter === "-" ||
          lastLetter === "*" ||
          lastLetter === "/"
        )
          setState({
            ...state,
            cur: cur.slice(0, -1) + type,
          });
        else
          setState({
            ...state,
            cur: state.cur + type,
          });
        break;
      case ".":
        cur = state.cur;
        lastLetter = cur.slice(-1);
        if (lastLetter !== ".") {
          setState({
            ...state,
            cur: state.cur + type,
          });
        }
        break;
      default:
        setState({
          ...state,
          cur: state.cur === "0" ? type : state.cur + type,
        });
        break;
    }
  };

  const exp = {
    cur: state.cur,
    last: state.last,
  };

  return (
    <div className="react-calculator">
      <ResultPanel exp={exp} />
      <ButtonPanel onClick={onButtonClick} />
      <style jsx>{`
        .react-calculator {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #ccc;
        }
      `}</style>
    </div>
  );
};

export default Calculator;
